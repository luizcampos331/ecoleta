const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

//Pegar o banco de dados
const db = require("./database/db");

//Configurar pasta pública
server.use(express.static("public"));

//Habilitar req.body na aplicação
server.use(express.urlencoded({ extended: true }));

//Utilizando template engine
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//Configurar caminhos da aplicação
//Pagina inicia
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
  return res.render("index.html");
});

//Cadastrar ponto de coleta
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //Inserir dados no bando de dados
  const insert = `
    INSERT INTO places (
      image,
      name,
      address,
      number,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?)
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.number,
    req.body.state,
    req.body.city,
    req.body.items
  ];

  function afterInsertData(error) {
    if(error) {
      console.log(error);
      return res.render("create-point.html", { erro: true });
    }

    return res.render("create-point.html", { saved: true });
  }

  db.run(insert, values, afterInsertData);
});

//Resultados da pesquisa
server.get("/search", (req, res) => {

  const search = req.query.search;

  console.log(search);

  if(search == "") {
    //Pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city like '%${req.query.search}%'`,   function afterSelectData(error, rows) {
    if(error) {
      return console.log(error)
    }

    const total = rows.length;
    
    //Mostrar página HTML com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total });
  });
});

//Ligar o servidor
server.listen(3000);
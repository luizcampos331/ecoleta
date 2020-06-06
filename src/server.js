const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

//Configurar pasta pública
server.use(express.static("public"));

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
//Resultados da pesquisa
server.get("/search", (req, res) => {
  return res.render("search-results.html");
});

//Ligar o servidor
server.listen(3000);
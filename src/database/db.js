const sqlite3 = require("sqlite3").verbose();

/* Crir o objeto que irá fazer operações no banco de dados */
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilizar o objeto de banco da dados para as operações
/*db.serialize(() => {
  // Criar uma tabela 
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      number TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

  // Inserir dados na tabela
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
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "260",
    "Santa Catarina",
    "Rio do Sul",
    "Papeis e Papelão"
  ];

  function afterInsertData(error) {
    if(error) {
      return console.log(error);
    }

    console.log("Cadastrado com sucesso");
    console.log(this);
  }

  //db.run(insert, values, afterInsertData);

  // Consultar dados na tabela 
  const select = `SELECT * FROM places`

  function afterSelectData(error, rows) {
    if(error) {
      console.log(error)
    }
    
    console.log("Aqui estão seus registros: ");
    console.log(rows);
  }

  db.all(select, afterSelectData);

  // Deletar dados na tabela
  const del = `DELETE FROM places WHERE id = ?`;

  const idDel = [3];

  function afterDeleteData(error) {
    if(error) {
      return console.log(error);
    }

    console.log("Registro deletado com sucesso");
  }

  //db.run(del, idDel, afterDeleteData)
    
});*/
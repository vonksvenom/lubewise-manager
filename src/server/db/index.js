const sqlite3 = require('sqlite3').verbose();

const createTables = (db) => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT,
      department TEXT,
      isAdmin INTEGER,
      systemOwner INTEGER,
      companyId TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS equipamentos (
      id TEXT PRIMARY KEY,
      nome TEXT,
      modelo TEXT,
      tag TEXT,
      status TEXT,
      area TEXT,
      responsavel TEXT,
      descricao TEXT,
      fabricante TEXT,
      numeroSerie TEXT,
      dataFabricacao TEXT,
      ultimaManutencao TEXT,
      proximaManutencao TEXT,
      potencia TEXT,
      tensao TEXT,
      corrente TEXT,
      imagem TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ordensServico (
      id TEXT PRIMARY KEY,
      titulo TEXT,
      descricao TEXT,
      tipo TEXT,
      equipamentoId TEXT,
      status TEXT,
      dataInicio TEXT,
      dataFim TEXT,
      prioridade TEXT,
      horasEstimadas INTEGER,
      cip TEXT,
      FOREIGN KEY(equipamentoId) REFERENCES equipamentos(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS inventario (
      id TEXT PRIMARY KEY,
      name TEXT,
      type TEXT,
      quantity REAL,
      unit TEXT,
      location TEXT,
      area TEXT,
      dataRegistro TEXT,
      minimumStock INTEGER,
      reorderPoint INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS areas (
      id TEXT PRIMARY KEY,
      nome TEXT,
      descricao TEXT,
      responsavel TEXT
    )`);
  });
};

const initializeDatabase = () => {
  const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados SQLite');
      createTables(db);
    }
  });
  return db;
};

module.exports = { initializeDatabase };
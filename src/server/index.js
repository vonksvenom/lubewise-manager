const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Criar conexão com o banco de dados
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    createTables();
  }
});

// Criar tabelas
function createTables() {
  db.serialize(() => {
    // Tabela de usuários
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

    // Tabela de equipamentos
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

    // Tabela de ordens de serviço
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

    // Tabela de inventário
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
  });
}

// Rotas da API
// Usuários
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const { id, name, email, password, role, department, isAdmin, systemOwner, companyId } = req.body;
  db.run(
    'INSERT INTO users (id, name, email, password, role, department, isAdmin, systemOwner, companyId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, name, email, password, role, department, isAdmin, systemOwner, companyId],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Equipamentos
app.get('/api/equipamentos', (req, res) => {
  db.all('SELECT * FROM equipamentos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/equipamentos', (req, res) => {
  const { id, nome, modelo, tag, status, area, responsavel, descricao, fabricante, 
          numeroSerie, dataFabricacao, ultimaManutencao, proximaManutencao, 
          potencia, tensao, corrente, imagem } = req.body;
  
  db.run(
    `INSERT INTO equipamentos (id, nome, modelo, tag, status, area, responsavel, 
      descricao, fabricante, numeroSerie, dataFabricacao, ultimaManutencao, 
      proximaManutencao, potencia, tensao, corrente, imagem) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, nome, modelo, tag, status, area, responsavel, descricao, fabricante, 
     numeroSerie, dataFabricacao, ultimaManutencao, proximaManutencao, 
     potencia, tensao, corrente, imagem],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Ordens de Serviço
app.get('/api/ordensServico', (req, res) => {
  db.all('SELECT * FROM ordensServico', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/ordensServico', (req, res) => {
  const { id, titulo, descricao, tipo, equipamentoId, status, 
          dataInicio, dataFim, prioridade, horasEstimadas, cip } = req.body;
  
  db.run(
    `INSERT INTO ordensServico (id, titulo, descricao, tipo, equipamentoId, 
      status, dataInicio, dataFim, prioridade, horasEstimadas, cip) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, titulo, descricao, tipo, equipamentoId, status, 
     dataInicio, dataFim, prioridade, horasEstimadas, cip],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Inventário
app.get('/api/inventario', (req, res) => {
  db.all('SELECT * FROM inventario', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/inventario', (req, res) => {
  const { id, name, type, quantity, unit, location, area, 
          dataRegistro, minimumStock, reorderPoint } = req.body;
  
  db.run(
    `INSERT INTO inventario (id, name, type, quantity, unit, location, 
      area, dataRegistro, minimumStock, reorderPoint) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, type, quantity, unit, location, area, 
     dataRegistro, minimumStock, reorderPoint],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
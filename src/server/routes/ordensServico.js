const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.all('SELECT * FROM ordensServico', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  router.post('/', (req, res) => {
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

  return router;
};
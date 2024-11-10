const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  router.post('/', (req, res) => {
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

  return router;
};
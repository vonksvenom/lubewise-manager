const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const usersRoutes = require('./routes/users');
const ordensServicoRoutes = require('./routes/ordensServico');

const app = express();
app.use(cors({
  origin: '*', // In production, you should specify your actual domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const db = initializeDatabase();

// Routes
app.use('/api/users', usersRoutes(db));
app.use('/api/ordensServico', ordensServicoRoutes(db));

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

/**
 * Serveur Express pour l'API de Jeûne et Prière 2026.
 * Gère les connexions à la base de données et les routes de base.
 */
const app = express();
const PORT = process.env.BACKEND_PORT || 12001;

// Configuration de la base de données
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Middleware
app.use(express.json());

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API de Jeûne et Prière 2026 fonctionne !' });
});

// Route pour les moments de prière (placeholder)
app.get('/api/moments', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM moments ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des moments' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});

module.exports = app;

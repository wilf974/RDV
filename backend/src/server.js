require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

/**
 * Serveur Express pour l'API de Jeûne et Prière 2026.
 * Gère la persistance des moments terminés via PostgreSQL.
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

// Initialiser la base de données
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progress (
        user_id TEXT PRIMARY KEY,
        completed_moments JSONB DEFAULT '[]',
        completed_days JSONB DEFAULT '[]'
      );
    `);
    console.log('Table progress créée ou déjà existante.');
  } catch (err) {
    console.error('Erreur lors de l\'initialisation DB :', err);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API de Jeûne et Prière 2026 fonctionne !' });
});

// Route pour sauvegarder les moments terminés
app.post('/api/progress', async (req, res) => {
  const { userId, completedMoments, completedDays } = req.body;
  try {
    await pool.query('INSERT INTO progress (user_id, completed_moments, completed_days) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET completed_moments = $2, completed_days = $3', [userId, JSON.stringify(completedMoments), JSON.stringify(completedDays)]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
  }
});

// Route pour récupérer les moments terminés
app.get('/api/progress/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT completed_moments, completed_days FROM progress WHERE user_id = $1', [userId]);
    if (result.rows.length > 0) {
      res.json({ completedMoments: JSON.parse(result.rows[0].completed_moments || '[]'), completedDays: JSON.parse(result.rows[0].completed_days || '[]') });
    } else {
      res.json({ completedMoments: [], completedDays: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// Initialiser DB et démarrer le serveur
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
  });
});

module.exports = app;

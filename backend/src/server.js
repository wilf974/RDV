require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const crypto = require('crypto');

/**
 * Serveur Express pour l'API de Jeûne et Prière 2026 - Version Multi-Église.
 * Gère la persistance, les églises, les utilisateurs et les statistiques.
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

// Initialiser la base de données avec tables multi-églises
async function initDB() {
  try {
    // Table des églises
    await pool.query(`
      CREATE TABLE IF NOT EXISTS churches (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        admin_email TEXT NOT NULL,
        admin_password TEXT NOT NULL,
        theme_primary_color TEXT DEFAULT '#667eea',
        theme_secondary_color TEXT DEFAULT '#764ba2',
        logo_url TEXT,
        custom_message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Table churches créée ou déjà existante.');

    // Table des utilisateurs (membres d'église)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        church_id INTEGER REFERENCES churches(id),
        user_id TEXT UNIQUE NOT NULL,
        email TEXT,
        name TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Table users créée ou déjà existante.');

    // Table de progression (lié aux utilisateurs)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(user_id),
        church_id INTEGER REFERENCES churches(id),
        completed_moments JSONB DEFAULT '[]',
        completed_days JSONB DEFAULT '[]',
        current_day TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Table progress créée ou déjà existante.');

    // Créer une église par défaut pour démo
    const checkChurch = await pool.query('SELECT * FROM churches WHERE slug = $1', ['demo']);
    if (checkChurch.rows.length === 0) {
      const hashedPassword = crypto.createHash('sha256').update('demo123').digest('hex');
      await pool.query(`
        INSERT INTO churches (name, slug, admin_email, admin_password, custom_message)
        VALUES ($1, $2, $3, $4, $5)
      `, ['Église Démo', 'demo', 'admin@demo.church', hashedPassword, 'Bienvenue dans votre parcours spirituel !']);
      console.log('Église démo créée : slug=demo, password=demo123');
    }

  } catch (err) {
    console.error('Erreur lors de l\'initialisation DB :', err);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// ============ ROUTES PUBLIQUES ============

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API de Jeûne et Prière 2026 - Version Multi-Église' });
});

// Récupérer la configuration d'une église par son slug
app.get('/api/church/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, slug, theme_primary_color, theme_secondary_color, logo_url, custom_message FROM churches WHERE slug = $1',
      [slug]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Église non trouvée' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ============ ROUTES UTILISATEURS ============

// Enregistrer ou mettre à jour un utilisateur
app.post('/api/user/register', async (req, res) => {
  const { userId, churchSlug, email, name } = req.body;
  try {
    // Trouver l'église
    const church = await pool.query('SELECT id FROM churches WHERE slug = $1', [churchSlug]);
    if (church.rows.length === 0) {
      return res.status(404).json({ error: 'Église non trouvée' });
    }
    const churchId = church.rows[0].id;

    // Créer ou mettre à jour l'utilisateur
    await pool.query(
      `INSERT INTO users (church_id, user_id, email, name)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) DO UPDATE SET email = $3, name = $4`,
      [churchId, userId, email, name]
    );

    res.json({ success: true, userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
  }
});

// Sauvegarder la progression d'un utilisateur
app.post('/api/progress', async (req, res) => {
  const { userId, churchSlug, completedMoments, completedDays, currentDay } = req.body;
  try {
    // Trouver l'église
    const church = await pool.query('SELECT id FROM churches WHERE slug = $1', [churchSlug]);
    if (church.rows.length === 0) {
      return res.status(404).json({ error: 'Église non trouvée' });
    }
    const churchId = church.rows[0].id;

    // Sauvegarder la progression
    await pool.query(
      `INSERT INTO progress (user_id, church_id, completed_moments, completed_days, current_day, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id) DO UPDATE
       SET completed_moments = $3, completed_days = $4, current_day = $5, updated_at = NOW()`,
      [userId, churchId, JSON.stringify(completedMoments), JSON.stringify(completedDays), currentDay]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
  }
});

// Récupérer la progression d'un utilisateur
app.get('/api/progress/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT completed_moments, completed_days, current_day FROM progress WHERE user_id = $1',
      [userId]
    );
    if (result.rows.length > 0) {
      const row = result.rows[0];
      res.json({
        completedMoments: row.completed_moments || [],
        completedDays: row.completed_days || [],
        currentDay: row.current_day
      });
    } else {
      res.json({ completedMoments: [], completedDays: [], currentDay: null });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// ============ ROUTES ADMIN ============

// Authentification admin
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const result = await pool.query(
      'SELECT id, name, slug FROM churches WHERE admin_email = $1 AND admin_password = $2',
      [email, hashedPassword]
    );
    if (result.rows.length > 0) {
      const church = result.rows[0];
      // Générer un token simple (en production, utiliser JWT)
      const token = crypto.randomBytes(32).toString('hex');
      res.json({ success: true, token, church });
    } else {
      res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Créer une nouvelle église
app.post('/api/admin/church/create', async (req, res) => {
  const { name, slug, adminEmail, adminPassword, customMessage } = req.body;
  try {
    const hashedPassword = crypto.createHash('sha256').update(adminPassword).digest('hex');
    const result = await pool.query(
      `INSERT INTO churches (name, slug, admin_email, admin_password, custom_message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, slug`,
      [name, slug, adminEmail, hashedPassword, customMessage]
    );
    res.json({ success: true, church: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') { // Duplicate slug
      res.status(400).json({ error: 'Ce slug est déjà utilisé' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création' });
    }
  }
});

// Mettre à jour la configuration d'une église
app.put('/api/admin/church/:slug/config', async (req, res) => {
  const { slug } = req.params;
  const { name, customMessage, themePrimaryColor, themeSecondaryColor, logoUrl } = req.body;
  try {
    await pool.query(
      `UPDATE churches
       SET name = COALESCE($1, name),
           custom_message = COALESCE($2, custom_message),
           theme_primary_color = COALESCE($3, theme_primary_color),
           theme_secondary_color = COALESCE($4, theme_secondary_color),
           logo_url = COALESCE($5, logo_url)
       WHERE slug = $6`,
      [name, customMessage, themePrimaryColor, themeSecondaryColor, logoUrl, slug]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// Statistiques pour une église
app.get('/api/admin/church/:slug/stats', async (req, res) => {
  const { slug } = req.params;
  try {
    // Trouver l'église
    const church = await pool.query('SELECT id FROM churches WHERE slug = $1', [slug]);
    if (church.rows.length === 0) {
      return res.status(404).json({ error: 'Église non trouvée' });
    }
    const churchId = church.rows[0].id;

    // Statistiques
    const totalUsers = await pool.query('SELECT COUNT(*) as count FROM users WHERE church_id = $1', [churchId]);
    const activeToday = await pool.query(
      `SELECT COUNT(DISTINCT user_id) as count FROM progress
       WHERE church_id = $1 AND current_day = $2`,
      [churchId, new Date().toISOString().split('T')[0]]
    );
    const completedDays = await pool.query(
      `SELECT user_id, jsonb_array_length(completed_days) as days_count
       FROM progress WHERE church_id = $1`,
      [churchId]
    );

    res.json({
      totalUsers: parseInt(totalUsers.rows[0].count),
      activeToday: parseInt(activeToday.rows[0].count),
      completedDaysStats: completedDays.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

// Initialiser DB et démarrer le serveur
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
  });
});

module.exports = app;

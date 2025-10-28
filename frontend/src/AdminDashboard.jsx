import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const API_URL = 'http://localhost:12001';

/**
 * Dashboard Administrateur pour les églises
 * Permet de voir les statistiques et configurer l'église
 */
function AdminDashboard({ churchSlug, onLogout }) {
  const [stats, setStats] = useState(null);
  const [churchConfig, setChurchConfig] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Formulaire de configuration
  const [formData, setFormData] = useState({
    name: '',
    customMessage: '',
    themePrimaryColor: '#667eea',
    themeSecondaryColor: '#764ba2',
    logoUrl: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, [churchSlug]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Charger la config de l'église
      const configRes = await fetch(`${API_URL}/api/church/${churchSlug}`);
      if (configRes.ok) {
        const config = await configRes.json();
        setChurchConfig(config);
        setFormData({
          name: config.name || '',
          customMessage: config.custom_message || '',
          themePrimaryColor: config.theme_primary_color || '#667eea',
          themeSecondaryColor: config.theme_secondary_color || '#764ba2',
          logoUrl: config.logo_url || ''
        });
      }

      // Charger les statistiques
      const statsRes = await fetch(`${API_URL}/api/admin/church/${churchSlug}/stats`);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfig = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/church/${churchSlug}/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Configuration mise à jour avec succès !');
        setIsEditing(false);
        loadDashboardData();
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur mise à jour:', error);
      alert('Erreur réseau');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Chargement du dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <h1>Dashboard Administrateur</h1>
          <h2>{churchConfig?.name || churchSlug}</h2>
        </div>
        <button onClick={onLogout} className="btn-logout">
          Déconnexion
        </button>
      </header>

      {/* Statistics Cards */}
      <section className="stats-section">
        <h3>Statistiques en temps réel</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{stats?.totalUsers || 0}</div>
            <div className="stat-label">Membres Inscrits</div>
          </div>

          <div className="stat-card active">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{stats?.activeToday || 0}</div>
            <div className="stat-label">Actifs Aujourd'hui</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-value">
              {stats?.completedDaysStats?.length || 0}
            </div>
            <div className="stat-label">Avec Progression</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">
              {stats?.activeToday && stats?.totalUsers
                ? Math.round((stats.activeToday / stats.totalUsers) * 100)
                : 0}%
            </div>
            <div className="stat-label">Taux d'Engagement</div>
          </div>
        </div>
      </section>

      {/* Configuration Section */}
      <section className="config-section">
        <div className="section-header">
          <h3>Configuration de l'église</h3>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              ✏️ Modifier
            </button>
          ) : (
            <div className="edit-buttons">
              <button onClick={handleUpdateConfig} className="btn-save">
                💾 Enregistrer
              </button>
              <button onClick={() => setIsEditing(false)} className="btn-cancel">
                ❌ Annuler
              </button>
            </div>
          )}
        </div>

        <div className="config-grid">
          <div className="config-item">
            <label>Nom de l'église</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="config-input"
              />
            ) : (
              <div className="config-value">{churchConfig?.name}</div>
            )}
          </div>

          <div className="config-item">
            <label>Code d'accès (slug)</label>
            <div className="config-value">{churchSlug}</div>
          </div>

          <div className="config-item full-width">
            <label>Message de bienvenue personnalisé</label>
            {isEditing ? (
              <textarea
                value={formData.customMessage}
                onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                className="config-textarea"
                rows="3"
              />
            ) : (
              <div className="config-value">
                {churchConfig?.custom_message || 'Aucun message personnalisé'}
              </div>
            )}
          </div>

          <div className="config-item">
            <label>Couleur primaire</label>
            {isEditing ? (
              <div className="color-input-group">
                <input
                  type="color"
                  value={formData.themePrimaryColor}
                  onChange={(e) => setFormData({ ...formData, themePrimaryColor: e.target.value })}
                  className="config-color"
                />
                <span>{formData.themePrimaryColor}</span>
              </div>
            ) : (
              <div className="config-value">
                <span
                  className="color-preview"
                  style={{ backgroundColor: churchConfig?.theme_primary_color }}
                />
                {churchConfig?.theme_primary_color}
              </div>
            )}
          </div>

          <div className="config-item">
            <label>Couleur secondaire</label>
            {isEditing ? (
              <div className="color-input-group">
                <input
                  type="color"
                  value={formData.themeSecondaryColor}
                  onChange={(e) => setFormData({ ...formData, themeSecondaryColor: e.target.value })}
                  className="config-color"
                />
                <span>{formData.themeSecondaryColor}</span>
              </div>
            ) : (
              <div className="config-value">
                <span
                  className="color-preview"
                  style={{ backgroundColor: churchConfig?.theme_secondary_color }}
                />
                {churchConfig?.theme_secondary_color}
              </div>
            )}
          </div>

          <div className="config-item full-width">
            <label>URL du logo (optionnel)</label>
            {isEditing ? (
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="config-input"
                placeholder="https://exemple.com/logo.png"
              />
            ) : (
              <div className="config-value">
                {churchConfig?.logo_url || 'Aucun logo configuré'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* User Progress Table */}
      <section className="users-section">
        <h3>Progression des membres</h3>
        {stats?.completedDaysStats && stats.completedDaysStats.length > 0 ? (
          <table className="users-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Jours Complétés</th>
              </tr>
            </thead>
            <tbody>
              {stats.completedDaysStats.map((user, index) => (
                <tr key={index}>
                  <td>{user.user_id}</td>
                  <td>
                    <span className="days-badge">{user.days_count || 0}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <p>Aucune donnée de progression pour le moment</p>
            <p>Les statistiques apparaîtront lorsque vos membres commenceront leur parcours</p>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h3>Actions rapides</h3>
        <div className="actions-grid">
          <button className="action-btn">
            📱 Partager le code d'accès
          </button>
          <button className="action-btn">
            📊 Exporter les données
          </button>
          <button className="action-btn">
            ✉️ Envoyer un message aux membres
          </button>
          <button className="action-btn">
            📖 Guide d'utilisation
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

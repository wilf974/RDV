import React, { useState, useEffect } from 'react';
import App from './App';
import LandingPage from './LandingPage';
import AdminDashboard from './AdminDashboard';

const API_URL = 'http://localhost:12001';

/**
 * Routeur principal de l'application
 * Gère la navigation entre landing page, app et admin dashboard
 */
function AppRouter() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'app' | 'admin'
  const [churchSlug, setChurchSlug] = useState(null);
  const [churchConfig, setChurchConfig] = useState(null);

  // Vérifier si un slug d'église est dans l'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('church');
    const admin = urlParams.get('admin');

    if (slug) {
      loadChurchAndStart(slug);
    } else if (admin === 'true') {
      setCurrentView('admin');
    }
  }, []);

  const loadChurchAndStart = async (slug) => {
    try {
      const res = await fetch(`${API_URL}/api/church/${slug}`);
      if (res.ok) {
        const config = await res.json();
        setChurchConfig(config);
        setChurchSlug(slug);
        setCurrentView('app');

        // Mettre à jour l'URL sans recharger la page
        window.history.pushState({}, '', `?church=${slug}`);
      } else {
        alert(`Église "${slug}" non trouvée. Veuillez vérifier le code.`);
      }
    } catch (error) {
      console.error('Erreur chargement église:', error);
      alert('Erreur de connexion au serveur');
    }
  };

  const handleSelectChurch = async (slug) => {
    await loadChurchAndStart(slug);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setChurchSlug(null);
    setChurchConfig(null);
    window.history.pushState({}, '', '/');
  };

  const handleGoToAdmin = () => {
    setCurrentView('admin');
    window.history.pushState({}, '', '?admin=true');
  };

  // Affichage selon la vue actuelle
  if (currentView === 'landing') {
    return (
      <div>
        <LandingPage onSelectChurch={handleSelectChurch} />
        {/* Bouton flottant pour l'admin */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <button
            onClick={handleGoToAdmin}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            🔐 Admin
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'admin') {
    return (
      <div>
        <AdminLogin
          onLoginSuccess={(slug) => {
            setChurchSlug(slug);
            setCurrentView('adminDashboard');
          }}
          onBack={handleBackToLanding}
        />
      </div>
    );
  }

  if (currentView === 'adminDashboard') {
    return (
      <AdminDashboard
        churchSlug={churchSlug}
        onLogout={handleBackToLanding}
      />
    );
  }

  // Vue principale de l'application
  return (
    <div>
      {/* Bouton retour en haut */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 1000
      }}>
        <button
          onClick={handleBackToLanding}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#667eea',
            border: '2px solid #667eea',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#667eea';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.color = '#667eea';
          }}
        >
          ← Retour
        </button>
      </div>

      {/* Message personnalisé de l'église */}
      {churchConfig?.custom_message && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          fontWeight: '500',
          marginBottom: '-20px'
        }}>
          {churchConfig.custom_message}
        </div>
      )}

      {/* Application principale */}
      <App churchSlug={churchSlug} churchConfig={churchConfig} />
    </div>
  );
}

/**
 * Composant de connexion admin
 */
function AdminLogin({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.church.slug);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur connexion:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
          🔐 Connexion Admin
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee',
              color: '#c00',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginBottom: '15px'
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <button
            type="button"
            onClick={onBack}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#667eea',
              padding: '12px',
              border: '2px solid #667eea',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Retour
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#5a6c7d'
        }}>
          <strong>Démo:</strong> admin@demo.church / demo123
        </div>
      </div>
    </div>
  );
}

export default AppRouter;

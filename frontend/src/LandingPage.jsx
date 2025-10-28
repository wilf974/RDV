import React, { useState } from 'react';
import './LandingPage.css';

/**
 * Landing Page professionnelle pour présenter la plateforme aux églises
 */
function LandingPage({ onSelectChurch }) {
  const [churchSlug, setChurchSlug] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleStartJourney = () => {
    if (churchSlug.trim()) {
      onSelectChurch(churchSlug.trim().toLowerCase());
    } else {
      alert('Veuillez entrer le code de votre église');
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">🙏 Célébrations Quotidiennes</h1>
          <p className="hero-subtitle">
            Accompagnez votre communauté dans un parcours spirituel de jeûne et prière
          </p>
          <p className="hero-description">
            Une plateforme moderne pour guider vos membres à travers 7 moments de prière quotidiens
          </p>

          <div className="hero-cta">
            <input
              type="text"
              placeholder="Code de votre église (ex: demo)"
              value={churchSlug}
              onChange={(e) => setChurchSlug(e.target.value)}
              className="church-input"
              onKeyPress={(e) => e.key === 'Enter' && handleStartJourney()}
            />
            <button onClick={handleStartJourney} className="btn-primary">
              Commencer mon parcours
            </button>
          </div>

          <button onClick={() => setShowDemo(!showDemo)} className="btn-secondary">
            {showDemo ? 'Masquer' : 'Essayer la démo'}
          </button>

          {showDemo && (
            <div className="demo-info">
              <p>✅ Essayez avec le code : <strong>demo</strong></p>
              <p>Ou contactez votre église pour obtenir votre code d'accès</p>
            </div>
          )}
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Une plateforme complète pour votre église</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Application Mobile-First</h3>
            <p>Accessible depuis n'importe quel appareil : téléphone, tablette ou ordinateur</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Personnalisation Complète</h3>
            <p>Logo, couleurs, messages personnalisés aux couleurs de votre église</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Statistiques en Temps Réel</h3>
            <p>Suivez l'engagement de vos membres avec un dashboard administrateur</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Sauvegarde Automatique</h3>
            <p>Les progrès sont sauvegardés automatiquement, même hors ligne</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Calendrier Complet</h3>
            <p>Navigation libre entre les jours, reprise des journées incomplètes</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Données Sécurisées</h3>
            <p>Stockage local robuste avec IndexedDB et synchronisation cloud</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">Comment ça marche ?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Inscription de votre église</h3>
            <p>Créez un compte administrateur pour votre communauté</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Personnalisation</h3>
            <p>Configurez les couleurs, le logo et les messages de bienvenue</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Partage avec vos membres</h3>
            <p>Donnez le code d'accès à votre communauté</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Suivi et accompagnement</h3>
            <p>Suivez la progression et encouragez vos membres</p>
          </div>
        </div>
      </section>

      {/* Pricing / Contact */}
      <section className="pricing">
        <h2 className="section-title">Tarifs Transparents</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Essai Gratuit</h3>
            <div className="price">0€ <span>/mois</span></div>
            <ul>
              <li>✅ 30 jours d'essai</li>
              <li>✅ Jusqu'à 50 membres</li>
              <li>✅ Toutes les fonctionnalités</li>
              <li>✅ Support par email</li>
            </ul>
            <button className="btn-outline">Commencer gratuitement</button>
          </div>

          <div className="pricing-card featured">
            <div className="badge">Populaire</div>
            <h3>Église Standard</h3>
            <div className="price">29€ <span>/mois</span></div>
            <ul>
              <li>✅ Membres illimités</li>
              <li>✅ Personnalisation complète</li>
              <li>✅ Statistiques avancées</li>
              <li>✅ Support prioritaire</li>
              <li>✅ Backup automatique</li>
            </ul>
            <button className="btn-primary">Choisir ce plan</button>
          </div>

          <div className="pricing-card">
            <h3>Diocèse / Réseau</h3>
            <div className="price">Sur mesure</div>
            <ul>
              <li>✅ Églises multiples</li>
              <li>✅ Dashboard centralisé</li>
              <li>✅ API personnalisée</li>
              <li>✅ Formation sur site</li>
              <li>✅ Accompagnement dédié</li>
            </ul>
            <button className="btn-outline">Nous contacter</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Célébrations Quotidiennes</h4>
            <p>Accompagner les églises dans leur parcours spirituel</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@celebrations.church</p>
            <p>Tél: +33 1 23 45 67 89</p>
          </div>

          <div className="footer-section">
            <h4>Ressources</h4>
            <p><a href="#admin">Espace Admin</a></p>
            <p><a href="#docs">Documentation</a></p>
            <p><a href="#support">Support</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Célébrations Quotidiennes - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

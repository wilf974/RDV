# 🙏 Plateforme Célébrations Quotidiennes 2026

**Plateforme Multi-Église de Jeûne et Prière**

Une solution professionnelle et complète pour accompagner les églises et leurs membres dans un parcours spirituel structuré avec **7 moments de prière quotidiens** d'une minute chacun.

---

## ✨ Nouveautés - Version Multi-Église

### 🎯 **Vendable aux Églises**

Cette plateforme a été conçue comme une **solution SaaS multi-tenant** permettant à plusieurs églises d'utiliser la même infrastructure avec leurs propres configurations personnalisées.

### 🔑 Fonctionnalités Clés pour les Églises

#### Pour les Administrateurs d'Église

- 📊 **Dashboard de statistiques** en temps réel
  - Nombre de membres inscrits
  - Membres actifs aujourd'hui
  - Taux d'engagement global
  - Progression détaillée par membre

- 🎨 **Personnalisation complète**
  - Logo personnalisé
  - Couleurs aux couleurs de l'église
  - Message de bienvenue personnalisé
  - Identité visuelle unique

- 🔐 **Espace admin sécurisé**
  - Authentification par email/mot de passe
  - Gestion de la configuration
  - Accès aux statistiques

#### Pour les Membres

- ✅ **7 moments de prière quotidiens** avec textes bibliques
- ⏱️ **Minuteur automatique** de 60 secondes
- 📅 **Calendrier mensuel complet** avec progression visuelle
- 💾 **Sauvegarde robuste** avec IndexedDB (fonctionne hors ligne)
- 🔄 **Synchronisation cloud** optionnelle
- 📱 **Responsive** - mobile, tablette, desktop
- 💬 **Compatible Telegram** WebView
- 🌐 **Navigation libre** entre les jours
- 🔁 **Reprise automatique** des journées incomplètes

---

## 🛠️ Stack Technique

### Frontend
- **React 18.2.0** avec Vite (build rapide)
- **IndexedDB** pour stockage local robuste
- **CSS3** responsive avec gradients
- **Multi-tenant** routing et configuration dynamique

### Backend
- **Node.js** avec Express.js
- **PostgreSQL 15** (architecture multi-tenant)
- **API RESTful** complète
- **Crypto** pour sécurisation des mots de passe

### Infrastructure
- **Docker & Docker Compose** pour conteneurisation
- **Nginx** pour serveur web de production
- **Alpine Linux** pour images légères

### Base de Données (Architecture Multi-Tenant)

```sql
churches        → Configuration des églises (logo, couleurs, admin)
users          → Membres appartenant à une église
progress       → Progression des utilisateurs par église
```

---

## 📂 Structure du Projet

```bash
RDV/
│
├── frontend/                    # Application React
│   ├── src/
│   │   ├── App.jsx             # Composant principal de l'app de prière
│   │   ├── AppRouter.jsx       # Router multi-vues (Landing/App/Admin)
│   │   ├── LandingPage.jsx     # Page d'accueil professionnelle
│   │   ├── AdminDashboard.jsx  # Dashboard administrateur
│   │   ├── indexedDBStorage.js # Système de persistance IndexedDB
│   │   ├── index.css           # Styles de l'application
│   │   ├── LandingPage.css     # Styles de la landing page
│   │   └── AdminDashboard.css  # Styles du dashboard
│   ├── Dockerfile              # Multi-stage build (Node + Nginx)
│   ├── nginx.conf              # Configuration Nginx
│   └── package.json
│
├── backend/                     # API Node.js Express
│   ├── src/
│   │   └── server.js           # API multi-église avec routes complètes
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Orchestration complète
├── start.sh                    # Script de démarrage
├── stop.sh                     # Script d'arrêt
├── README.MD                   # Ce fichier
├── GUIDE_EGLISES.md           # Documentation complète pour les églises
├── TODO.md                     # Tâches et améliorations futures
└── historique.md               # Journal des modifications
```

---

## ⚙️ Installation et Lancement

### Démarrage Rapide avec Docker

```bash
# 1. Cloner le projet
git clone <repository-url>
cd RDV

# 2. Lancer tous les services
docker-compose up --build

# Ou utiliser le script
./start.sh
```

**Services démarrés :**
- 🌐 Frontend : **http://localhost:12000**
- 🔌 Backend API : **http://localhost:12001**
- 🗄️ PostgreSQL : Port 5432 (interne)

**Église de démo créée automatiquement :**
- Code d'accès : `demo`
- Admin email : `admin@demo.church`
- Admin password : `demo123`

### Arrêt des Services

```bash
docker-compose down
# Ou
./stop.sh
```

### Développement Local (sans Docker)

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Accessible sur http://localhost:5173
```

#### Backend
```bash
cd backend
npm install
npm run dev
# API sur http://localhost:12001
```

#### Base de données
Installez PostgreSQL localement et créez une base `prayer_app`

---

## 🚀 Guide d'Utilisation

### Pour les Membres

1. **Accéder à l'application** : http://localhost:12000
2. **Entrer le code de votre église** : Ex: `demo`
3. **Commencer le parcours** :
   - Lisez le texte biblique
   - Cliquez sur "Démarrer" pour lancer le timer (60s)
   - Le moment est automatiquement validé
   - Passez au moment suivant

4. **Suivre sa progression** :
   - Calendrier mensuel avec jours complétés (vert)
   - Jour actuel (bleu)
   - Navigation libre pour reprendre un jour

### Pour les Administrateurs

1. **Accéder au dashboard** :
   - Cliquez sur "🔐 Admin" depuis la page d'accueil
   - Connectez-vous avec vos identifiants

2. **Voir les statistiques** :
   - Membres inscrits
   - Actifs aujourd'hui
   - Taux d'engagement
   - Progression détaillée

3. **Personnaliser votre église** :
   - Modifier les couleurs
   - Ajouter un logo
   - Personnaliser le message de bienvenue
   - Enregistrer les changements

### Créer une Nouvelle Église

```bash
curl -X POST http://localhost:12001/api/admin/church/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ma Super Église",
    "slug": "mon-eglise",
    "adminEmail": "admin@mon-eglise.fr",
    "adminPassword": "MotDePasseSecurise123!",
    "customMessage": "Bienvenue dans notre parcours de prière !"
  }'
```

---

## 📊 API Endpoints

### Public

- `GET /api/test` - Test de l'API
- `GET /api/church/:slug` - Obtenir la configuration d'une église
- `POST /api/user/register` - Enregistrer un utilisateur
- `POST /api/progress` - Sauvegarder la progression
- `GET /api/progress/:userId` - Récupérer la progression

### Admin

- `POST /api/admin/login` - Connexion administrateur
- `POST /api/admin/church/create` - Créer une église
- `PUT /api/admin/church/:slug/config` - Mettre à jour la config
- `GET /api/admin/church/:slug/stats` - Obtenir les statistiques

---

## 💰 Modèle Commercial

### Plans Tarifaires Proposés

**Essai Gratuit (30 jours)**
- Jusqu'à 50 membres
- Toutes les fonctionnalités
- Support par email

**Plan Standard (29€/mois)**
- Membres illimités
- Personnalisation complète
- Statistiques avancées
- Support prioritaire

**Plan Diocèse (Sur mesure)**
- Églises multiples
- Dashboard centralisé
- API personnalisée
- Formation dédiée

---

## 🛣️ Roadmap

### Fonctionnalités Actuelles ✅

- ✅ 7 moments de prière quotidiens
- ✅ Système multi-église (multi-tenant)
- ✅ Dashboard administrateur
- ✅ Personnalisation complète
- ✅ Statistiques en temps réel
- ✅ Stockage robuste avec IndexedDB
- ✅ Landing page professionnelle
- ✅ Responsive design
- ✅ Compatible Telegram

### Prochaines Étapes 🔜

- [ ] Notifications push
- [ ] Groupes de prière
- [ ] Export PDF des statistiques
- [ ] Application mobile native
- [ ] Intégration vidéo/audio
- [ ] Multi-langues
- [ ] Tests unitaires et E2E
- [ ] Performance optimisation

---

## 📚 Documentation

- **[GUIDE_EGLISES.md](./GUIDE_EGLISES.md)** - Guide complet pour les églises
- **[TODO.md](./TODO.md)** - Liste des tâches et améliorations
- **[historique.md](./historique.md)** - Journal des modifications

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez le guide de contribution dans le projet.

---

## 📄 Licence

© 2026 Plateforme Célébrations Quotidiennes - Tous droits réservés.

---

## 📞 Contact

**Support :** support@celebrations.church
**Commercial :** sales@celebrations.church
**Tél :** +33 1 23 45 67 89

---

**Transformez votre communauté avec une plateforme moderne de jeûne et prière.**

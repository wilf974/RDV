# 🙏 Guide d'Utilisation - Plateforme Célébrations Quotidiennes

## Vue d'Ensemble

La **Plateforme Célébrations Quotidiennes** est une solution complète conçue pour accompagner les églises et leurs membres dans un parcours spirituel de jeûne et prière. Chaque jour, les participants sont guidés à travers **7 moments de prière d'une minute**, avec des textes bibliques inspirants.

---

## 🎯 Fonctionnalités Principales

### Pour les Membres

- ✅ **7 moments quotidiens** avec textes bibliques
- ✅ **Minuteur intégré** de 60 secondes par moment
- ✅ **Calendrier complet** pour suivre sa progression
- ✅ **Sauvegarde automatique** avec IndexedDB (fonctionne hors ligne)
- ✅ **Navigation libre** entre les jours
- ✅ **Reprise automatique** des journées incomplètes
- ✅ **Compatible Telegram** WebView
- ✅ **Responsive** - mobile, tablette, desktop

### Pour les Administrateurs d'Église

- 📊 **Dashboard de statistiques** en temps réel
- 🎨 **Personnalisation complète** (logo, couleurs, messages)
- 👥 **Suivi des membres** et de leur progression
- 📈 **Taux d'engagement** et rapports
- 🔐 **Espace admin sécurisé**
- 🏢 **Multi-tenant** - chaque église a son espace dédié

---

## 🚀 Démarrage Rapide

### Pour une Église

#### 1. Création de votre Espace

Pour créer un compte pour votre église, contactez l'administrateur de la plateforme ou utilisez l'API suivante :

```bash
POST http://localhost:12001/api/admin/church/create
Content-Type: application/json

{
  "name": "Nom de votre Église",
  "slug": "votre-code-unique",
  "adminEmail": "admin@votre-eglise.fr",
  "adminPassword": "votre-mot-de-passe-securise",
  "customMessage": "Message de bienvenue pour vos membres"
}
```

**Exemple avec cURL :**

```bash
curl -X POST http://localhost:12001/api/admin/church/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Église Évangélique de Paris",
    "slug": "eep-paris",
    "adminEmail": "pasteur@eep-paris.fr",
    "adminPassword": "MonMotDePasseSecurise123!",
    "customMessage": "Bienvenue dans notre parcours de 21 jours de jeûne et prière !"
  }'
```

#### 2. Connexion au Dashboard Admin

1. Accédez à la plateforme : `http://localhost:12000`
2. Cliquez sur le bouton **"🔐 Admin"** en bas à droite
3. Connectez-vous avec vos identifiants :
   - Email : `admin@votre-eglise.fr`
   - Mot de passe : celui que vous avez défini

#### 3. Configuration de votre Église

Dans le dashboard admin, vous pouvez personnaliser :

- **Nom de l'église** : Affiché aux membres
- **Message de bienvenue** : Personnalisez l'accueil
- **Couleurs** : Thème aux couleurs de votre église
- **Logo** : URL de votre logo (optionnel)

#### 4. Partage avec vos Membres

Donnez à vos membres le **code d'accès** (slug) de votre église :

```
🙏 Rejoignez notre parcours de prière !

1. Rendez-vous sur : http://localhost:12000
2. Entrez le code : votre-code-unique
3. Commencez votre parcours spirituel !
```

---

## 👤 Guide pour les Membres

### Accéder à l'Application

1. Rendez-vous sur la plateforme
2. Entrez le code fourni par votre église
3. L'application démarre avec les couleurs et le message de votre église

### Utilisation Quotidienne

#### Démarrer un Moment

1. Lisez le texte biblique affiché
2. Cliquez sur **"Démarrer"**
3. Prenez 60 secondes pour prier/méditer
4. Le moment est automatiquement marqué comme terminé

#### Navigation

- **Bouton "Suivant"** : Passer au moment suivant
- **Calendrier** : Voir votre progression mensuelle
- **Changer de jour** : Reprendre un jour incomplet ou recommencer
- **Bouton "Recommencer"** : Réinitialiser la journée en cours

#### Indicateurs

- 🟢 **Vert** : Jour complété (7/7 moments)
- 🔵 **Bleu** : Jour en cours
- ⚪ **Gris** : Jour à venir

---

## 📊 Dashboard Administrateur

### Accès

1. Depuis la page d'accueil, cliquez sur **"🔐 Admin"**
2. Connectez-vous avec vos identifiants

### Statistiques Disponibles

- **Membres Inscrits** : Nombre total d'utilisateurs
- **Actifs Aujourd'hui** : Membres ayant prié aujourd'hui
- **Avec Progression** : Membres ayant complété au moins un jour
- **Taux d'Engagement** : Pourcentage d'actifs

### Configuration

Modifiez la configuration en cliquant sur **"✏️ Modifier"** :

- Changez les couleurs
- Ajoutez un logo
- Personnalisez le message de bienvenue
- Cliquez sur **"💾 Enregistrer"**

---

## 🔧 Installation Technique

### Prérequis

- Docker & Docker Compose
- Node.js 18+ (pour développement)
- PostgreSQL 15 (inclus dans Docker)

### Lancement avec Docker

```bash
# Cloner le projet
git clone <repository-url>
cd RDV

# Démarrer tous les services
docker-compose up --build

# Ou utiliser le script
./start.sh
```

**Services disponibles :**

- Frontend : http://localhost:12000
- Backend API : http://localhost:12001
- PostgreSQL : Port 5432 (interne)

### Arrêt des Services

```bash
docker-compose down
# Ou
./stop.sh
```

---

## 🗄️ Architecture Technique

### Stack Technologique

**Frontend :**
- React 18.2.0
- Vite (build rapide)
- IndexedDB pour stockage local
- CSS3 (responsive)

**Backend :**
- Node.js avec Express
- PostgreSQL 15
- Multi-tenant architecture

**Infrastructure :**
- Docker & Docker Compose
- Nginx (production)

### Base de Données

#### Tables Principales

1. **churches** : Configuration des églises
   - id, name, slug, admin_email, admin_password
   - theme_primary_color, theme_secondary_color
   - logo_url, custom_message

2. **users** : Membres des églises
   - id, church_id, user_id, email, name

3. **progress** : Progression des utilisateurs
   - id, user_id, church_id
   - completed_moments, completed_days, current_day

---

## 🔐 Sécurité

### Mots de Passe

- Les mots de passe admin sont hashés avec SHA-256
- **En production** : Utilisez bcrypt ou Argon2
- Changez le mot de passe par défaut

### API

- CORS activé pour le frontend
- Validation des entrées
- Isolation des données par église (church_id)

### Données Utilisateurs

- Stockage local avec IndexedDB
- Fallback vers localStorage/sessionStorage
- Synchronisation optionnelle avec le backend

---

## 📱 Cas d'Usage

### Église avec 50 Membres

```
Configuration :
- 1 compte admin
- Slug : "ma-petite-eglise"
- 50 membres utilisant le même code
- Statistiques centralisées
- Message personnalisé visible par tous
```

### Diocèse avec 10 Églises

```
Configuration :
- 10 comptes admin (un par église)
- 10 slugs différents (ex: "diocese-paris-nord", "diocese-paris-sud")
- Chaque église a ses statistiques
- Personnalisation indépendante
- Base de données partagée
```

---

## 🆘 Support & Dépannage

### Problèmes Courants

#### "Église non trouvée"
- Vérifiez le code (slug)
- Assurez-vous que l'église est créée dans la base de données

#### "Les boutons sont grisés"
- Le moment actuel est déjà complété
- Utilisez le bouton "Recommencer" pour réinitialiser

#### "Mes données ont disparu"
- Vérifiez que les cookies/IndexedDB ne sont pas bloqués
- Les données sont locales, ne videz pas le cache du navigateur

#### Problèmes de connexion API
- Vérifiez que le backend est démarré (port 12001)
- Testez : `curl http://localhost:12001/api/test`

### Logs

```bash
# Logs du frontend
docker logs rdv-frontend-1

# Logs du backend
docker logs rdv-backend-1

# Logs de la base de données
docker logs rdv-db-1
```

---

## 📈 Roadmap Future

### Fonctionnalités Prévues

- [ ] **Notifications push** pour rappeler les moments de prière
- [ ] **Groupes de prière** au sein d'une église
- [ ] **Partage social** de progression
- [ ] **Export PDF** des statistiques
- [ ] **Application mobile native** (iOS/Android)
- [ ] **Intégration Zoom** pour prières en groupe
- [ ] **Contenu personnalisé** par église (vidéos, audios)
- [ ] **Multi-langues** (anglais, espagnol, etc.)

---

## 💰 Modèle Commercial

### Plans Tarifaires

**Plan Gratuit (30 jours)**
- Jusqu'à 50 membres
- Toutes les fonctionnalités de base
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

## 📞 Contact

**Support technique :** support@celebrations.church
**Commercial :** sales@celebrations.church
**Téléphone :** +33 1 23 45 67 89

---

## 📄 Licence

© 2026 Plateforme Célébrations Quotidiennes
Tous droits réservés.

---

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements
4. Push et créez une Pull Request

---

**Merci d'utiliser la Plateforme Célébrations Quotidiennes !**
*Accompagnons ensemble les communautés dans leur parcours spirituel.*

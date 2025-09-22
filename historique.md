# Historique du Projet

Ce fichier tracke les modifications et actions effectuées sur le projet "Application de Jeûne et Prière 2026".

## Format des Entrées
- **Date** : Date de l'action (YYYY-MM-DD).
- **Action** : Description de ce qui a été fait.
- **Fichiers Impactés** : Liste des fichiers créés ou modifiés.
- **Pourquoi** : Raison de la modification.
- **Section Concernée** : Partie du projet (frontend, backend, config, etc.).

---

## Entrées

### 2024-09-22
- **Action** : Création initiale du fichier historique.md.
- **Fichiers Impactés** : historique.md (nouveau).
- **Pourquoi** : Suivi des règles pour tracker les modifications avant et après chaque action.
- **Section Concernée** : Configuration générale.

### 2024-09-22
- **Action** : Génération des fichiers de base pour le projet (Dockerfiles, docker-compose.yml, .env.example).
- **Fichiers Impactés** : frontend/Dockerfile (nouveau), backend/Dockerfile (nouveau), docker-compose.yml (nouveau), README.MD (mis à jour).
- **Pourquoi** : Démarrer le projet full Docker selon les spécifications du README.
- **Section Concernée** : Configuration générale et Docker.

### 2024-09-22
- **Action** : Génération du code source basique pour frontend (React avec Vite) et backend (Node.js avec Express).
- **Fichiers Impactés** : frontend/package.json (nouveau), frontend/vite.config.js (nouveau), frontend/index.html (nouveau), frontend/src/main.jsx (nouveau), frontend/src/index.css (nouveau), frontend/src/App.jsx (nouveau), backend/package.json (nouveau), backend/src/server.js (nouveau).
- **Pourquoi** : Ajouter le code de démarrage pour permettre le développement rapide.
- **Section Concernée** : Frontend et Backend.

### 2024-09-22
- **Action** : Ajout d'instructions de lancement manuel et génération de scripts de démarrage.
- **Fichiers Impactés** : README.MD (mis à jour), start.sh (nouveau), stop.sh (nouveau).
- **Pourquoi** : Faciliter le lancement manuel sur Windows/VPS selon les préférences de l'utilisateur.
- **Section Concernée** : Déploiement et Lancement.

### 2024-09-22
- **Action** : Initialisation Git, ajout des fichiers et push vers GitHub.
- **Fichiers Impactés** : .git (initialisé), tous les fichiers ajoutés au repo.
- **Pourquoi** : Sauvegarder le projet sur GitHub pour collaboration et déploiement.
- **Section Concernée** : Gestion de Version.

### 2024-09-22
- **Action** : Correction des erreurs de déploiement sur VPS (génération package-lock.json, ajustement Docker).
- **Fichiers Impactés** : package-lock.json (frontend et backend générés).
- **Pourquoi** : Résoudre les erreurs npm ci et permettre le build Docker.
- **Section Concernée** : Déploiement et Lancement.

### 2024-09-22
- **Action** : Guide pour créer un sous-domaine sur Hostinger et configurer Nginx sur VPS.
- **Fichiers Impactés** : Aucun fichier modifié, conseils fournis.
- **Pourquoi** : Rendre l'application accessible via un sous-domaine.
- **Section Concernée** : Déploiement et Configuration.

### 2024-09-22
- **Action** : Confirmation de l'utilisation de l'IP direct srv819544.hstgr.cloud:12000 pour l'accès.
- **Fichiers Impactés** : Aucun, décision utilisateur.
- **Pourquoi** : Simplifier l'accès sans sous-domaine.
- **Section Concernée** : Déploiement et Configuration.

### 2024-09-22
- **Action** : Diagnostic des erreurs de connexion (timeout et reset).
- **Fichiers Impactés** : Aucun, conseils pour logs et ports.
- **Pourquoi** : Résoudre les problèmes d'accès à l'application.
- **Section Concernée** : Déploiement et Dépannage.

### 2024-09-22
- **Action** : Correction du problème de connexion au frontend (build React et Nginx).
- **Fichiers Impactés** : Aucun, ajustements de configuration suggérés.
- **Pourquoi** : Résoudre le reset de connexion sur le port 12000.
- **Section Concernée** : Déploiement et Dépannage.

### 2024-09-22
- **Action** : Diagnostic et correction de l'absence de fichiers React et config Nginx.
- **Fichiers Impactés** : Aucun, commandes pour inspection et rebuild suggérées.
- **Pourquoi** : Résoudre les erreurs d'accès aux fichiers et config.
- **Section Concernée** : Déploiement et Dépannage.

### 2024-09-22
- **Action** : Correction de la configuration Nginx pour écouter sur le port 12000.
- **Fichiers Impactés** : frontend/Dockerfile (ajusté).
- **Pourquoi** : Résoudre le reset de connexion en configurant Nginx correctement.
- **Section Concernée** : Déploiement et Dépannage.

### 2024-09-22
- **Action** : Confirmation que l'application fonctionne sur srv819544.hstgr.cloud:12000.
- **Fichiers Impactés** : Aucun.
- **Pourquoi** : Vérifier le déploiement réussi.
- **Section Concernée** : Déploiement et Test.

### 2024-09-22
- **Action** : Planification des fonctionnalités principales (7 moments de prière, textes bibliques, timer, UI).
- **Fichiers Impactés** : Aucun, planification.
- **Pourquoi** : Développer les fonctionnalités de l'application.
- **Section Concernée** : Développement Frontend.

### 2024-09-22
- **Action** : Modification de App.jsx pour ajouter la logique des 7 moments de prière avec textes bibliques et timer, puis push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (modifié), GitHub (poussé).
- **Pourquoi** : Implémenter les fonctionnalités principales de l'application.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Amélioration UI/UX : styling CSS moderne, notifications timer, organisation code, push vers GitHub.
- **Fichiers Impactés** : frontend/src/index.css (amélioré), frontend/src/App.jsx (ajusté), GitHub (poussé).
- **Pourquoi** : Rendre l'application plus attrayante et interactive.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Intégration du thème 21 Jours de Célébrations : sections matins, soirs, veillées, reconnaissances, textes bibliques étendus, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (thème intégré), GitHub (poussé).
- **Pourquoi** : Adapter l'application au thème spécifique du jeûne et prière.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Simplification interface : 7 moments uniquement, persistance localStorage pour moments terminés, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (simplifié et persistance ajoutée), GitHub (poussé).
- **Pourquoi** : Faciliter l'usage et sauvegarder le progrès.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Ajout persistance serveur : API backend pour sauvegarder/récupérer moments terminés via PostgreSQL, push vers GitHub.
- **Fichiers Impactés** : backend/src/server.js (API ajoutée), backend/package.json (cors ajouté), frontend/src/App.jsx (API intégrée), GitHub (poussé).
- **Pourquoi** : Rendre les données persistantes sur le serveur pour tous les utilisateurs.
- **Section Concernée** : Développement Backend et Frontend, Versioning.

### 2024-09-22
- **Action** : Correction de la synchronisation package-lock.json pour l'ajout de cors, conseils pour rebuild.
- **Fichiers Impactés** : Aucun, commandes fournies pour VPS.
- **Pourquoi** : Résoudre l'erreur npm ci lors du build Docker.
- **Section Concernée** : Déploiement et Dépannage.

### 2024-09-22
- **Action** : Ajout système de pseudo : input pour entrer pseudo, association des moments via API, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (pseudo ajouté), GitHub (poussé).
- **Pourquoi** : Permettre à plusieurs utilisateurs de sauvegarder leur progression individuellement.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Remplacement pseudo par ID appareil : persistance automatique par appareil via localStorage, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (ID automatique ajouté), GitHub (poussé).
- **Pourquoi** : Simplifier la persistance sans saisie, chaque appareil stocke ses données.
- **Section Concernée** : Développement Frontend et Versioning.

---

*Ajouter de nouvelles entrées ici après chaque modification.*

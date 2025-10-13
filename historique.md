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

### 2024-09-22
- **Action** : Extension des textes bibliques aux versets entiers pour tous les moments, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (textes étendus), GitHub (poussé).
- **Pourquoi** : Enrichir le contenu avec des versets complets pour plus de profondeur.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Ajout calendrier et système de jours : persistance par jour, déblocage automatique du suivant, visualisation en vert, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (calendrier ajouté), GitHub (poussé).
- **Pourquoi** : Suivre la progression sur 21 jours avec déblocage quotidien.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Correction double déclaration completedMoments dans App.jsx, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (erreur corrigée), GitHub (poussé).
- **Pourquoi** : Résoudre l'erreur de build Docker.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Extension des 7 moments avec versets sur la célébration, louange, reconnaissance, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (versets étendus), GitHub (poussé).
- **Pourquoi** : Intégrer le thème des 21 Jours de Célébrations avec des versets complets.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Calendrier amélioré : 14 jours, responsive, validation visuelle avec checkmark, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (calendrier limité), frontend/src/index.css (CSS responsive ajouté), GitHub (poussé).
- **Pourquoi** : Améliorer l'UX avec un calendrier centré et mobile-friendly.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Correction validation calendrier : jours terminés marqués correctement, bouton test ajouté, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (logique corrigée), GitHub (poussé).
- **Pourquoi** : Résoudre le problème de validation des jours terminés.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Suppression bouton test : validation automatique du jour activée, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (bouton retiré), GitHub (poussé).
- **Pourquoi** : Simplifier l'interface avec validation automatique.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Correction validation auto et layout calendrier : 3-4 jours par ligne sur mobile, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (logique ajustée), frontend/src/index.css (CSS mobile), GitHub (poussé).
- **Pourquoi** : Résoudre la validation automatique et améliorer l'affichage mobile.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Debug validation jour 1 : date début aujourd'hui pour tests, logs ajoutés, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (date ajustée), GitHub (poussé).
- **Pourquoi** : Résoudre le problème de validation du jour 1.
- **Section Concernée** : Développement Frontend et Versioning.

### 2024-09-22
- **Action** : Correction URL API : utilisation srv819544.hstgr.cloud:12001 pour appels frontend, push vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx (URL corrigée), GitHub (poussé).
- **Pourquoi** : Résoudre les erreurs de connexion refusée.
- **Section Concernée** : Développement Frontend et Versioning.

### 2025-09-23
- **Action** : Clonage du dépôt Git depuis GitHub pour récupérer les fichiers du projet.
- **Fichiers Impactés** : Tous les fichiers du dépôt clonés dans RDV/.
- **Pourquoi** : Initialiser l'environnement de développement local.
- **Section Concernée** : Gestion de Version.

### 2025-09-23
- **Action** : Correction de la gestion des jours pour mise à jour automatique basée sur la date système.
- **Fichiers Impactés** : frontend/src/App.jsx (ajout useEffect pour vérification quotidienne).
- **Pourquoi** : Permettre aux utilisateurs de continuer les moments le lendemain sans action manuelle.
- **Section Concernée** : Développement Frontend.

### 2025-09-23
- **Action** : Commit et push des modifications vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx, historique.md, TODO.md, etc.
- **Pourquoi** : Sauvegarder les corrections sur le repo pour déploiement.
- **Section Concernée** : Gestion de Version.

### 2025-09-23
- **Action** : Ajout de surbrillance pour le jour actuel et correction des dates du calendrier.
- **Fichiers Impactés** : frontend/src/App.jsx (logique calendrier), frontend/src/index.css (styles).
- **Pourquoi** : Améliorer l'UX avec jour actuel en bleu et jours terminés en vert.
- **Section Concernée** : Développement Frontend.

### 2025-09-23
- **Action** : Push des modifications vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx, frontend/src/index.css, historique.md.
- **Pourquoi** : Sauvegarder les améliorations du calendrier sur le repo.
- **Section Concernée** : Gestion de Version.

### 2025-09-23
- **Action** : Suppression des appels serveur et stockage uniquement en localStorage.
- **Fichiers Impactés** : frontend/src/App.jsx (suppression API, footer mis à jour).
- **Pourquoi** : Utiliser uniquement les cookies de l'appareil pour la persistance.
- **Section Concernée** : Développement Frontend.

### 2025-09-23
- **Action** : Push des modifications vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx, historique.md.
- **Pourquoi** : Sauvegarder les changements de stockage local sur le repo.
- **Section Concernée** : Gestion de Version.

### 2025-09-23
- **Action** : Empêcher le relancement des moments une fois les 7 terminés le même jour.
- **Fichiers Impactés** : frontend/src/App.jsx (désactivation boutons).
- **Pourquoi** : Interdire la relance le jour même, permettre le jour suivant via mise à jour automatique.
- **Section Concernée** : Développement Frontend.

### 2025-09-23
- **Action** : Push des modifications vers GitHub.
- **Fichiers Impactés** : frontend/src/App.jsx, historique.md.
- **Pourquoi** : Sauvegarder la correction de relancement sur le repo.
- **Section Concernée** : Gestion de Version.

### 2025-09-24
- **Action** : Correction du problème de cache dans Telegram WebView avec système de persistance multi-couches.
- **Fichiers Impactés** : frontend/src/App.jsx (système de persistance amélioré).
- **Pourquoi** : Résoudre le problème de boutons grisés dans Telegram en raison de la perte de validation des jours.
- **Section Concernée** : Développement Frontend et Persistance.

### 2025-09-24
- **Action** : Ajout de détection Telegram WebView et fallback vers sessionStorage/cookies.
- **Fichiers Impactés** : frontend/src/App.jsx (fonctions utilitaires ajoutées).
- **Pourquoi** : Améliorer la fiabilité de la persistance sur différents environnements mobiles.
- **Section Concernée** : Développement Frontend et Persistance.

### 2025-09-24
- **Action** : Commit et push vers GitHub des corrections Telegram.
- **Fichiers Impactés** : frontend/src/App.jsx, historique.md, TODO.md.
- **Pourquoi** : Sauvegarder les corrections du système de persistance multi-couches.
- **Section Concernée** : Gestion de Version.

### 2025-09-24
- **Action** : Correction logique boutons et changement de jour automatique.
- **Fichiers Impactés** : frontend/src/App.jsx (logique boutons, réinitialisation jour).
- **Pourquoi** : Résoudre le problème de boutons grisés permanent après validation d'un jour.
- **Section Concernée** : Développement Frontend.

### 2025-09-24
- **Action** : Ajout bouton réinitialisation manuelle et amélioration transition jours.
- **Fichiers Impactés** : frontend/src/App.jsx (bouton reset, logique chargement).
- **Pourquoi** : Permettre aux utilisateurs de recommencer leur journée si nécessaire.
- **Section Concernée** : Développement Frontend.

### 2025-09-24
- **Action** : Commit et push vers GitHub des corrections de logique boutons.
- **Fichiers Impactés** : frontend/src/App.jsx, historique.md, TODO.md.
- **Pourquoi** : Sauvegarder les corrections de la logique de changement de jour.
- **Section Concernée** : Gestion de Version.

### 2025-09-24
- **Action** : Correction logique et responsive du bouton "Recommencer le jour".
- **Fichiers Impactés** : frontend/src/App.jsx (logique condition), frontend/src/index.css (styles responsive).
- **Pourquoi** : Le bouton n'apparaît que quand nécessaire et s'adapte à tous les écrans.
- **Section Concernée** : Développement Frontend et Responsive Design.

### 2025-09-24
- **Action** : Commit et push vers GitHub des corrections bouton recommencer.
- **Fichiers Impactés** : frontend/src/App.jsx, frontend/src/index.css, historique.md, TODO.md.
- **Pourquoi** : Sauvegarder les améliorations de l'interface utilisateur.
- **Section Concernée** : Gestion de Version.

### 2025-09-24
- **Action** : Correction problème d'affichage du bouton reset dans Telegram WebView.
- **Fichiers Impactés** : frontend/src/App.jsx (logs debug, logique fallback, indicateurs visuels).
- **Pourquoi** : Résoudre le cas où les boutons sont grisés mais le bouton reset n'apparaît pas.
- **Section Concernée** : Développement Frontend et Debug Telegram.

### 2025-09-24
- **Action** : Ajout système de diagnostic et réinitialisation d'urgence pour Telegram.
- **Fichiers Impactés** : frontend/src/App.jsx (sections debug, bouton urgence).
- **Pourquoi** : Permettre aux utilisateurs Telegram de diagnostiquer et résoudre les problèmes de boutons.
- **Section Concernée** : Développement Frontend et Support Utilisateur.

### 2025-09-24
- **Action** : Commit et push vers GitHub des corrections Telegram bouton reset.
- **Fichiers Impactés** : frontend/src/App.jsx, historique.md, TODO.md.
- **Pourquoi** : Sauvegarder les corrections pour le problème Telegram.
- **Section Concernée** : Gestion de Version.

### 2025-10-13
- **Action** : Correction des erreurs de build Docker - génération package-lock.json et modification Dockerfiles.
- **Fichiers Impactés** : backend/package-lock.json (généré), backend/Dockerfile (modifié), frontend/package-lock.json (généré), frontend/Dockerfile (modifié).
- **Pourquoi** : Résoudre l'erreur "npm ci" qui nécessite un package-lock.json et corriger les problèmes de dépendances Rollup.
- **Section Concernée** : Configuration Docker et Build.

### 2025-10-13
- **Action** : Correction de la configuration Nginx pour écouter sur le port 12000 au lieu du port 80 par défaut.
- **Fichiers Impactés** : frontend/nginx.conf (créé), frontend/Dockerfile (modifié).
- **Pourquoi** : Résoudre l'erreur "connexion réinitialisée" en configurant Nginx pour écouter sur le bon port.
- **Section Concernée** : Configuration Frontend et Nginx.

### 2025-10-13
- **Action** : Extension du programme de 14 à 21 jours avec navigation libre entre tous les jours.
- **Fichiers Impactés** : frontend/src/App.jsx (logique étendue), frontend/src/index.css (styles calendrier).
- **Pourquoi** : Permettre aux utilisateurs de continuer au-delà des 14 jours initiaux et naviguer librement entre tous les jours.
- **Section Concernée** : Développement Frontend et Fonctionnalités.

### 2025-10-13
- **Action** : Transformation complète en calendrier mensuel classique sans limitation de jours.
- **Fichiers Impactés** : frontend/src/App.jsx (logique calendrier), frontend/src/index.css (styles calendrier mensuel).
- **Pourquoi** : Supprimer toute limitation et permettre l'accès à tous les jours de l'année avec navigation mensuelle.
- **Section Concernée** : Développement Frontend et Interface Utilisateur.

---

*Ajouter de nouvelles entrées ici après chaque modification.*

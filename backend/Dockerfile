# Dockerfile pour le backend Node.js
# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --omit=dev

# Copier le reste du code
COPY . .

# Exposer le port 12001
EXPOSE 12001

# Démarrer l'application
CMD ["npm", "start"]

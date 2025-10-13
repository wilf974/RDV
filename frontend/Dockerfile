# Dockerfile pour le frontend React
# Étape 1 : Build de l'application
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (incluant dev pour le build)
RUN npm install

# Copier le reste du code
COPY . .

# Builder l'application
RUN npm run build

# Étape 2 : Serveur de production avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés vers Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 12000
EXPOSE 12000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

#!/bin/bash

# Script de démarrage pour l'application de Jeûne et Prière 2026
# Lance Docker Compose en arrière-plan

echo "Démarrage de l'application avec Docker..."
docker-compose up --build -d

echo "Application démarrée !"
echo "- Frontend : http://localhost:12000"
echo "- Backend : http://localhost:12001"
echo "- Utilisez 'docker-compose logs' pour voir les logs."
echo "- Utilisez 'docker-compose down' pour arrêter."

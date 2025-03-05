# Utiliser l’image officielle Node.js comme base
FROM node:14

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l’application
COPY . .

# Exposer le port sur lequel l’application écoute
EXPOSE 3000

# Démarrer l’application
CMD ["npm", "start"]

# Wähle das Node.js Base Image
FROM node:14

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json für die Installation der Abhängigkeiten
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Frontend-Codes
COPY . .

# Exponiere den Port 3000
EXPOSE 3000

# Definiere den Befehl, um das React-Frontend zu starten
CMD ["npm", "start"]

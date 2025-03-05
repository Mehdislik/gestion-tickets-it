const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Système de gestion des tickets IT');
});

// Endpoint pour récupérer tous les tickets
app.get('/tickets', (req, res) => {
  // Exemple statique : dans une vraie appli, vous iriez chercher ces données dans une BDD
  res.json([{ id: 1, title: "Exemple ticket", status: "Nouveau" }]);
});

// Endpoint pour créer un ticket
app.post('/tickets', (req, res) => {
  const ticket = req.body;
  // Ajout d'un identifiant fictif et statut par défaut
  ticket.id = Math.floor(Math.random() * 1000);
  ticket.status = "Nouveau";
  res.status(201).json(ticket);
});

// Endpoint pour mettre à jour un ticket
app.put('/tickets/:id', (req, res) => {
  const ticket = req.body;
  ticket.id = req.params.id;
  res.json(ticket);
});

// Endpoint pour supprimer un ticket
app.delete('/tickets/:id', (req, res) => {
  res.json({ message: "Ticket supprimé" });
});

// Only start the server if this module is the main module
if (require.main === module) {
    app.listen(port, () => {
      console.log(`Serveur en écoute sur le port ${port}`);
    });
  }
  
  module.exports = app; // Export the app for testing
  
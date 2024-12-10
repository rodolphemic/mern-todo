const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json()); // Permet de traiter les données JSON dans le body
app.use(cors());

app.use((req, res, next) => {
    console.log(`[DEBUG] Méthode : ${req.method}, URL : ${req.url}`);
    next();
  });
  

////////// à supprimer après les tests de route
app.post('/test', (req, res) => {
    console.log('Body reçu dans /test :', req.body);
    res.json({ message: 'Test OK' });
  });

  app.get('/test', (req, res) => {
    res.send('Route /test atteinte');
    console.log('Body reçu dans /test :', req.body);
  });

//////////

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // Import routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api', todoRoutes);
  
// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

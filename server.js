// carambar-blagues-api/server.js
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jokeRoutes = require('./routes/jokeRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// --- DÉBUT DE LA MODIFICATION CORS ---
// Configure CORS pour autoriser les requêtes depuis mon domaine GitHub Pages
const corsOptions = {
  origin: 'https://coralie0586.github.io/carambar-blagues-front/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Ajoute les méthodes HTTP que le frontend va utiliser
  credentials: true, // Si tu utilises des cookies ou des en-têtes d'autorisation
  optionsSuccessStatus: 204 // Pour les requêtes preflight OPTIONS
};
app.use(cors(corsOptions));
// --- FIN DE LA MODIFICATION CORS ---


// Synchronise la base de données et démarre le serveur
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

// Configuration Swagger JSDoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Carambar Blagues API',
      version: '1.0.0',
      description: 'API for Carambar jokes',
    },
    servers: [
      { url: 'http://localhost:10000/api/v1', description: 'Development server' },
      { url: 'https://carambar-blagues-api.onrender.com/api/v1', description: 'Production server' },
    ],
    components: {
      schemas: {
        Joke: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'The joke ID', example: 1 },
            question: { type: 'string', description: 'The question part of the joke', example: 'Quelle est la femelle du hamster ?' },
            answer: { type: 'string', description: 'The answer part of the joke', example: 'L’Amsterdam' },
          },
          required: ['question', 'answer'],
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Utilise les routes des blagues avec un préfixe de version
app.use('/api/v1', jokeRoutes);

// Route de base pour controler si l'API fonctionne
app.get('/', (req, res) => {
  res.send('Welcome to the Carambar Blagues API!');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available on http://localhost:${PORT}/api-docs`);
});
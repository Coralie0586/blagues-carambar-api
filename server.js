// carambar-blagues-api/server.js
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jokeRoutes = require('./routes/jokeRoutes');
const sequelize = require('./config/database'); // Assurez-vous que la base de données est synchronisée

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Synchronise la base de données et démarre le serveur
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carambar Blagues API',
      version: '1.0.0',
      description: 'API for Carambar jokes',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`, // Pour le développement local
        description: 'Development server',
      },
      // Ajoute l'URL de production de Render.com ici une fois déployé
    ],
    components: {
      schemas: {
        Joke: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The joke ID',
              example: 1
            },
            question: {
              type: 'string',
              description: 'The question part of the joke',
              example: 'Quelle est la femelle du hamster ?'
            },
            answer: {
              type: 'string',
              description: 'The answer part of the joke',
              example: 'L’Amsterdam'
            }
          },
          required: ['question', 'answer']
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les annotations Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Utilise les routes des blagues avec un préfixe de version
app.use('/api/v1', jokeRoutes);

// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.send('Welcome to the Carambar Blagues API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Le fichier de la BDD sera créé ici
});

module.exports = sequelize;
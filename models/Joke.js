const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Joke = sequelize.define('Joke', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Pas besoin des champs createdAt et updatedAt pour ce projet
});

module.exports = Joke;
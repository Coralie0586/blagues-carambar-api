// carambar-blagues-api/controllers/jokeController.js
const Joke = require('../models/Joke');
const sequelize = require('../config/database');

// Synchronise le modèle avec la base de données (crée la table si elle n'existe pas)
sequelize.sync();

exports.addJoke = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }
    const joke = await Joke.create({ question, answer });
    res.status(201).json(joke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json(jokes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJokeById = async (req, res) => {
  try {
    const joke = await Joke.findByPk(req.params.id);
    if (!joke) {
      return res.status(404).json({ message: 'Joke not found' });
    }
    res.status(200).json(joke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRandomJoke = async (req, res) => {
  try {
    const jokes = await Joke.findAll(); // Récupère TOUTES les blagues

    if (jokes.length === 0) {
      return res.status(404).json({ message: 'No jokes found' });
    }

    // Choisis une blague aléatoirement parmi le tableau JavaScript
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[randomIndex];

    res.status(200).json(randomJoke);
  } catch (error) {
    console.error("Error fetching random joke:", error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");

/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: API for managing jokes
 */

/**
 * @swagger
 * /api/v1/blagues:
 *   post:
 *     summary: Add a new joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: Quelle est la femelle du hamster ?
 *               answer:
 *                 type: string
 *                 example: L’Amsterdam
 *     responses:
 *       201:
 *         description: Joke added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       400:
 *         description: Question and answer are required
 *       500:
 *         description: Server error
 */
router.post("/blagues", jokeController.addJoke);

/**
 * @swagger
 * /api/v1/blagues:
 *   get:
 *     summary: Get all jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: List of all jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Server error
 */
router.get("/blagues", jokeController.getAllJokes);

/**
 * @swagger
 * /api/v1/blagues/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the joke to retrieve
 *     responses:
 *       200:
 *         description: A single joke
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Server error
 */
router.get("/blagues/:id", jokeController.getJokeById);

/**
 * @swagger
 * /api/v1/blagues/random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: No jokes found
 *       500:
 *         description: Server error
 */
router.get("/blagues/random", jokeController.getRandomJoke);

module.exports = router;
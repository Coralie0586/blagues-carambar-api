# Carambar Blagues API

Bienvenue sur l'API des blagues Carambar ! Ce projet a été réalisé dans le cadre d'un exercice de sélection CDA.

Cette API fournit des blagues aléatoires et permet de gérer une collection de blagues via des endpoints RESTful.

---

## Technologies Utilisées

* **Node.js** : Environnement d'exécution JavaScript.
* **Express.js** : Framework web pour Node.js.
* **Sequelize.js** : ORM (Object-Relational Mapping) pour interagir avec la base de données.
* **SQLite** : Base de données légère, basée sur un fichier.
* **Swagger JSDoc** et **Swagger UI Express** : Pour la documentation interactive de l'API.
* **CORS** : Middleware pour gérer les requêtes cross-origin.

---

## Fonctionnalités de l'API

L'API expose les endpoints suivants :

* `GET /api/v1/blagues` : Récupère toutes les blagues.
* `GET /api/v1/blagues/:id` : Récupère une blague spécifique par son ID.
* `GET /api/v1/blagues/random` : Récupère une blague aléatoire.
* `POST /api/v1/blagues` : Ajoute une nouvelle blague à la base de données (requiert un corps JSON avec `question` et `answer`).

---

## Documentation API (Swagger)

Une documentation interactive de l'API est disponible, vous permettant de tester les endpoints directement depuis votre navigateur.

* **Lien vers la documentation Swagger (déploiement Render) :**
    [https://blagues-carambar-api-qo0w.onrender.com/api-docs](https://blagues-carambar-api-qo0w.onrender.com/api-docs)

---

## Déploiement

Cette API est déployée sur [Render.com](https://render.com/).

* **URL de l'API (serveur de production) :**
    [https://blagues-carambar-api-qo0w.onrender.com](https://blagues-carambar-api-qo0w.onrender.com)

---

## Configuration et Lancement en Local (pour les développeurs)

Pour lancer l'API en local :

1.  **Cloner le dépôt GitHub** :
    `git clone https://github.com/Coralie0586/blagues-carambar-api.git`
2.  **Naviguer vers le dossier du projet** :
    `cd blagues-carambar-api`
3.  **Installer les dépendances** :
    `npm install`
4.  **Lancer le serveur** :
    `node server.js`

L'API sera alors accessible sur `http://localhost:3000` et sa documentation Swagger sur `http://localhost:3000/api-docs`.

---

## Problème Connu (pour la route `/random`)

J'ai rencontré un comportement inattendu avec l'endpoint `GET /api/v1/blagues/random`. Pour générer une blague aléatoire, deux approches ont été explorées :

1.  Une première tentative en utilisant la fonction `RANDOM()` directement au niveau de la base de données via **Sequelize**.

2.  Puis, une seconde méthode, en récupérant **toutes les blagues** (`Joke.findAll()`) et en choisissant une blague aléatoirement via une logique **JavaScript (`Math.random()`)**.

Malheureusement, les deux méthodes aboutissent à la même erreur : cet endpoint retourne systématiquement un statut `404 Not Found` avec le message "Joke not found". Ce problème survient même lorsque la base de données contient des blagues (ce qui est vérifiable via `GET /api/v1/blagues`). Après de multiples recherches et tentatives de débogage, il semblerait que ce comportement se manifeste à la fois en environnement local et après déploiement sur Render.com. Cela semble être lié à des interactions complexes au sein de l'environnement Node.js/Sequelize/SQLite qui ne m'ont pas été possible de resoudre à ce jour.

---

## Liens Utiles

* **Dépôt GitHub du Backend (cette API) :**
    [https://github.com/Coralie0586/blagues-carambar-api.git](https://github.com/Coralie0586/blagues-carambar-api.git)
* **Dépôt GitHub du Frontend :**
    [https://github.com/Coralie0586/carambar-blagues-front.git](https://github.com/Coralie0586/carambar-blagues-front.git)
* **Application Frontend déployée (GitHub Pages) :**
    [https://coralie0586.github.io/carambar-blagues-front/](https://coralie0586.github.io/carambar-blagues-front/)

---

## Contact

Dupuis Coralie
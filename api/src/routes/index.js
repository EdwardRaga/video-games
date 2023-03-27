const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//controllers
const getAllGames = require('../controllers/getAllGames.controller');
const getAllGenres = require('../controllers/getAllGenres.controller');
const addVideoGame = require('../controllers/addVideoGame.controller');
const getGameDetail = require('../controllers/getGameDetail.controller')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//obtener los primeros 100 juegos (No los agrega al DB)
router.get('/videogames', getAllGames)
//obtener los 19 generos diponibles en la db
router.get('/genres', getAllGenres)
//agregar videogame desde el form
router.post('/videogames', addVideoGame)
//obtener personaje por id API / DB
router.get('/videogames/:idVideogame',getGameDetail)

module.exports = router;

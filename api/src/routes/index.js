const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js')


//controllers
// obtiene los juegos
const {getAllGames} = require('../controllers/getAllGames.controller');
//obtiene los generos
const getAllGenres = require('../controllers/getAllGenres.controller');

const getPlaforms = require('../controllers/getPlatforms.controller')
//agrega un juego
const addVideoGame = require('../controllers/addVideoGame.controller');
//obtien los detalles de un juego
const getGameDetail = require('../controllers/getGameDetail.controller')
//busca un juego 
const searchGame = require('../controllers/searchGame.controller')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//obtener los primeros 100 juegos (No los agrega al DB)
router.get('/videogames', getAllGames)
//obtener los 19 generos diponibles en la db
router.get('/genres', getAllGenres)

router.get('/platforms', getPlaforms)
//agregar videogame desde el form
router.post('/videogames', addVideoGame)
//obtener personaje por id API / DB
router.get('/videogames/:idVideogame',getGameDetail)

//buscar video game
router.get('/videogames/games/search',searchGame)

module.exports = router;

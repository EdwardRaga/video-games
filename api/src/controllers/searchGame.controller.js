require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db");
const { API_KEY } = process.env;
const PAGE_SIZE = 15;
//Array de objetos videogames
const  {videogames}  = require("./getAllGames.controller.js");

async function searchGame(req, res) {
  try {
    let games = videogames()
    let result = []; // Array para almacenar los juegos que cumplan la condición
    let searchGame =  req.query.name; //juago a buscar en la db o en la api

    for (let i = 0; i < games.length && result.length < 15; i++) {
      if (games[i].name.toLowerCase().includes(searchGame.toLowerCase())) {
        result.push(games[i]);
      }
    }

    //pasar a minusculas debido a que el operrador ilike es sensible a minusculas y mayusculas
    
    let allUpperCase = searchGame.toUpperCase(); ////todo el nombre es pasado a mayusculas
    
    let lowerCase = searchGame.toLowerCase(); //todo el nombre es pasado a minusculas
    // unión entre la primera letra mayuscula y el resto minusculas
    let upperCase = allUpperCase.charAt() + lowerCase.substring(1, lowerCase.length);

    //buscar  en la api
    // const requestaPi = await axios.get(
    //   `https://api.rawg.io/api/games?search=${lowerCase}&page_size=${PAGE_SIZE}&key=${API_KEY}`
    // );


    //buscar en la db
    let requestDb = await Videogame.findAll({
      where: {
        //operador or caso de que el nombre del juego se encuentren en minusculas o mayus
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${lowerCase}%`,
            },
          },
          {
            name: {
              //el operador like lo que hace es buscar la similitud en los campos de una columna y los % % indica que se busca cualquier valor que contenga la subcadena especificada, sin importar la posición en que se encuentre dentro del valor de la columna
              [Op.iLike]: `%${upperCase}%`,
            },
          },
        ],
      },
      limit: PAGE_SIZE,
    });
     await requestDb;
     let allGames = result.concat(requestDb);
  
     if (allGames.length === 0) {
          res
            .status(404)
            .json({
              message:
                "No se encontraron videojuegos con el término de búsqueda proporcionado",
            });
        } else {
          if (allGames.length > 15) allGames = allGames.slice(0, 15);

          res.status(200).json(allGames);
        }

    // Promise.all([requestaPi, requestDb]).then((results) => {
    //   const videogamesApi = results[0].data.results;
    //   const videogamesDb = results[1];

    //   const games = [...videogamesApi, ...videogamesDb];

    //   if (games.length === 0) {
    //     res
    //       .status(404)
    //       .json({
    //         message:
    //           "No se encontraron videojuegos con el término de búsqueda proporcionado",
    //       });
    //   } else {
    //     res.status(200).json(games);
    //   }
    // });
    // res.status(201).json(requestaPi.data.results);
  } catch (err) {
    
    res.status(404).json({ message: err.message });
  }
}

module.exports = searchGame;
//https://api.rawg.io/api/games?search=vlaue&key=4cb6ed0f83f040d0b51868a8195f2d12

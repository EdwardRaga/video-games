require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db");
const { API_KEY } = process.env;
const PAGE_SIZE = 15;

async function searchGame(req, res) {
  try {
    //juago a buscar en la db o en la api
    const name = req.query.name;
    //pasar a minusculas debido a que el operrador ilike es sensible a minusculas y mayusculas
    //todo el nombre es pasado a mayusculas
    let allUpperCase = name.toUpperCase();
    //todo el nombre es pasado a minusculas
    let lowerCase = name.toLowerCase();
    // unión entre la primera letra mayuscula y el resto minusculas
    let upperCase =allUpperCase.charAt() + lowerCase.substring(1, lowerCase.length);

    //buscar  en la api
     const requestaPi = await axios.get(
       `https://api.rawg.io/api/games?search=${lowerCase}&page_size=${PAGE_SIZE}&key=${API_KEY}`
     );

    //buscar en la db
    const requestDb = await Videogame.findAll({
      where: {
         //operador or caso de que el nombre del juego se encuentren en minusculas o mayus
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${lowerCase}%`,
            },
          },
          {
            nombre: {
               //el operador like lo que hace es buscar la similitud en los campos de una columna y los % % indica que se busca cualquier valor que contenga la subcadena especificada, sin importar la posición en que se encuentre dentro del valor de la columna
              [Op.iLike]: `%${upperCase}%`,
            },
          },
        ],
      },
       limit: PAGE_SIZE,
    });

 Promise.all([requestaPi,requestDb])
 .then(results =>{
   const videogamesApi = results[0].data.results;
   const videogamesDb = results[1];

   const games = [...videogamesApi,...videogamesDb];

   if(games.length === 0){
      res.status(404).json({ message: "No se encontraron videojuegos con el término de búsqueda proporcionado" })
   }
   else{
      res.status(200).json(games)
   }
 })
// res.status(201).json(requestaPi.data.results);
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

module.exports = searchGame;
//https://api.rawg.io/api/games?search=vlaue&key=4cb6ed0f83f040d0b51868a8195f2d12

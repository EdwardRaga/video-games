var validate = require('uuid-validate');
const axios = require('axios');
const {Videogame} = require('../db');

async function getGameDetail(req,res){

    try{
        //! obtenemos id por params
        const params =req.params.idVideogame;
        //validamos si es un id de tipo UUID
      
        //en caso de ser UUID buscamos en la db
       if(validate(params,4)){
           const videogame = await Videogame.findByPk(id);
           res.status(201).json(videogame);
       }else{
        //de lo contrario bucar el la API
        const request = await axios.get(`https://api.rawg.io/api/games/${params}?key=4cb6ed0f83f040d0b51868a8195f2d12`);
        const {id,name,description,released,rating,background_image,platforms,genres} = request.data;
        const game = {
            id,
            name,
            description,
            released,
            rating,
            background_image,
            platforms,
            genres
        }
        //respuesta del detail del videojuego
        res.status(201).json(game)
       }
    }catch(error){
        res.status(400).json({err:error})
    }
}

module.exports = getGameDetail;
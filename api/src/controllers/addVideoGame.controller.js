const { Videogame } = require("../db");

async function addVideoGame(req, res) {
  try {
    //data del video juego recivida por body

    const {
      name,
      background_image,
      description,
      platforms,
      release,
      rating,
      genres,
    } = req.body;


   
    //crear el video juego en la db
    const newGame = await Videogame.create({
      name,
      description,
      background_image,
      release,
      rating,
    });
    //crear las asociaciones con la tabla intermedia
    // el nuvo juego asocia del modelo Genre los generos pasados por parametros ---> [1,2,30] 
    await newGame.addGenre(genres);
    // el nuvo juego asocia del modelo Platform las plataformas pasados por parametros ---> [1,2,30] 
    await newGame.addPlatform(platforms);


    //prueba traer data de un juego
  


    res.status(201).send({msg:'video game added successfully'});
  } catch (e) {
   
    res.status(400).json({err:e});
  }
}

module.exports = addVideoGame;

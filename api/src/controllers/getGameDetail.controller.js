var validate = require("uuid-validate");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");

async function getGameDetail(req, res) {
  try {
    //! obtenemos id por params
    const params = req.params.idVideogame;
    //validamos si es un id de tipo UUID

    //en caso de ser UUID buscamos en la db
    if (validate(params, 4)) {
      //videogame sin las plataformas
      const videogame = await Videogame.findByPk(params, {
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      //plataformas
      const videogameplatforms = await Videogame.findByPk(params, {
        include: {
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      //array de plataformas
      const { platforms } = videogameplatforms;

      const data = platforms.map((platform) => {
        return { platform: platform };
      });

      // Crear objeto con la información combinada
      const result = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        background_image: videogame.background_image,
        release: videogame.release,
        rating: videogame.rating,
        genres:videogame.genres,
        platforms: data,
      };

      res.status(200).json(result);
    } else {
      //de lo contrario bucar el la API
      const request = await axios.get(
        `https://api.rawg.io/api/games/${params}?key=4cb6ed0f83f040d0b51868a8195f2d12`
      );
      const {
        id,
        name,
        description,
        released,
        rating,
        background_image,
        platforms,
        genres,
      } = request.data;
      const game = {
        id,
        name,
        description,
        released,
        rating,
        background_image,
        platforms,
        genres,
      };
      //respuesta del detail del videojuego
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}

module.exports = getGameDetail;

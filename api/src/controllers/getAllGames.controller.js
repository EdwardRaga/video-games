require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;


const getApiData = async (req,res) => {
    try {
      let videogames = [];
      for (let next = 1; next < 6; next++) {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${next}`
        );
        response.data?.results.map((data) => {
          // console.log(data);
          const { id, name, description, platforms,background_image, released, rating} = data;
          const game = {
            id,
            name,
            description,
            platforms,
            background_image,
            released,
            rating,
          };
          videogames.push(game);
        });
      }
      res.status(201).json(videogames)
    } catch (e) {
      res.status(400).json({err:e})
    }
  };
    

module.exports = getApiData;
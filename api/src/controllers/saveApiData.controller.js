require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre, Platform } = require("../db");
// const {  } = conn.models;


//obtener las generos y agregar a la DB
async function saveApiDataGenres() {
  try {
    
    const request = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = request.data.results.map((genre) => ({
      id: genre.id,
      name: genre.name,
      image_background:genre.image_background,
      

    }));
    await Genre.bulkCreate(genres);
  } catch (err) {
    console.log(err);
  }
}
//obtener las plataformas y agregar a la DB
async function saveApiDataPlatforms() {
  try {
    //platforms
    let platforms = [];
    for (let next = 1; next < 3; next++) {
      const response = await axios.get(
        `https://api.rawg.io/api/platforms?key=${API_KEY}&page=${next}`
      );
      response.data?.results.map((plarform) => {
        // console.log(data);
        const { id, name } = plarform;
        const objPlatform = {
          id,
          name,
        };
        platforms.push(objPlatform);
      });
    }
    await Platform.bulkCreate(platforms);
  } catch (err) {
    console.log(err);
  }
}

module.exports =  {
    saveApiDataGenres,
    saveApiDataPlatforms,
};
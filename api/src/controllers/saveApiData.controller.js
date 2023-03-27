require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre, Platform } = require("../db");
// const {  } = conn.models;

async function saveApiDataGenres() {
  try {
    //generos
    const request = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = request.data.results.map((genre) => ({
      id: genre.id,
      nombre: genre.name,
    }));
    await Genre.bulkCreate(genres);
  } catch (err) {
    console.log(err);
  }
}
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
          nombre:name,
        };
        platforms.push(objPlatform);
      });
    }
    console.log(platforms);
    await Platform.bulkCreate(platforms);
  } catch (err) {
    console.log(err);
  }
}

module.exports =  {
    saveApiDataGenres,
    saveApiDataPlatforms,
};
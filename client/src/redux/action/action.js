export const GET_GAMES = "GET_GAMES";
export const GET_DETAIL = "GET_DATAIL";
export const GET_GENRES = "GET_GENRES";
export const ADD_GAME = "ADD_GAME";
export const SEARCH_GAME = "SEARCH_GAME";
export const FILTERS =  "FILTERS";

//OBTENER TODOS LOS JUEGOS
export function getGames() {
  return async function (dispatch) {
    try{
      const response = await fetch(`http://localhost:3001/videogames`);
      const data = await response.json();
      dispatch({ type: GET_GAMES, payload: data})

    }catch(e){
      console.log(e);
    }
  };
}
//OBTENER TODOS LOS GENEROS
export function getGenres() {
  return async function (dispatch) {
    try{
      const response = await fetch(`http://localhost:3001/genres`);
      const data = await response.json();
      dispatch({ type: GET_GENRES, payload: data})

    }catch(e){
      console.log(e);
    }
  };
}

//BUSCAR JUEGOS
export function searchGame(name) {
  return async function (dispatch) {
    try{
      let response = await fetch(`http://localhost:3001/videogames/games/search?name=${name}`);
      let data = await response.json();
      console.log(data);
      dispatch({ type: SEARCH_GAME, payload: data})

    }catch(e){
      console.log(e);
    }
  };
}

//FILTRAR POR API  O DB
export function filters(games){
  return {type:FILTERS, payload:games}
}

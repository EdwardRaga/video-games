export default function filter(videogames, genre) {
    let genreFilter = [];
    for (let i = 0; i < videogames.length; i++) {
      const game = videogames[i];
      if (typeof game.genres === "object") {
        for (let j = 0; j < game.genres.length; j++) {
          if (game.genres[j].name === genre) {
            genreFilter.push(game);
            break;
          }
        }
      }
    }
    return genreFilter;
  }
  
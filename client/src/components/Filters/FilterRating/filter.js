export default function filter(videogames, rating) {
  if (rating === "buttom") {
    //buble sort me aseguro que el primero i siempre es el minimo (el mas bajo)
    //el elemento i lo voy comparando con el resto del los elementos, si hay uno menor que haga cambios de posiciones
    for (let i = 0; i < videogames.length; i++) {
      for (let j = i + 1; j < videogames.length; j++) {
        if (videogames[j].rating < videogames[i].rating) {
          // validar una posicion adelantada
          let aux = videogames[i];
          videogames[i] = videogames[j];
          videogames[j] = aux;
        }
      }
    }
    return videogames;
  } else {
    for (let i = 0; i < videogames.length; i++) {
      for (let j = i + 1; j < videogames.length; j++) {
        if (videogames[j].rating > videogames[i].rating) {
          // validar una posicion adelantada
          let aux = videogames[i];
          videogames[i] = videogames[j];
          videogames[j] = aux;
        }
      }
    }
    return videogames;
  }
}

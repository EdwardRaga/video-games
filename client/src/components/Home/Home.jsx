import React, { useEffect } from "react";
import style from "./Home.module.css";
import Cards from "../Cards/Cards";
import FilterdbApi from "../Filters/FilterdbApi/FilterdbApi.jsx";
import Paginate from "../Paginate/Paginate";
import FilterRating from "../Filters/FilterRating/FilterRating";
import FilterGenre from "../Filters/FilterGenre/FilterGenre";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getGames,getGenres } from "../../redux/action/action";

export default function Home() {
  const videogames = useSelector((state) => state.videogames); // estado global con todos los personajes
  //depachador // Getgames
  const dispatch = useDispatch();

  const [paginate, setPaginate] = useState(videogames.slice(0, 15)); // estado para los personajes paginados

  //se ejecute solo una vez al montar el componente
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres())
  }, []);

  //actualizar el estado de paginate cuando videogames cambie,
  useEffect(() => {
    setPaginate(videogames.slice(0, 15));
  }, [videogames]);

  return (
    <div>
      <div className={style.wrapper}>
        <main className={style.main}>
          <div className={style.container}>
            <Cards paginate={paginate} />
          </div>
        </main>

        <aside className={style.aside}>
          <div className={style.filterSection}>
            <span className={style.filterLabel}>ENDGAME</span>
          </div>

          <div className={style.filter}>
            <FilterdbApi />
          </div>
          <div>
            <FilterRating/>
          </div>
          <div>
            <FilterGenre/>
          </div>
        </aside>
      </div>

      <div className={style.page}>
        <Paginate
          videogames={videogames}
          setPaginate={setPaginate}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

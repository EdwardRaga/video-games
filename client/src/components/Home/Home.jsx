import React, { useEffect } from "react";
import style from "./Home.module.css";
import Cards from "../Cards/Cards";
import FilterdbApi from "../Filters/FilterdbApi/FilterdbApi.jsx";
import Paginate from "../Paginate/Paginate";
import FilterRating from "../Filters/FilterRating/FilterRating";
import FilterGenre from "../Filters/FilterGenre/FilterGenre";
import FilterAZ from "../Filters/FilterAZ/FilterAZ";
import FilterName from "../Filters/FilterName/FilterName";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getGames, getGenres } from "../../redux/action/action";

import Loading from "../Loading/Loading";
export default function Home() {
  const videogames = useSelector((state) => state.videogames); // estado global con todos los personajes
  //depachador // Getgames
  const dispatch = useDispatch();

  const [paginate, setPaginate] = useState(null); // estado para los personajes paginados
  const [landing, setLanding] = useState(true);
  const [error, setError] = useState(null);

  //se ejecute solo una vez al montar el componente
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, []);

  //actualizar el estado de paginate cuando videogames cambie,
  useEffect(() => {
    setPaginate(videogames.slice(0, 15));

    if(paginate) {
      setLanding(false);
    }
  }, [videogames]);

  return (
    <>
      {landing && <Loading />}

      {!landing && (
        <div className={style.wrapper}>
          <div className={style.filterSection}>
            <div className={style.filter_name}>
              <FilterName setError={setError} />
            </div>
            {!error && (
              <div className={style.filters}>
                <div className={style.select}>
                <FilterGenre />
                <FilterdbApi />
                </div>
                <div className={style.botones}>
                <FilterRating />
                <FilterAZ />
                </div>
                
              </div>
            )}
          </div>

          {!error && (
            <div>
              <main className={style.main}>
                <Cards paginate={paginate} />
              </main>
            </div>
          )}

          {!error && (
            <div className={style.paginate}>
              <Paginate
                videogames={videogames}
                setPaginate={setPaginate}
                setLanding={setLanding}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      )}
      {error && <p>{error}</p>}

    </>
  );
}

import { detailGame } from "../../redux/action/action";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import Loading from "../Loading/Loading";

//icons
import { faSortAlphaUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Detail() {
  //mostrar detalles del video juego
  //hacer una request al back con el id params
  //setear estado local

  //State
  const [game, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);

  //id videogame
  const params = useParams();

  useEffect(() => {
    detailGame(params.id).then((data) => {
      setDetail(data);
      setLoading(false);
      setRating(Math.floor(data.rating));
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className={style.container}>
          <h1>{game.name}</h1>
          <div>
            <p className={style.released}>{game.released}</p>
          </div>
          <img src={game.background_image} alt="" className={style.image} />

          <div className={style.rating}>
            {rating &&
              Array.from({ length: rating }, () => "stars").map((star) => {
                return <FontAwesomeIcon icon={faStar} styles={"white"} />;
              })}
          </div>

          <div className={style.genres_platforms}>
            <div className={style.wrapper_genres}>
              <label>Genres</label>

              <div className={style.genres}>
                {game.genres?.map((platform) => {
                  return <p>{platform?.name}</p>;
                })}
              </div>
            </div>

            <div className={style.wrapper_platforms}>
              <label>Platforms</label>

              <div className={style.platforms}>
                {game.platforms?.map((platform) => {
                  return <p>{platform?.platform?.name}</p>;
                })}
              </div>
            </div>
          </div>
          <div
            className={style.description}
            dangerouslySetInnerHTML={{ __html: game.description }}
          >
            {/* //description */}
          </div>
        </div>
      )}
    </>
  );
}

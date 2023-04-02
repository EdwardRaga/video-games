import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, name, image, genre } = props;

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.img}>
          <Link to={"/detail"}>
            <img src={image} alt="image_game" />
          </Link>
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}

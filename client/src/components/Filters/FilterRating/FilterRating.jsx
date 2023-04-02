import filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import { filters } from "../../../redux/action/action";

//mapear cada video juego
//ir comrpbando si su raiting del juego sigueinte es menor  y si lo es cambiarlo y seguir validando, puedes
// con un doble for
export default function FilterRating() {
  const state = useSelector((state) => state.copygames);
  const dispatch = useDispatch();

  //manejador tiene que hacer un dispatch al SG
  // con los personajes ordenados + - / - + 
  const handleClick = (event) => {
    event.preventDefault()
    const rating = event.target.name
    dispatch(filters(filter(state,rating)))
    
  };

  return (
    <div>
      <button name={"top"} onClick={handleClick}>
        Top Raiting
      </button>
      <button name={"buttom"} onClick={handleClick}>
        Bottom Raiting
      </button>
    </div>
  );
}

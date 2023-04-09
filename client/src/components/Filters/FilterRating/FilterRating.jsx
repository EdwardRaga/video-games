import filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import { filters } from "../../../redux/action/action";
import { Link } from "react-router-dom";

import style from './FilterRating.module.css'

//icons
import { faCaretUp,faCaretDown,faTrophy,faGhost} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className={style.container}>
    

   <Link name={"top"}  onClick={handleClick}>
    <FontAwesomeIcon icon={faTrophy}  style={{ color: "white" }}/>
    Best Rated
      </Link>
      
  
    

   <Link name={"buttom"}  onClick={handleClick}>
    <FontAwesomeIcon icon={faGhost}  style={{ color: "white" }}/>
    Worst Rated
      </Link>

  
   

    </div>
  );
}

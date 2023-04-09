import { useSelector, useDispatch } from "react-redux";
import filter from "./filter";
import { Link } from "react-router-dom";
import { filters } from "../../../redux/action/action";
//icons
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterAZ = () => {
  const state = useSelector((state) => state.copygames);
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {

    event.preventDefault();
    dispatch(filters(filter(state)));
  };

  return (
    <div>
      <Link onClick={handleButtonClick} >
        <FontAwesomeIcon
          icon={faSortAlphaUp}
          style={{ color: "white" }}
          />
          Alphabetical
      </Link>
    </div>
  );
};

export default FilterAZ;

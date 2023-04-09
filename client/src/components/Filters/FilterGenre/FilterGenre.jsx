import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGenres, filters } from "../../../redux/action/action";
import filter from "./filter";


import {faGamepad} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterGenre = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres())
  }, []);

  const handleSelect = (event) => {
    const genre = event.target.value;
   
     console.log(state.copygames.length);
     console.log(genre);
    dispatch(filters(filter(state.copygames,genre)))
  };

  return (
    <div>
      <select onChange={(e) => handleSelect(e)}>
        {state?.genres.map((genre) => {
          return (
            <option value={genre.name} id={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterGenre;

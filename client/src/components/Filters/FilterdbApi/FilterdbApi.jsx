import React, { useState, useEffect } from "react";

import filter from "./FilterdbApi";
import { filters, getGames } from "../../../redux/action/action";
import { useSelector,useDispatch } from "react-redux";

//icons
import { faFilter} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function FilterdbApi() {
  //api 
  // 
  const dispatch = useDispatch();
  const state = useSelector((state) => state.copygames);


 
  
  const handleSelect = (event)=>{
    const target = event.target.value;

    if(filter(state,target) === 'allgames'){
      dispatch(getGames())
    }
    else{
      dispatch(filters(filter(state,target)))
    }
    // console.log(games);
    
  }



  return (
    <div>
        <select onChange={handleSelect} id="filtro" name="filtro">
        <option value="allgames" defaultValue>All games</option>
        <option value="database">
        Database
        </option>
        <option value="api">Api</option>
      </select>
    </div>
  );
}

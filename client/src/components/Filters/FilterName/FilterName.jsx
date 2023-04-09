import React from "react";
import style from '../FilterName/FilterName.module.css'
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";

import { searchGame,getGames } from "../../../redux/action/action";
//iconos
import { faSearch,faGamepad, faHome,faCogs, faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterName({setError}) {


    
  const [searchName, setsearchName] = useState({ name: "" });
  const dispatch = useDispatch();

  useEffect(()=>{
    if(searchName.name.length === 0){
      dispatch(getGames())
      setError(null)
    }
  },[searchName])

  const handleSearcheChange =  (event) => {
    let target = event.target.name;
    let value = event.target.value;


    setsearchName({
      ...searchName,
      [target]: value,
    });

    if (searchGame.name.length > 1) {
      dispatch(searchGame(searchName.name))
      .then(null, (error)=> setError('No video games were found with the provided search term.') )
    } 
  };
  return (
    <div className={style.search}>
      <input
        onChange={handleSearcheChange}
        name={"name"}
        type="text"
        placeholder="search"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className={style.searchIcon}
        style={{ color: "white" }}
      />
    </div>
  );
}

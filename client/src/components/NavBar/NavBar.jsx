import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchGame, getGames } from "../../redux/action/action";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

//iconos
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [searchName, setsearchName] = useState({ name: "" });
  const dispatch = useDispatch();

  useEffect(()=>{
    if(searchName.name.length === 0){
      dispatch(getGames())
    }
  },[searchName])

  const handleSearcheChange = (event) => {
    let target = event.target.name;
    let value = event.target.value;


    setsearchName({
      ...searchName,
      [target]: value,
    });

    if (searchGame.name.length > 1) {
      dispatch(searchGame(searchName.name));
    } 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={"/home"}>
          <h1>PlayNation</h1>
        </Link>
        {/* <img src="logo.png" alt="logo" /> */}
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/addgame"}>AddGame</Link>
          </li>
        </ul>
        <div className={styles.search}>
          <input
            onChange={handleSearcheChange}
            name={"name"}
            type="text"
            placeholder="search"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.searchIcon}
            style={{ color: "white" }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

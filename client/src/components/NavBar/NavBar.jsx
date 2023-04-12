import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchGame, getGames } from "../../redux/action/action";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

//iconos
import { faSearch,faGamepad, faHome,faCogs, faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={"/home"}>
          <h1>PlayNation</h1>
        </Link>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <Link to={"/home"}><FontAwesomeIcon
            icon={ faHome}
            style={{ color: "white" }}
          /> Home</Link>
          </li>
          <li>
            <Link to={"/addgame"}><FontAwesomeIcon
            icon={faGamepad}
            style={{ color: "white" }}
          /> Add game</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

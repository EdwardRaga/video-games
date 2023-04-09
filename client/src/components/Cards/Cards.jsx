import React, { useEffect } from "react";
import style from "./Cards.module.css";
import { connect } from "react-redux";
import Card from "../Card/Card";

export default function Cards(props) {
  const { paginate } = props;

  
  
  // useEffect(() => {
  //   getGames();
  // }, []);
  
  //component
  return (
    <>
      {paginate.map((game)=>{
      const {id,name,background_image,genres} = game;
        return <Card id={id} name={name} image={background_image} genres={genres} key={id} />
      })}
  </>
  )
}


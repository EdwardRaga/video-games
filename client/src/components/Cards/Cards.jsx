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

// function mapStateToProps(state) {
//   return {
//     // videogames: state.videogames,
//     paginate: state.paginate,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getGames: () => dispatch(getGames()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Cards);

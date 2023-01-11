import React from "react";
//import { Card } from "./Card";
import Cards from "../cards/Cards";

const CardsDisplay = ({ empCards, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
<>
    <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {empCards?.Employees?.length>=0 && empCards.Employees.map(it=> <Cards data={it}/>)}
      </div>

    {/* <div className="displayCard">
      {movieCard?.map((title) => {
        return (
          <Card
            title={title.title}
            imageurl={"https://image.tmdb.org/t/p/w500" + title.backdrop_path}
            body={"Rating: " + title.vote_average}
          />
        );
      })}
    </div> */}
    </>
  );
};

export default CardsDisplay;
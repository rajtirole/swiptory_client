import React from "react";
import style from "./StoryCategory.module.css";
import StoryCardsCategory from "../StoryCardsCategory/StoryCardsCategory";
const StoryCategory = ({ Categorie ,stories=[]}) => {
  return (
    <div className={style.StoryCategoryContainer}>
      <h2>{`Top Stories About ${Categorie.name}`}</h2>
      <StoryCardsCategory stories={stories}></StoryCardsCategory>
    </div>
  );
};

export default StoryCategory;



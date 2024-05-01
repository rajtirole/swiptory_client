import React from "react";
import style from "./StoryCategory.module.css";
import { useEffect } from "react";
import StoryCardsCategory from "../StoryCardsCategory/StoryCardsCategory";
import { usePostsContext } from "../../context/PostContext";
import { getNextBookmarked } from "../../api/api";
const StoryCategory = ({ Categorie, stories = [] }) => {
  return (
    <>
      <div className={style.StoryCategoryContainer}>
        {Categorie !== "bookmarkedPosts" &&
          (Categorie === "userCreatedPosts" ? (
            <h2>{"Your Stories"}</h2>
          ) : (
            <h2>{`Top Stories About ${Categorie.name}`}</h2>
          ))}
        <StoryCardsCategory
          stories={stories}
          Categorie={Categorie}
        ></StoryCardsCategory>
      </div>
    </>
  );
};

export default StoryCategory;

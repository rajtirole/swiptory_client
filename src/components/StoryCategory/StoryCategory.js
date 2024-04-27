import React from "react";
import style from "./StoryCategory.module.css";
import { useEffect } from "react";
import StoryCardsCategory from "../StoryCardsCategory/StoryCardsCategory";
import { usePostsContext } from "../../context/PostContext";
const StoryCategory = ({ Categorie ,stories=[]}) => {
  const {userCreatedposts,userCreatedStory}=usePostsContext()
useEffect(()=>{
 (async()=>{await userCreatedStory()})()

},[])
console.log(userCreatedposts);

  return (
   <>
    {userCreatedposts&&<div className={style.StoryCategoryContainer}>
      <h2>{`Your Stories`}</h2>
      <StoryCardsCategory stories={userCreatedposts} userCreatedposts={true}></StoryCardsCategory>
    </div>}
    <div className={style.StoryCategoryContainer}>
      <h2>{`Top Stories About ${Categorie.name}`}</h2>
      <StoryCardsCategory stories={stories} Categorie={Categorie}></StoryCardsCategory>
    </div>
    </>
  );
};

export default StoryCategory;



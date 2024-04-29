import React, { useState } from "react";
import StoryCategory from "../StoryCategory/StoryCategory";
import { Categorie } from "../../constants/Categories";
import Categories from "../Categories/Categories";
import style from "./StorySection.module.css";
import { usePostsContext } from "../../context/PostContext";

const StorySection = () => {





  


    // const [categoriesPosts, setCategoriesPosts] = useState(null);
    const { posts,userCreatedposts ,categoriesPosts,setCategoriesPosts} = usePostsContext();
    console.log(categoriesPosts);
  
  return (
    <div className={style.StorySectionContainer}>
      <div>
        <Categories setCategoriesPosts={setCategoriesPosts}></Categories>
      </div>
      {userCreatedposts?.length&&!categoriesPosts&&<StoryCategory
                Categorie={'userCreatedPosts'}
                stories={userCreatedposts}
              ></StoryCategory>}
        {!categoriesPosts ? (
          Categorie.map((Categorie, index) => {
            return (
              <StoryCategory
                key={index}
                Categorie={Categorie}
                stories={posts[Categorie.name]}
              ></StoryCategory>
            );
          })
        ) : (
          <>
            <StoryCategory
              Categorie={categoriesPosts}
              stories={posts[categoriesPosts.name]}
            ></StoryCategory>
          </>
        )}
      {/* </div> */}
    </div>
  );
};

export default StorySection;

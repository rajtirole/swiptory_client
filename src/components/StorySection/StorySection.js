import React, { useEffect } from "react";
import StoryCategory from "../StoryCategory/StoryCategory";
import { Categorie } from "../../constants/Categories";
import Categories from "../Categories/Categories";
import style from "./StorySection.module.css";
import { usePostsContext } from "../../context/PostContext";
import { useUserContext } from "../../context/AuthContext";

const StorySection = () => {
  const {
    fetchPosts,
    categoriesPosts,
    posts,
    userCreatedposts,
    isPageReloadRequired,
  } = usePostsContext(); // Using the fetchPosts function from PostsContext
  const { user, isAuthenticated } = useUserContext();
  useEffect(() => {
    // Fetch posts when the component mounts
    (async () => {
      await fetchPosts();
    })();
  }, [categoriesPosts, isPageReloadRequired, user, isAuthenticated]); // Dependency array to prevent unnecessary fetches
  console.log(user);
  return (
    <div className={style.StorySectionContainer}>
      <div>
        <Categories></Categories>
      </div>
      {userCreatedposts?.length > 0 && !categoriesPosts && isAuthenticated && (
        <StoryCategory
          Categorie={"userCreatedPosts"}
          stories={userCreatedposts}
        />
      )}

      {!categoriesPosts ? (
        Categorie.map((Categorie, index) => {
          return (
            <StoryCategory
              key={index}
              Categorie={Categorie}
              stories={posts[Categorie?.name]}
            ></StoryCategory>
          );
        })
      ) : (
        <>
          {
            <StoryCategory
              Categorie={categoriesPosts}
              stories={posts[categoriesPosts?.name]}
            ></StoryCategory>
          }
        </>
      )}
    </div>
  );
};

export default StorySection;

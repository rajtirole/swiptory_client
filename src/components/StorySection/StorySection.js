import React, { useEffect } from "react";
import StoryCategory from "../StoryCategory/StoryCategory";
import { Categorie } from "../../constants/Categories";
import Categories from "../Categories/Categories";
import style from "./StorySection.module.css";
import { usePostsContext } from "../../context/PostContext";

const StorySection = () => {
  const { fetchPosts,categoriesPosts ,posts,userCreatedposts} = usePostsContext(); // Using the fetchPosts function from PostsContext
  useEffect(() => {
    // Fetch posts when the component mounts
      (async()=>{
        await fetchPosts();
      })()
  }, [categoriesPosts]); // Dependency array to prevent unnecessary fetches





  


    // const [categoriesPosts, setCategoriesPosts] = useState(null);
  // setCategoriesPosts={setCategoriesPosts} categories
  return (
    <div className={style.StorySectionContainer}>
      <div>
        <Categories ></Categories>
      </div>
      {/* {(userCreatedposts?.length&&!categoriesPosts)&&
      <StoryCategory
                Categorie={'userCreatedPosts'}
                stories={userCreatedposts}
              ></StoryCategory>
              } */}
            {(userCreatedposts?.length>0 && !categoriesPosts )&& (
  <StoryCategory
    Categorie={'userCreatedPosts'}
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
        // {!categoriesPosts ? (
        //   Categorie.map((Categorie, index) => {
        //     return (
        //       <StoryCategory
        //         key={index}
        //         Categorie={Categorie}
        //         stories={posts[Categorie.name]}
        //       ></StoryCategory>
        //     );
        //   })
        // ) : (
          <><div>fsdkfksjdlkj</div>
            {
              
              <StoryCategory
              Categorie={categoriesPosts}
              stories={posts[categoriesPosts?.name]}
            ></StoryCategory>}
          </>
        )}
      {/* </div> */}
    </div>
  );
};

export default StorySection;

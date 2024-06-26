import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/AuthContext";
import { usePostsContext } from "../../context/PostContext";
import style from "./StoryCardsCategory.module.css";
import foodImage from "../../assets/Food (4).png";
import { useNavigate } from "react-router-dom";
import StoryModal from "../modals/storyModal/StoryModal";
import UpdateStoryModal from "../modals/EditStoryModal/UpdateStoryModal";
const StoryCardsCategory = ({ stories: posts, Categorie }) => {
  const { isAuthenticated, user } = useUserContext();
  const {
    fetchPosts,
    fetchNextPosts,
    currentStory,
    setcurrentStory,
    userCreatedposts,
    fetchNextUserCreatedPosts,
    fetchNextbookmarkedPosts,
    userBookmarkedPosts,
    categoriesPosts,
  } = usePostsContext();

  const [displayedPosts, setDisplayedPosts] = useState(4); // Number of stories to display initially
  const [displayedStory, setDisplayedStory] = useState(""); // Number of stories to display initially
  console.log(posts);
  console.log(displayedPosts);
  console.log(displayedPosts < posts.length);
  useEffect(() => {
    setDisplayedPosts(4);
  }, [categoriesPosts]);
  const handleSeeMore = async () => {
    setDisplayedPosts((prev) => prev + 4);

    const category = Categorie.name;

    if (Categorie == "userCreatedPosts") {
      const userCreatedPostIndex = posts.length;
      const UserCreatedPostIndexLimit = userCreatedPostIndex + 4;
      await fetchNextUserCreatedPosts(
        userCreatedPostIndex,
        UserCreatedPostIndexLimit
      );
    } else if (Categorie == "bookmarkedPosts") {
      const postIndex = posts.length;
      const postIndexLimit = posts.length + 4;
      await fetchNextbookmarkedPosts(postIndex, postIndexLimit);
    } else {
      const postIndex = posts.length;
      const postIndexLimit = posts.length + 4;
      console.log(displayedPosts);
      console.log(displayedPosts < posts.length);
      // console.log(posts);
      await fetchNextPosts(user.id, postIndex, postIndexLimit, category); // Increase the number of stories to display by 4
    }
  };
  const isAuthor = (postId) => {
    return isAuthenticated && user.id === postId;
  };
  const navigate = useNavigate();
  const handleCardClick = (post) => {
    setDisplayedStory(post);
    setcurrentStory(post);
    openModal();
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {posts && posts?.length ? (
        <div className={style.StoriesCardContainer}>
          <div
            className={`${style.StoryCardsContainer} ${style.StoryCardContainer}`}
          >
            {posts.slice(0, displayedPosts).map((post, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={style.storyCard}
                    onClick={() => {
                      handleCardClick(post);
                    }}
                  >
                    {/* <img
                      src={post?.stories?.[0]?.image}
                      // onError={(e) => {
                      //   e.target.src = foodImage;
                      // }}
                      // alt={post?.stories[0].heading}
                      className="story-image"
                    /> */}
                   <div className={style.imageContainer}> <img
                      src={post?.stories?.[0]?.image}
                      // onError={(e) => {
                      //   e.target.src = foodImage;
                      // }}
                      // alt={post?.stories[0].heading}
                      className="story-image"
                    /></div>
                    <div className={style.storyContent}>
                      <h3>{post?.stories?.[0].heading}</h3> 
                      <p>{post?.stories?.[0].description}</p>
                    </div>
                    {isAuthor(post.owner) && (
                      <div
                        className={style.buttonContainer}
                        onClick={(e) => {
                          e.stopPropagation();
                          setcurrentStory(post);
                        }}
                      >
                        <UpdateStoryModal></UpdateStoryModal>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
            <StoryModal
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
              displayedStory={displayedStory}
              setDisplayedStory={setDisplayedStory}
              Categorie={Categorie}
            ></StoryModal>
          </div>

          <div>
            {displayedPosts < posts.length && (
              <>
                <button className={style.loadStories} onClick={handleSeeMore}>
                  See More
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={style.containers}>No stories Available</div>
      )}
    </>
  );
};

export default StoryCardsCategory;

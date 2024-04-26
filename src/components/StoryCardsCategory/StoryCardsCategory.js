import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { usePostsContext } from "../../context/PostContext";
import style from "./StoryCardsCategory.module.css";
import foodImage from "../../assets/Food (4).png";
import editIcon from "../../assets/Group (2).png";
import { useNavigate } from 'react-router-dom';

import StoryModal from "../modals/storyModal/StoryModal";

const StoryCardsCategory = ({ stories: posts,Categorie }) => {
  const { isAuthenticated, user } = useUserContext();
  const { fetchPosts, fetchNextPosts } = usePostsContext();
  

  const [displayedPosts, setDisplayedPosts] = useState(4); // Number of stories to display initially
  const [displayedStory, setDisplayedStory] = useState(''); // Number of stories to display initially
  const handleSeeMore = () => {
    setDisplayedPosts((prev) => prev + 4);
    const postIndex = posts.length;
    const postIndexLimit = postIndex + 4;
    const category = Categorie.name;
    console.log(postIndex, postIndexLimit, category);
    fetchNextPosts(user.id, postIndex, postIndexLimit, category); // Increase the number of stories to display by 4
  };
  const isAuthor = (postId) => {
    return true 
    return isAuthenticated && user.id === postId;
  };
  console.log(posts);
  const navigate = useNavigate();

  const handleCardClick = (post) => {
    openModal();
    setDisplayedStory(post)
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
      {posts && posts.length ? (
        <div className={style.StoriesCardContainer}>   
          <div className={style.StoryCardsContainer}>
            {posts.slice(0, displayedPosts).map((post) => (
              <div className={style.storyCard} onClick={() => handleCardClick(post)}>
                <img
                  src={post?.stories?.[0].image}
                  onError={(e) => {
                    e.target.src = foodImage;
                  }}
                  alt={post?.stories[0].heading}
                  className="story-image"
                />
                <div className={style.storyContent}>
                  <h3>{post?.stories?.[0].heading}</h3>
                  <p>{post?.stories?.[0].description}</p>
                </div>  
                {isAuthor(post.authorId) && (
                  <div className={style.buttonContainer}>
                      <img src={editIcon}></img>
                      <div>Edit</div>
                  </div>
                )}    
              </div>
              
            ))}
            <StoryModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} displayedStory={displayedStory} setDisplayedStory={setDisplayedStory}></StoryModal>
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

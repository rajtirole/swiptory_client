import React, { useEffect, useState } from "react";
import { getBookmarkedPosts } from "../../api/api"; // Your API function to fetch bookmarked posts

import Navbar from "../../components/Navbar/Navbar";
import style from "../../components/bookmarks/Bookmarks.module.css";
import StoryCategory from "../../components/StoryCategory/StoryCategory";
import { usePostsContext } from "../../context/PostContext";
import BookmarIcon from "../../assets/boomarks.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
const Bookmarks = () => {
  const navigate = useNavigate();
  const homeNavigationHandler = () => {
    navigate("/");
  };
  const {
    userBookmarkedPosts,
    fetchUserBookmarkedPosts,
    posts,
    isPageReloadRequired,
  } = usePostsContext();
  const { isAuthenticated } = useUserContext();
  useEffect(() => {
    (async () => {
      await fetchUserBookmarkedPosts();
    })();
  }, [isPageReloadRequired]);
  console.log(userBookmarkedPosts);
  return (
    <>
      <Navbar></Navbar>
      {userBookmarkedPosts.length ? (
        isAuthenticated && (
          <div className={style.bookmarkPageContainer}>
            <div className={style.bookmark}>Your Bookmarks</div>
            {isPageReloadRequired ? (
              <StoryCategory
                Categorie={"bookmarkedPosts"}
                stories={userBookmarkedPosts}
              ></StoryCategory>
            ) : (
              <StoryCategory
                Categorie={"bookmarkedPosts"}
                stories={userBookmarkedPosts}
              ></StoryCategory>
            )}
          </div>
        )
      ) : (
        <div className={style.BookmarkContainer}>
          <div>You have no bookmarks!</div>
          <div>
            <img src={BookmarIcon}></img>
          </div>
          <div>
            <button onClick={homeNavigationHandler}>Back to Home</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;

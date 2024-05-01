import React, { useEffect, useState } from "react";
import { getBookmarkedPosts } from "../api/api"; // Your API function to fetch bookmarked posts
import Navbar from "../components/Navbar/Navbar";
import style from "../components/bookmarks/Bookmarks.module.css";
import StoryCategory from "../components/StoryCategory/StoryCategory";
import { usePostsContext } from "../context/PostContext";
import BookmarIcon from "../assets/boomarks.png";
import Bookmarks from "../components/bookmarks/Bookmarks";
const BookmarkPage = () => {
  return (
    <>
      <Bookmarks></Bookmarks>
    </>
  );
};

export default BookmarkPage;

import React, { useEffect, useState } from 'react'
import { getBookmarkedPosts } from '../../api/api'; // Your API function to fetch bookmarked posts

import Navbar from '../../components/Navbar/Navbar';
import style from '../../components/bookmarks/Bookmarks.module.css'
import StoryCategory from '../../components/StoryCategory/StoryCategory';
import { usePostsContext } from '../../context/PostContext';
import BookmarIcon from '../../assets/boomarks.png'
import { useNavigate } from 'react-router-dom';
const Bookmarks = () => {
    const navigate=useNavigate()
    const homeNavigationHandler=()=>{
        navigate('/')
    }
    const {userBookmarkedPosts,fetchUserBookmarkedPosts,posts}=usePostsContext();
    useEffect(()=>{
        (async()=>{
await fetchUserBookmarkedPosts()
        })()
    },[])
    console.log(userBookmarkedPosts);
  return (
    <>
    <Navbar></Navbar>
   {userBookmarkedPosts.length? <div className={style.bookmarkPageContainer}>
    <div className={style.bookmark}>
        Your Bookmarks
        
    </div>
        {/* <Bookmarks posts={displayedPosts} setPosts={setDisplayedPosts} redirect={'/bookmarks'}></Bookmarks> */}
        <StoryCategory
                Categorie={'bookmarkedPosts'}
                stories={userBookmarkedPosts}
              ></StoryCategory>
    </div>:
    <div  className={style.BookmarkContainer}>
    <div>You have no bookmarks!</div>
    <div>
      <img src={BookmarIcon}></img>
    </div>
    <div>
      <button onClick={homeNavigationHandler}>Back to Home</button>
    </div>


      </div>}
    </>
  )
}

export default Bookmarks
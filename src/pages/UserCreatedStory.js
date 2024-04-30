

import React, { useEffect, useState } from 'react'
import { getBookmarkedPosts } from '../api/api'; // Your API function to fetch bookmarked posts
import Bookmarks from '../components/bookmarks/Bookmarks';
import Navbar from '../components/Navbar/Navbar';
import style from '../components/bookmarks/Bookmarks.module.css'
import StoryCategory from '../components/StoryCategory/StoryCategory';
import { usePostsContext } from '../context/PostContext';
const UserCreatedStory = () => {
    const {userCreatedposts,fetchNextUserCreatedPosts}=usePostsContext();
    useEffect(()=>{
        (async()=>{
await fetchNextUserCreatedPosts()
        })()
    },[])
  return (
    <>
    <Navbar></Navbar>
    <div className={style.bookmarkPageContainer}>
    {/* <div className={style.bookmark}>
        Your Bookmarks
        
    </div> */}
        {/* <Bookmarks posts={displayedPosts} setPosts={setDisplayedPosts} redirect={'/bookmarks'}></Bookmarks> */}
        <StoryCategory
                Categorie={'userCreatedPosts'}
                stories={userCreatedposts}
              ></StoryCategory>
    </div>
    </>
  )
}

export default UserCreatedStory
import React, { useEffect, useState } from 'react'
import { getBookmarkedPosts } from '../api/api'; // Your API function to fetch bookmarked posts
import Bookmarks from '../components/bookmarks/Bookmarks';
import Navbar from '../components/Navbar/Navbar';
import style from '../components/bookmarks/Bookmarks.module.css'
const BookmarkPage = () => {
const [displayedPosts,setDisplayedPosts]=useState('')
const fetchBookmarkedPosts = async () => {
    try {
        const response = await getBookmarkedPosts();
        console.log(response);
        if(response?.success){
            setDisplayedPosts(response?.data)
        }
        // Handle the response and set the bookmarked posts state
    } catch (error) {
        console.log(error);
        // Handle errors
    }
};
useEffect(() => {
    fetchBookmarkedPosts();
}, []);
  return (
    <div className={style.bookmarkPageContainer}>
    <Navbar></Navbar>
    <div>
        Your Bookmarks
        
    </div>
        <Bookmarks posts={displayedPosts} setPosts={setDisplayedPosts} redirect={'/bookmarks'}></Bookmarks>
    </div>
  )
}

export default BookmarkPage
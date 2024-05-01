


import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import style from './UserCreatedPosts.module.css'
import StoryCategory from '../../components/StoryCategory/StoryCategory';
import { usePostsContext } from '../../context/PostContext';
import storyIcon from '../../assets/boomarks.png'
import { useNavigate } from 'react-router-dom';
const UserCreatedPosts = () => {
    const {userCreatedposts,fetchNextUserCreatedPosts}=usePostsContext();
    useEffect(()=>{
        (async()=>{
await fetchNextUserCreatedPosts()
        })()
    },[])
    const navigate=useNavigate()
    const homeNavigationHandler=()=>{
        navigate('/')
    }
  return (
    <>
    <Navbar></Navbar>
    {userCreatedposts.length?<div className={style.userCreatedStoryPageContainer}>
        <StoryCategory
                Categorie={'userCreatedPosts'}
                stories={userCreatedposts}
              ></StoryCategory>
    </div>:
     <div  className={style.userCreatedStoryContainer}>
     <div>You have no Stories!</div>
     <div>
       <img src={storyIcon}></img>
     </div>
     <div>
       <button onClick={homeNavigationHandler}>Back to Home</button>
     </div>
 
 
       </div>}
    </>
  )
}

export default UserCreatedPosts
import React ,{useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import StorySection from '../components/StorySection/StorySection'
import {usePostsContext} from '../context/PostContext'

const HomePage = () => {
  console.log('fetch homepage');
  const { fetchPosts,posts } = usePostsContext(); // Using the fetchPosts function from PostsContext
  useEffect(() => {
    // Fetch posts when the component mounts
      fetchPosts();
  }, []); // Dependency array to prevent unnecessary fetches

 
  return (
   <>
    <Navbar></Navbar>
    <StorySection></StorySection>
    </>
  )
}

export default HomePage
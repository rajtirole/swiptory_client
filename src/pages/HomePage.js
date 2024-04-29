import React ,{useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import StorySection from '../components/StorySection/StorySection'
import {usePostsContext} from '../context/PostContext'
const HomePage = () => {
  const { fetchPosts,categoriesPosts } = usePostsContext(); // Using the fetchPosts function from PostsContext
  useEffect(() => {
    // Fetch posts when the component mounts
      (async()=>{
        await fetchPosts();
      })()
  }, [categoriesPosts]); // Dependency array to prevent unnecessary fetches
  return (
   <>
    <Navbar></Navbar>
    <StorySection></StorySection>
    </>
  )
}
export default HomePage
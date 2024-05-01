import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import StorySection from "../components/StorySection/StorySection";
import { usePostsContext } from "../context/PostContext";
import { useUserContext } from "../context/AuthContext";
const HomePage = () => {
  const { user, isAuthenticated } = useUserContext();
  const { fetchPosts } = usePostsContext();
  useEffect(() => {
    // Fetch posts when the component mounts
    (async () => {
      await fetchPosts();
    })();
  }, [user, isAuthenticated, user]); // Dependency array to prevent unnecessary fetches
  return (
    <>
      <Navbar></Navbar>
      <StorySection></StorySection>
    </>
  );
};
export default HomePage;

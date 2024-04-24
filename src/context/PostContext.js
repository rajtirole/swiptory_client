import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getStories,getNextStories} from '../api/api'

export const INITIAL_POST = {
  category: "",
  stories: [],
  likedBy: [],
  savedBy: [],
  _id: "",
  createdAt: "",
  updatedAt: "",
};

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  setPosts: () => {},
  fetchPosts: async (userId = null) => [],
  fetchNextPosts: async (userId = null) => [],
};
const PostsContext = createContext(INITIAL_STATE);

export function PostsProvider({ children }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (userId = null) => {
    console.log();
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getStories();
      if (response?.data) {
        setPosts(response.data);
        return true;
    }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchNextPosts = async (userId = null,postIndex,postIndexLimit,category) => {
    console.log('jfkjaslkjf');
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getNextStories( userId = null,postIndex,postIndexLimit,category);
      if (response?.data) {
        setPosts(response.data);
        return true;
    }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const value = {
    posts,
    setPosts,
    isLoading,
    fetchPosts,
    fetchNextPosts
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export const usePostsContext = () => useContext(PostsContext);

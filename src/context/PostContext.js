import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getStories,getNextStories,getUserCreatedStory,getNextUserCreatedStory} from '../api/api'

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
  currentStory:[],
  isLoading: false,
  setPosts: () => {},
  fetchPosts: async (userId = null) => [],
  userCreatedStory: async (userId = null) => [],
  fetchNextPosts: async (userId = null) => [],
  fetchNextUserCreatedPosts: async (userId = null) => [],
};
const PostsContext = createContext(INITIAL_STATE);

export function PostsProvider({ children }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userCreatedposts, setuserCreatedposts] = useState([]);
  const [currentStory, setcurrentStory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async (userId = null) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getStories();
      
      if (response?.data) {
        setPosts(response.data);
        console.log(posts);
        return true;
    }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

   
  };
  const userCreatedStory = async () => {
    setIsLoading(true);
    
    try {
      const response = await getUserCreatedStory();
      console.log('fas');
      if (response?.success) {
        setuserCreatedposts(response.data)
        console.log(response);
        return true;
    }
    console.log(userCreatedStory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

   
  };
  const fetchNextPosts = async (userId = null,postIndex,postIndexLimit,category) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getNextStories( userId = null,postIndex,postIndexLimit,category);
        if (response?.data) {
        setPosts({...posts,[category]:[...posts[category],...response.data.posts]}  );
        return true;
    }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchNextUserCreatedPosts = async (userCreatedPostIndex,UserCreatedPostIndexLimit) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getNextUserCreatedStory({userCreatedPostIndex, });
        if (response?.data) {
          console.log(response.data);
          setuserCreatedposts([...userCreatedposts,...response.data]);
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
    currentStory,
    setcurrentStory,
    setPosts,
    isLoading,
    fetchPosts,
    fetchNextPosts,
    userCreatedposts,
    setuserCreatedposts,
    userCreatedStory,
    fetchNextUserCreatedPosts
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export const usePostsContext = () => useContext(PostsContext);

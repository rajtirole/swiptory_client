import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStories,
  getNextStories,
  getUserCreatedStory,
  getNextUserCreatedStory,
  getNextBookmarkedStory,
  getUserBookmarkedStory,
} from "../api/api";
import { useUserContext } from "./AuthContext";

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
  isPageReloadRequired: false,
  posts: [],
  currentStory: [],
  userCreatedposts: [],
  userBookmarkedPosts: [],
  isLoading: false,
  setIsLoading: () => {},
  categoriesPosts: "",
  setPosts: () => {},
  setCategoriesPosts: () => {},
  setisPageReloadRequired: () => {},
  fetchPosts: async (userId = null) => [],
  fetchUserCreatedPosts: async (userId = null) => [],
  fetchUserBookmarkedPosts: async (userId = null) => [],
  fetchNextPosts: async (userId = null) => [],
  fetchNextUserCreatedPosts: async (userId = null) => [],
  fetchNextbookmarkedPosts: async (userId = null) => [],
};
const PostsContext = createContext(INITIAL_STATE);

export function PostsProvider({ children }) {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userCreatedposts, setuserCreatedposts] = useState([]);
  const [userBookmarkedPosts, setUserBookmarkedPosts] = useState([]);
  const [currentStory, setcurrentStory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageReloadRequired, setisPageReloadRequired] = useState(false);
  const [categoriesPosts, setCategoriesPosts] = useState(null);

  const fetchPosts = async (userId = null) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getStories();
      await fetchUserCreatedPosts();
      if (response?.data) {
        setPosts({ ...response?.data });
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserCreatedPosts = async () => {
    setIsLoading(true);
    try {
      const response = await getUserCreatedStory();

      if (response?.success) {
        setuserCreatedposts(response.data);
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserBookmarkedPosts = async () => {
    setIsLoading(true);
    try {
      const response = await getUserBookmarkedStory();

      if (response?.success) {
        setUserBookmarkedPosts(response.data);
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchNextPosts = async (
    userId = null,
    postIndex,
    postIndexLimit,
    category
  ) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getNextStories(
        (userId = null),
        postIndex,
        postIndexLimit,
        category
      );
      if (response?.data) {
        setPosts({
          ...posts,
          [category]: [...posts[category], ...response.data.posts],
        });
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchNextUserCreatedPosts = async (
    userCreatedPostIndex,
    UserCreatedPostIndexLimit
  ) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getNextUserCreatedStory(
        userCreatedPostIndex,
        UserCreatedPostIndexLimit
      );
      if (response?.data) {
        setuserCreatedposts([...userCreatedposts, ...response.data]);
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchNextbookmarkedPosts = async (postIndex, postIndexLimit) => {
    setIsLoading(true);
    try {
      // Fetch posts from your backend or database
      const response = await getNextBookmarkedStory(postIndex, postIndexLimit);
      if (response?.data) {
        setUserBookmarkedPosts([...userBookmarkedPosts, ...response.data]);
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPosts();
    })();
  }, []);

  const value = {
    posts,
    currentStory,
    setcurrentStory,
    setPosts,
    isLoading,
    setIsLoading,
    fetchPosts,
    fetchNextPosts,
    userCreatedposts,
    setuserCreatedposts,
    fetchUserCreatedPosts,
    fetchNextUserCreatedPosts,
    userBookmarkedPosts,
    fetchNextbookmarkedPosts,
    fetchUserBookmarkedPosts,
    categoriesPosts,
    setCategoriesPosts,
    setisPageReloadRequired,
    isPageReloadRequired,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export const usePostsContext = () => useContext(PostsContext);

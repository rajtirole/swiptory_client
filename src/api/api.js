import { BACKEND_URL } from "../constants/apiConstant";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

export const getCurrentUser = async () => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/user/getUser`,
      withCookies: true,
      withCredentials: true,
    };
    const res = await axios(options);

    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};
export const registerUser = async (formValue) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/user/register`,
      withCookies: true,
      withCredentials: true,
      data: {
        userName: formValue.username,
        password: formValue.password,
      },
    };
    const res = await axios(options);
    return res?.data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "User Registration Failed", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("User Registration Failed", {
        position: "top-center",
      });
    }

    console.log(error);
  }
};
export const signInUser = async (formValue) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/user/login`,
      withCookies: true,
      withCredentials: true,
      data: {
        userName: formValue.username,
        password: formValue.password,
      },
    };
    const res = await axios(options);
    return res?.data?.success;
  } catch (error) {
    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "User login Failed", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("User login Failed", {
        position: "top-center",
      });
    }

    console.log(error);
  }
};
export const logoutUser = async () => {
  try {
    let options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/user/logout`,
      withCookies: true,
      withCredentials: true,
    };
    const res = await axios(options);
    console.log(res.cookies);
    return res ? res?.data : null;
  } catch (error) {
    console.log(error);
    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "Logout Failed", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }
};
export const postStories = async (validPosts) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/postStories`,
      withCookies: true,
      withCredentials: true,
      data: validPosts,
    };
    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;

    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "Unable to create post", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }
};
export const updateStories = async ({ validPosts, id }) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/updateStories/${id}`,
      withCookies: true,
      withCredentials: true,
      data: validPosts,
    };
    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;

    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "Unable to update post", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }
};
export const getStories = async () => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getStories`,
      withCookies: true,
      withCredentials: true,
    };
    const res = await axios(options);
    console.log(res);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
};
export const getUserCreatedStory = async () => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getuserCreatedposts`,
      withCookies: true,
      withCredentials: true,
    };
    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
};

export const getNextStories = async (
  userId = null,
  postIndex,
  postIndexLimit,
  category
) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getNextStories`,
      withCookies: true,
      withCredentials: true,
      params: {
        postIndex,
        postIndexLimit,
        category,
      },
    };

    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
};
export const getNextBookmarkedStory = async (postIndex, postIndexLimit) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getNextBookmarked`,
      withCookies: true,
      withCredentials: true,
      params: {
        postIndex,
        postIndexLimit,
      },
    };

    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
};
export const getNextUserCreatedStory = async (
  userCreatedPostIndex,
  UserCreatedPostIndexLimit
) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getNextUserCreatedStory`,
      withCookies: true,
      withCredentials: true,
      params: {
        userCreatedPostIndex: userCreatedPostIndex,
        UserCreatedPostIndexLimit: UserCreatedPostIndexLimit,
      },
    };

    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
};

export const getStory = async ({ id }) => {
  try {
    let options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getStory/${id}`,
      withCookies:true,
      withCredentials:true,
    };

    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
  console.log(`backend url ${BACKEND_URL}/stories/getStory/${id}`);
  // console.log(`frontend url ${FRONTEND_URL}/stories/${postId}`);
};
export const getUserBookmarkedStory = async () => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/getBookmarkedPosts`,
      withCookies: true,
      withCredentials: true,
    };

    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    // throw error.response;
  }
};
export const likeStory = async ({ id }) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/likeStory/${id}`,
      withCookies: true,
      withCredentials: true,
    };

    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);

    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "Unable to Like", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
    // throw error.response;
  }
};
export const saveStory = async ({ id }) => {
  try {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      url: `${BACKEND_URL}/stories/bookmarkStory/${id}`,
      withCookies: true,
      withCredentials: true,
    };

    const res = await axios(options);
    console.log(res);
    return res?.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      // The server responded with a status other than 2xx
      console.log("Response data:", error.response.data);
      toast.error(error.response.data.message || "Bookmarks adding Failed", {
        position: "top-center",
      });
      console.log("Status code:", error.response.status);
      console.log("Status text:", error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
    // throw error.response;
  }
};

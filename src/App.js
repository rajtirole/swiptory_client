import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import StoryPage from "./pages/StoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostsContext } from "./context/PostContext";
import UserCreatedPostsPage from "./pages/UserCreatedPostsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { FRONTEND_URL } from "./constants/apiConstant";
console.log(FRONTEND_URL,'/userCreatedStory');
const App = () => {
  const {isLoading}=usePostsContext()
  return (
    <main>
      {isLoading&&<div class="loadingOverlay">
  <div class="loader"></div>
</div>
}
        <Routes >
          {/* Route to the specific story page */}
          <Route path="/" element={<HomePage />} />
           {/* Route for 404 page */}
        <Route path="*" element={<NotFoundPage />} />
          <Route path="/stories/:id" element={<StoryPage />} />
          {/* <Route path={`${FRONTEND_URL}/userCreatedStory`} element={<UserCreatedPostsPage />} /> */}
          <Route path="/userCreatedStory" element={<UserCreatedPostsPage />} />

          {/* Route to bookmark page */}

          <Route path="/bookmarks" element={<BookmarkPage />} />

          {/* Route to home page */}
          
         
        </Routes>

      <ToastContainer />
    </main>
  );
};

export default App;

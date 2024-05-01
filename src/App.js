import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import StoryPage from "./pages/StoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostsContext } from "./context/PostContext";
import UserCreatedPostsPage from "./pages/UserCreatedPostsPage";
const App = () => {
  const {isLoading}=usePostsContext()
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  return (
    <main>
      {isLoading&&<div class="loadingOverlay">
  <div class="loader"></div>
</div>
}
        <Routes>
          {/* Route to the specific story page */}

          <Route path="/stories/:id" element={<StoryPage />} />
          <Route path="/userCreatedStory" element={<UserCreatedPostsPage />} />

          {/* Route to bookmark page */}

          <Route path="/bookmarks" element={<BookmarkPage />} />

          {/* Route to home page */}
          
          <Route path="/" element={<HomePage />} />
        </Routes>

      <ToastContainer />
    </main>
  );
};

export default App;

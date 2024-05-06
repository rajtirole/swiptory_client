import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import StoryPage from "./pages/StoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostsContext } from "./context/PostContext";
import UserCreatedPostsPage from "./pages/UserCreatedPostsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { FRONTEND_URL } from "./constants/apiConstant";
import ProtectedRoutes from "./lib/ProtectedRoutes/ProtectedRoutes";
import { Sign_in_modal } from "./components/modals/sign_in_modal/Sign_in_modal";
import { useUserContext } from "./context/AuthContext";
console.log(FRONTEND_URL, "/userCreatedStory");
const App = () => {
  const { isLoading } = usePostsContext();
  const {loginUserModal}=useUserContext()
 
  return (
    <>
    
    {
      loginUserModal&& <Sign_in_modal loginUserModal={loginUserModal}></Sign_in_modal>
      }
    
    {isLoading && (
        <div class="loadingOverlay">
          <div class="loader"></div>
        </div>
      )}
    
      <Routes>
        {/* Route to the specific story page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<div>test</div>} />
        <Route path="/stories/:id" element={<StoryPage />} />
        {/* <Route path={`${FRONTEND_URL}/userCreatedStory`} element={<UserCreatedPostsPage />} /> */}
        <Route path="/userCreatedStory" element={<ProtectedRoutes><UserCreatedPostsPage /></ProtectedRoutes>} />

        {/* Route to bookmark page */}

        <Route path="/bookmarks" element={<ProtectedRoutes><BookmarkPage /></ProtectedRoutes>} />
        {/* <Route path="/protected" element={<ProtectedRoutes><div>protected rutes</div></ProtectedRoutes>} /> */}
        {/* Route for 404 page */}

        <Route path="*" element={<NotFoundPage />} />


        {/* Route to home page */}
      </Routes>
      <ToastContainer />
      </>

  );
};

export default App;

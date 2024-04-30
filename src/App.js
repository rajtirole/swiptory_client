// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import BookmarkPage from "./pages/BookmarkPage";
// import StoryPage from "./pages/StoryPage";
// // import AuthLayout from "./_auth/AuthLayout";
// // import RootLayout from "./_root/RootLayout";
// // import SignupForm from "@/_auth/forms/SignupForm";
// // import SigninForm from "@/_auth/forms/SigninForm";
// // import { Toaster } from "@/components/ui/toaster";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   return (
//     <main>
//       <Routes>
//         {/* Route to the specific story page */}
//         <Route path="/story" component={StoryPage} />

//         {/* Redirect to home page or any other page if route not found */}
//         <Route path="/" element={<HomePage />} />
//       </Routes>

//       <ToastContainer />
//     </main>
//   );
// };

// export default App;






import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import StoryPage from "./pages/StoryPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "./context/AuthContext";
import { usePostsContext } from "./context/PostContext";
import UserCreatedStory from "./pages/UserCreatedStory";

const App = () => {
  // const {isLoading}=useUserContext()
  const {isLoading}=usePostsContext()
  return (
    <main>
      {isLoading&&<div class="loadingOverlay">
  <div class="loader"></div>
</div>
}
        <Routes>
          {/* Route to the specific story page */}
          <Route path="/stories/:id" element={<StoryPage />} />
          <Route path="/userCreatedStory" element={<UserCreatedStory />} />

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

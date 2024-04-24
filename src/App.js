import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
// import AuthLayout from "./_auth/AuthLayout";
// import RootLayout from "./_root/RootLayout";
// import SignupForm from "@/_auth/forms/SignupForm";
// import SigninForm from "@/_auth/forms/SigninForm";
// import { Toaster } from "@/components/ui/toaster";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <ToastContainer />
    </main>
  );
};

export default App;

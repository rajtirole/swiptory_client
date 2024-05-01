import React, { useState } from "react";
import profileImage from "../../assets/Mask groupprofile.png";
import menuIcon from "../../assets/Vectorhamburger.png";
import bookmarkIcon from "../../assets/Vectorbookmark.png";
import style from "./AuthenticatedUserNav.module.css";
import ProfileModal from "../modals/profile_modal/Profile_modal";
import AddStoryModal from "../modals/AddStoryModal/AddStoryModal";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext, INITIAL_USER } from "../../context/AuthContext";
import { usePostsContext } from "../../context/PostContext";

const AuthenticatedUserNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useUserContext();
  const { isPageReloadRequired, setisPageReloadRequired } = usePostsContext();
  const handleBookmarkClick = () => {
    navigate("/bookmarks");
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logoutHandler = async () => {
    try {
      let logoutUservalue = await logoutUser();
      if (logoutUservalue?.success) {
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
        logoutUservalue?.success &&
          toast.success(logoutUservalue?.message || "Logout Success!", {
            position: "top-center",
          });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    if (!isPageReloadRequired) {
      setisPageReloadRequired(true);
    } else {
      setisPageReloadRequired(false);
      setisPageReloadRequired(true);
    }
  };
  const yourStoryHandler = () => {
    setisPageReloadRequired(!isPageReloadRequired);
    navigate("/userCreatedStory");
    setisPageReloadRequired(!isPageReloadRequired);
  };
  return (
    <>
      <div className={style.mobileDeviceNavbarContainer}>
        <div className={style.userContainer}>
          <div className={style.ImageContainer}>
            <img src={profileImage}></img>
          </div>
          <div className={style.usernameContainer}>
            <h2>{user.userName}</h2>
          </div>
        </div>

        <div className={style.addStoryContainer}>
          <div onClick={yourStoryHandler}>your story</div>
        </div>
        <div className={style.addStoryContainer}>
          <AddStoryModal></AddStoryModal>
        </div>

        <div className={style.bookmarkContainer}>
          <img src={bookmarkIcon}></img>
          <button onClick={handleBookmarkClick}>Bookmarks</button>
        </div>
        <div className={style.bookmarkContainer}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>

      <div className={style.bookmarkContainer}>
        <img src={bookmarkIcon}></img>
        <button onClick={handleBookmarkClick}>Bookmarks</button>
      </div>
      <div className={style.addStoryContainer}>
        <AddStoryModal></AddStoryModal>
      </div>
      <div className={style.profileImageContainer}>
        <img src={profileImage}></img>
      </div>
      <div className={style.menuContainer}>
        <ProfileModal></ProfileModal>
      </div>
    </>
  );
};

export default AuthenticatedUserNav;


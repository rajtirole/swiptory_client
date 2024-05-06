import React from "react";
import style from "./StoryModal.module.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/AuthContext";
import sendIcon from "../../../assets/Vector (10).png";
import declineIcon from "../../../assets/akar-icons_cross.png";
import storyIcon from "../../../assets/Group 31.png";
import bookmarkIcon from "../../../assets/save-instagram.png";
import bookmarkedIcon from "../../../assets/save-instagram (1).png";
import likeIcon from "../../../assets/heart.png";
import likedIcon from "../../../assets/heart (1).png";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URL } from "../../../constants/apiConstant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { likeStory, saveStory } from "../../../api/api";
import { Sign_in_modal } from "../sign_in_modal/Sign_in_modal";
import { usePostsContext } from "../../../context/PostContext";
import { LikeAndBookmarkLoginModal } from "../likeAndBookmarkModal/LikeAndBookmarkLoginModal";

const StoryModal = ({
  displayedStory,
  modalIsOpen,
  setIsOpen,
  setDisplayedStory,
  redirect,
  Categorie,
}) => {
  const { user, isAuthenticated,setloginUserModal } = useUserContext();
  const { isPageReloadRequired, setisPageReloadRequired } = usePostsContext();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [likeLogin, setLikeLogin] = useState(false);
  let modallogin = false;
  //   const [currentStory, setCurrentStory] = useState(displayedStory?.stories?.[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setisCopied] = useState(false);

  const [progress, setProgress] = useState(false);
  const [nextPost, setNextPost] = useState(false);
  const [previousPost, setPreviousPost] = useState(false);

  const goToNextStory = () => {
    setNextPost(true)
    setPreviousPost(false)
    if (currentStoryIndex < displayedStory.stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      //   setProgress(false);
    }
  };

  const goToPreviousStory = () => {
    // setProgress(true);
    setPreviousPost(true)
    setNextPost(false)
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
      border: "none",
      width: "100%",
      height: "100%",
      background: "none",
      padding: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    backgroundColor: "none",
  };
  Modal.setAppElement("#root");
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();

  const copyLinkToClipboard = () => {
    const postId = displayedStory._id; // Assuming the post ID is stored in displayedStory._id
    const postUrl = `${FRONTEND_URL}/stories/${postId}`;

    // Copy post URL to clipboard
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        toast.success("Link copied to clipboard", {
          position: "top-center",
        });
        // Optionally, show a toast or message indicating successful copying
      })
      .catch((error) => {
        console.error("Failed to copy post URL to clipboard:", error);
        // Optionally, show an error message to the user
      });
  };

  const shareIconClicked = () => {
    copyLinkToClipboard();
    setisCopied(true);
    setTimeout(() => {
      setisCopied(false);
    }, 2000);
    // Optionally, show a loading indicator or message while copying the link
  };
  const declineIconClicked = () => {
    if (Categorie == "bookmarkedPosts") {
      closeModal();
    } else if (Categorie == "userCreatedPosts") {
      closeModal();
    } else {
      navigate("/");
    }
    setIsOpen(false);
    // Optionally, show a loading indicator or message while copying the link
  };
  useEffect(() => {
    // Check if displayedStory is available and if the user has liked the story
    if (displayedStory) {
      setIsLiked(displayedStory?.likedBy?.includes(user.id)); // Set isLiked based on the likedBy array
    } else {
      setIsLiked(false); // If displayedStory is not available, set isLiked to false
    }
  }, [displayedStory, user.id]);
  useEffect(() => {
    // Check if displayedStory is available and if the user has liked the story
    if (displayedStory) {
      setIsBookmarked(displayedStory?.savedBy?.includes(user.id)); // Set isLiked based on the likedBy array
    } else {
      setIsBookmarked(false); // If displayedStory is not available, set isLiked to false
    }
  }, [displayedStory, user.id]);

  const bookmarkHandler = async () => {
    try {
      const response = await saveStory({ id: displayedStory._id });
      if (response?.success) {
        toast.success(response?.message || "success", {
          position: "top-center",
        });
      }
      setDisplayedStory(response.data); // Update the displayed story with the latest data

      // Check if the user ID is in the savedBy array to determine the bookmark state
      const savedByCurrentUser = response.data.savedBy.includes(user.id);
      setIsBookmarked(savedByCurrentUser); // Update the isBookmarked state based on the response
    } catch (error) {
      closeModal();
      navigate("/");
      setloginUserModal(true)
      console.error("Error:", error);

      // Handle errors if necessary
    }
    setisPageReloadRequired(!isPageReloadRequired);
  };

  const likeHandler = async () => {
    if (isAuthenticated) {
      try {
        const response = await likeStory({ id: displayedStory._id });
        setDisplayedStory(response.data); // Update the displayed story with the latest data

        // Check if the user ID is in the likedBy array to determine the like state
        const likedByCurrentUser = response.data.likedBy.includes(user.id);
        setIsLiked(likedByCurrentUser); // Update the isLiked state based on the response
      } catch (error) {
        modallogin = true;
        
        console.error("Error:", error);
        toast.error(error?.message || "Failed", {
          position: "top-center",
        });
        // Handle errors if necessary
      }
    } else {
      setLikeLogin(true);
      console.log(likeLogin);
      closeModal();
        navigate("/");
        setloginUserModal(true)
      toast.error("Please Login", {
        position: "top-center",
      });
      setisPageReloadRequired(!isPageReloadRequired);
    }
  };

  useEffect(() => {
    let timer;

    // Function to handle moving to the next story
    const goToNextStory = () => {
      if (currentStoryIndex < displayedStory?.stories?.length - 1) {
        setCurrentStoryIndex((prevIndex) => prevIndex + 1);
        setProgress(false);
      }
    };

    // Function to start the timer for moving to the next story
    const startTimer = () => {
      timer = setTimeout(goToNextStory, 3000); // Adjust the delay (in milliseconds) as needed
    };

    // Start the timer when the modal is open
    if (modalIsOpen) {
      // setCurrentStoryIndex(0)
      startTimer();
    }

    // Clear the timer when the component unmounts or modalIsOpen changes
    return () => {
      clearTimeout(timer);
    };
  }, [currentStoryIndex, displayedStory?.stories?.length, modalIsOpen]);

  useEffect(() => {
    // Reset the progress bar to 0 when the story changes
    setProgress(false);
  }, [currentStoryIndex]);

  // Start the progress bar animation when modalIsOpen and currentStoryIndex is not 0
  useEffect(() => {
    if (modalIsOpen && currentStoryIndex !== 0) {
      setProgress(true);
    }
  }, [modalIsOpen, currentStoryIndex]);
  useEffect(() => {
    // Reset currentStoryIndex to 0 when a new post is displayed
    setCurrentStoryIndex(0);
  }, [displayedStory]);
  const [previousDisplayedStory, setPreviousDisplayedStory] = useState(null);

  useEffect(() => {
    if (displayedStory !== previousDisplayedStory) {
      // Reset currentStoryIndex to 0 when a new story is displayed
      setCurrentStoryIndex(0);
      // Update the previousDisplayedStory to the current displayedStory
      setPreviousDisplayedStory(displayedStory);
    }
  }, [displayedStory, previousDisplayedStory]);


  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={style.Overlay}
        shouldCloseOnOverlayClick={false}
      >
        <div className={style.modalContainer}>
          <div
            className={style.previousStoryContainerButton}
            onClick={goToPreviousStory}
          ></div>
          <div
            className={style.nextStoryContainerButton}
            onClick={goToNextStory}
          ></div>
          <div className={style.previousStoryContainer}>
            <button onClick={goToPreviousStory}>{"<"}</button>
          </div>
          <div className={style.storyContainer}>
            <div className={style.postContainer}>
              {displayedStory?.stories?.[currentStoryIndex].image && (
                <img
                  className={style.imageContainer}
                  src={displayedStory?.stories?.[currentStoryIndex]?.image}
                ></img>
              )}
              <div className={style.storyNavigationContainer}>
                <div className={style.statusContainer}>
                  {displayedStory?.stories &&
                    displayedStory?.stories.map((story, index) => {
                      return (
                        <div className={style.statusBar} key={index}>
                          <div
                            className={style.timer}
                            style={{
                              width: `${
                                currentStoryIndex === index ? "100%" :"0%"
                              }`,
                              transition: `${
                                currentStoryIndex === index
                                  ? "width 3s linear"
                                  : ""
                              }`,
                            }}
                          ></div>
                        </div>
                      );
                    })}
                </div>

                <div className={style.shareContainer}>
                  <img src={declineIcon} onClick={declineIconClicked}></img>
                  <img src={sendIcon} onClick={shareIconClicked}></img>
                </div>
              </div>
              <div className={style.storyContentContainer}>
                {isCopied && (
                  <button
                    className={style.copyLinkToClipboardContainer}
                    onClick={() => {
                      setisCopied(false);
                    }}
                  >
                    Link copied to clipboard
                  </button>
                )}
                <div className={style.storyContent}>
                  {displayedStory?.stories?.[currentStoryIndex].heading && (
                    <p className={style.storyHeading}>
                      {displayedStory.stories[currentStoryIndex].heading}
                    </p>
                  )}
                  {displayedStory?.stories?.[currentStoryIndex].description && (
                    <p className={style.storyDescription}>
                      {displayedStory.stories[currentStoryIndex].description}
                    </p>
                  )}
                </div>

                <div className={style.bookmarkContainer}>
                  <img
                    src={isBookmarked ? bookmarkIcon : bookmarkedIcon}
                    onClick={bookmarkHandler}
                  ></img>

                  <div className={style.likeContainer}>
                    <img
                      src={isLiked ? likedIcon : likeIcon}
                      onClick={likeHandler}
                    ></img>
                    <div>
                      {displayedStory ? displayedStory?.likedBy?.length : 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.nextStoryContainer}>
            <button onClick={goToNextStory}>{">"}</button>
          </div>
        </div>
      </Modal>
      
    </>
  );
};

export default StoryModal;

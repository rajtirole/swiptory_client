import React from 'react'
import style from './StoryModal.module.css'
import Modal from "react-modal";
import { useState,useEffect } from 'react';
import { useUserContext } from '../../../context/AuthContext';
import sendIcon from '../../../assets/Vector (10).png'
import declineIcon from '../../../assets/akar-icons_cross.png'
import storyIcon from '../../../assets/Group 31.png'
import bookmarkIcon from '../../../assets/save-instagram.png'
import bookmarkedIcon from '../../../assets/save-instagram (1).png'
import likeIcon from '../../../assets/heart.png'
import likedIcon from '../../../assets/heart (1).png'
import { useNavigate } from 'react-router-dom';
import { FRONTEND_URL } from "../../../constants/apiConstant"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {likeStory,saveStory} from '../../../api/api'


const StoryModal = ({displayedStory,modalIsOpen,setIsOpen,setDisplayedStory}) => {
    const {user} =useUserContext()
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isCopied, setisCopied] = useState(false);
    // setIsLiked(()=>{
    //     const like=displayedStory?.likedBy?.includes(user.id)
    //     console.log(like);
    //     return like
    // })
    console.log(displayedStory);
 
    const goToNextStory = () => {
        if (currentStoryIndex < displayedStory.stories.length - 1) {
            setCurrentStoryIndex(prevIndex => prevIndex + 1);
          }
      };
      
      const goToPreviousStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prevIndex => prevIndex - 1);
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
          border:'none',
          width:'70vw',
          height:'80vh',
          background:'none'
      
        },
        backgroundColor:'none',
       
      };
      Modal.setAppElement("#root");
      function openModal() {
        setIsOpen(true);
      }
    
    
      function closeModal() {
        setIsOpen(false);
      }



      const navigate= useNavigate();

      const copyLinkToClipboard = () => {   
          const postId = displayedStory._id; // Assuming the post ID is stored in displayedStory._id
          console.log(displayedStory._id); 
          const postUrl = `${FRONTEND_URL}/stories/${postId}`;
          
          
          // Copy post URL to clipboard
          navigator.clipboard.writeText(postUrl)
              .then(() => {
                  console.log('Post URL copied to clipboard:', postUrl);
                  toast.success("Link copied to clipboard", {
                    position: "top-center",
                  });
                  // Optionally, show a toast or message indicating successful copying
              })
              .catch((error) => {
                  console.error('Failed to copy post URL to clipboard:', error);
                  // Optionally, show an error message to the user
              });
      };
  
      const shareIconClicked = () => {
          copyLinkToClipboard();
          setisCopied(true)
          setTimeout(() => {
            setisCopied(false)
            
          },2000);
          // Optionally, show a loading indicator or message while copying the link
      };
      const declineIconClicked = () => {
         navigate('/')
         setIsOpen(false)
          // Optionally, show a loading indicator or message while copying the link
      };
      useEffect(() => {
        // Check if displayedStory is available and if the user has liked the story
        if (displayedStory) {
          setIsLiked(displayedStory.likedBy.includes(user.id)); // Set isLiked based on the likedBy array
        } else {
          setIsLiked(false); // If displayedStory is not available, set isLiked to false
         

        }
      }, [displayedStory, user.id]);
      useEffect(() => {
        // Check if displayedStory is available and if the user has liked the story
        if (displayedStory) {
            setIsBookmarked(displayedStory.savedBy.includes(user.id)); // Set isLiked based on the likedBy array
        } else {
            setIsBookmarked(false); // If displayedStory is not available, set isLiked to false
         

        }
      }, [displayedStory, user.id]);

      const bookmarkHandler = async () => {
        try {
          const response = await saveStory({ id: displayedStory._id });
          setDisplayedStory(response.data); // Update the displayed story with the latest data
      
          // Check if the user ID is in the savedBy array to determine the bookmark state
          const savedByCurrentUser = response.data.savedBy.includes(user.id);
          setIsBookmarked(savedByCurrentUser); // Update the isBookmarked state based on the response
        } catch (error) {
          console.error('Error:', error);
          // Handle errors if necessary
        }
      };
      
      const likeHandler = async () => {
        try {
          const response = await likeStory({ id: displayedStory._id });
          setDisplayedStory(response.data); // Update the displayed story with the latest data
      
          // Check if the user ID is in the likedBy array to determine the like state
          const likedByCurrentUser = response.data.likedBy.includes(user.id);
          setIsLiked(likedByCurrentUser); // Update the isLiked state based on the response
        } catch (error) {
          console.error('Error:', error);
          // Handle errors if necessary
        }
      };
      
    //   const bookmarkHandler = async() => {
    //     const response=await saveStory({id:displayedStory._id});
    // //    const response=await bookmarkedStory()
    // console.log(response);
    // if(response?.success){
    //     setDisplayedStory(response?.data)
    //     }
    //     const saved=displayedStory.savedBy
    //     console.log(saved);
    //     console.log(saved.includes(user.id));
    //     if(displayedStory.savedBy.includes(user.id)){
    //      console.log(displayedStory);
    //      setIsBookmarked(true)
    //  }
    //  else{
    //         console.log(displayedStory);
    //         setIsBookmarked(false)
    //     }
        
        
       

    //       // Optionally, show a loading indicator or message while copying the link
    //   };
    //   const likeHandler = async() => {
    //    const response=await likeStory({id:displayedStory._id});
    //    console.log(response.data.likedBy.includes(user.id));
    //    setDisplayedStory(response.data)
    //    if(response.data.likedBy.includes(user.id)){
    //     setIsLiked(true)
    //    }else{
    //     setIsLiked(false)
    //    }
       
       

    //       // Optionally, show a loading indicator or message while copying the link
    //   };
  
  return (
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
    overlayClassName={style.Overlay}
  >
   <div className={style.modalContainer}>
   <div className={style.previousStoryContainer}>
    <button onClick={goToPreviousStory}>{'<'}</button>
   </div>
   <div className={style.storyContainer}>
   <div className={style.postContainer}>
   {displayedStory?.stories?.[currentStoryIndex].image&&<img src={displayedStory.stories[currentStoryIndex].image} ></img>}
  <div className={style.storyNavigationContainer}>
            <div>
            <img src={storyIcon}></img>

            </div>
            <div className={style.shareContainer}>
                <img src={declineIcon} onClick={declineIconClicked}></img>
                <img src={sendIcon} onClick={shareIconClicked}></img>
            </div>
  </div>
  <div className={style.storyContentContainer}>
    {isCopied&&<button className={style.copyLinkToClipboardContainer} onClick={()=>{
        setisCopied(false)
    }}>Link copied to clipboard</button>}
    <div className={style.storyContent}>
    {displayedStory?.stories?.[currentStoryIndex].heading&&<p className={style.storyHeading}>{displayedStory.stories[currentStoryIndex].heading}</p>}
   {displayedStory?.stories?.[currentStoryIndex].description&&<p className={style.storyDescription}>{displayedStory.stories[currentStoryIndex].description}</p>}
    </div>


        <div className={style.bookmarkContainer}>
            <img src={isBookmarked?bookmarkIcon:bookmarkedIcon} onClick={bookmarkHandler}></img>
            <img src={isLiked?likedIcon:likeIcon}
  onClick={likeHandler}></img>  
            
        </div>
  
  </div>
   </div>
   </div>
   <div className={style.nextStoryContainer}>
    <button onClick={goToNextStory}>{'>'}</button>
</div>
   </div>
  </Modal>

  )
}

export default StoryModal
import React from 'react'
import profileImage from '../../assets/Mask groupprofile.png'
import menuIcon from '../../assets/Vectorhamburger.png'
import bookmarkIcon from '../../assets/Vectorbookmark.png'
import style from './AuthenticatedUserNav.module.css'
import ProfileModal from '../modals/profile_modal/Profile_modal'
import AddStoryModal from '../modals/AddStoryModal/AddStoryModal'
import { useNavigate } from 'react-router-dom'

const AuthenticatedUserNav = () => {
  const navigate=useNavigate()
  const handleBookmarkClick = () => {
 navigate('/bookmarks')
};

  return (
    <>
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
  )
}

export default AuthenticatedUserNav
// {/* <div className={`${style.bookmark_container} ${style.button_container}`}>
//             <img src={bookmarkIcon}></img>
//             <h3>Bookmarks</h3>
//           </div>
//           <div className={`${style.add_story_container} ${style.button_container}`}>Add Story</div>
//           <div className={`${style.profile_container} ${style.container}`}>
//           <img src={menuIcon}></img>

//           </div>
//           <div className={`${style.menu_container} ${style.container}`}>
//             {/* <ProfileModal></ProfileModal> */}

//         </div> 
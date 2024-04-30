import React from 'react'
import Modal from "react-modal";
import profileImage from '../../../assets/Mask groupprofile.png'
import style from './Profile_modal.module.css'
import { INITIAL_USER, useUserContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import {logoutUser} from '../../../api/api'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import menuIcon from '../../../assets/Vectorhamburger.png'
const customStyles = {
    content: {
        // position: 'relative',
        // top: 'calc(10px)' ,/* Position below the profile icon */
        top:'15%',    
        height:'fit-content',
        width:'fit-content',
        left: '80%',
       
        transform: 'translateX(-50%)',
        backgroundColor:' #ffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
},


};
 
Modal.setAppElement('#root');

const Profile_modal = () => {
    const navigate=useNavigate()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const {isAuthenticated,user,setUser,setIsAuthenticated}=useUserContext()

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }
      const logoutHandler=async()=>{
       try {
         let logoutUservalue = await logoutUser();
         if(logoutUservalue?.success){
             setUser(INITIAL_USER)
             setIsAuthenticated(false)
             logoutUservalue?.success &&
             toast.success(logoutUservalue?.message || "Logout Success!", {
               position: "top-center",
             });
             closeModal()
             navigate('/')
         }
       } catch (error) {
        console.log(error);
        
       }
      }
  return (
   <div>
    {/* <buttonclassName={style.Sign_button}>Sign In</buttonclassName=> */}
    {/* <img src={menuIcon}></img> */}
    <img src={menuIcon} className={style.menu_button}  onClick={()=>{
        setIsOpen(!modalIsOpen)
    }} ></img>
    <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
          contentLabel="Example Modal"
          overlayClassName={style.Overlay}
          className={style.modalContainer}
          
  >
    <div  className={style.profile_container}>
    <div>{user?.userName}</div>
    <div>
        <button className={style.menu_button} onClick={logoutHandler}>Logout</button>
    </div>
    </div>
  </Modal>
    </div>
  )
}

export default Profile_modal
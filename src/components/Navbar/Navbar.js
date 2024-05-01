import React, { useState } from 'react'
import style from './Navbar.module.css'
import { Sign_in_modal } from '../modals/sign_in_modal/Sign_in_modal'
import {Sign_up_modal} from '../modals/sign_up_modal/Sign_up_modal'
import {useUserContext} from '../../context/AuthContext'
import closeMenuIcon from '../../assets/akar-icons_cross (1).png'
import menuIcon from '../../assets/Vectorhamburger.png'
import AuthenticatedUserNav from '../AuthenticatedUserNav.js/AuthenticatedUserNav'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const {isAuthenticated}=useUserContext()
  const [menuToggle,setMenuToggle]=useState(false)
  const navigate=useNavigate()
  const logoHandler=async()=>{
    navigate('/')
  }
  const menuToggleHandler=async()=>{
    setMenuToggle(!menuToggle)
  }


  return (
    <>
    <div className={style.nav_bar_container}>
        <h1 onClick={logoHandler}>SwipTory</h1>
        <div className={style.nav_bar_container_right_side}>
       { isAuthenticated?<AuthenticatedUserNav></AuthenticatedUserNav>:<>
        <Sign_up_modal></Sign_up_modal>
        <Sign_in_modal></Sign_in_modal></>}
        </div>
        <div className={style.nav_bar_container_right_side_icon}>
          <img src={menuIcon} onClick={menuToggleHandler}></img>
        </div>
    </div>
    {menuToggle&&<div className={style.smallDeviceMenu}>
      <div className={style.closeMenuIconContainer}>
      <img src={closeMenuIcon} className={style.closeMenuIcon} onClick={menuToggleHandler} ></img>
      </div>
    { isAuthenticated?<AuthenticatedUserNav></AuthenticatedUserNav>:<>
        <Sign_up_modal></Sign_up_modal>
        <Sign_in_modal></Sign_in_modal></>}
          </div>}
    </>
  )
}

export default Navbar
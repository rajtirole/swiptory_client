import React from 'react'
import style from './Navbar.module.css'
import Button from '../ui/Button/Button'
import { Sign_in_modal } from '../modals/sign_in_modal/Sign_in_modal'
import {Sign_up_modal} from '../modals/sign_up_modal/Sign_up_modal'
import {useUserContext} from '../../context/AuthContext'
import { useContext } from "react";
import AuthenticatedUserNav from '../AuthenticatedUserNav.js/AuthenticatedUserNav'



const Navbar = () => {
  const logoHandler=async()=>{
    
  }
  const {isAuthenticated,user}=useUserContext()
  console.log(isAuthenticated,user);
  return (
    <div className={style.nav_bar_container}>
        <h1 onClick={logoHandler}>SwipTory</h1>
        <div className={style.nav_bar_container_right_side}>
       { isAuthenticated?<AuthenticatedUserNav></AuthenticatedUserNav>:<>
        <Sign_up_modal></Sign_up_modal>
        <Sign_in_modal></Sign_in_modal></>}
        </div>
    </div>
  )
}

export default Navbar
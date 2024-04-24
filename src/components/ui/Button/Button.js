import React from 'react'
import style from './Button.module.css'

const Button = ({label}) => {
  return (
    <button className={`${style.button_wrapper}`}>{label}</button>
  )
}

export default Button
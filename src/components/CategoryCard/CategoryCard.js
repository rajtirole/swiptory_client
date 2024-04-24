import React, { useState } from 'react'
import style from './CategoryCard.module.css'
import { Categorie } from "../../constants/Categories";
const CategoryCard = ({ele,selected, onChange,setCategoriesPosts}) => {
  return (
    <div className={`${style.CategoryCard} ${selected&&style.CategoryCardBorder} `} selected={selected} onClick={()=>{
      onChange();
      if(ele.name=="All"){
        console.log(ele.name);
        setCategoriesPosts(null)
        return
      }
      setCategoriesPosts({name:ele.name})
    }}>
        <img src={ele.image }className={``}></img>
        <h2>{ele.name}</h2>
    </div>
  )
}

export default CategoryCard
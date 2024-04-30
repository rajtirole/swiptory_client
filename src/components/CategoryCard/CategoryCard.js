import React, { useState } from 'react'
import style from './CategoryCard.module.css'
import { Categorie } from "../../constants/Categories";
import { usePostsContext } from '../../context/PostContext';
const CategoryCard = ({ele,selected, onChange}) => {
  const {categoriesPosts,setCategoriesPosts}=usePostsContext()
  return (
    <div className={`${style.CategoryCard} ${selected&&style.CategoryCardBorder} `} selected={selected} onClick={()=>{
      onChange();
      if(ele.name=="All"){
        setCategoriesPosts(null)  //change
        return
      }
      setCategoriesPosts({name:ele.name})
      
    }}>
        <img src={ele.image } className={``}></img>
        <h2>{ele.name}</h2>
    </div>
  )
}

export default CategoryCard
import React, { useState } from 'react'
import StoryCategory from '../StoryCategory/StoryCategory'
import {Categorie} from '../../constants/Categories'
import Categories from '../Categories/Categories';
import MultiSlideForm from '../modals/MultiSlideFormModal/MultiSlideForm';
import style from './StorySection.module.css'
import { usePostsContext } from "../../context/PostContext";

console.log(Categorie);
const StorySection = () => {
  const { posts } = usePostsContext()
  const [categoriesPosts,setCategoriesPosts]=useState(null)
console.log(posts);

  return (
    <div>
      <div>

      <Categories setCategoriesPosts={setCategoriesPosts}></Categories>

      </div>
     <div>
     {!categoriesPosts?Categorie.map((Categorie,index)=>{
    return <StoryCategory key={index} Categorie={Categorie} stories={posts[Categorie.name]} ></StoryCategory>
    }):<>
    <StoryCategory Categorie={categoriesPosts} stories={posts[categoriesPosts.name]} ></StoryCategory>
    </>}
     </div>
    </div>
  )
}

export default StorySection
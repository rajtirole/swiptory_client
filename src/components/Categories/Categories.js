import React ,{useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from "./Categories.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { categorieOption } from "../../constants/Categories";
const Categories = ({setCategoriesPosts}) => {
    const [isSelected, setisSelected] = useState(null);

 
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
   
     <div className={style.carousel_item}>
      {categorieOption.map((ele,index) => {
        return <CategoryCard key={index} setCategoriesPosts={setCategoriesPosts} ele={ele}selected={isSelected === index} onChange = {() => setisSelected(index)}></CategoryCard>;
      })}
     </div>
  );
};

export default Categories;

import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import style from "./Categories.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { categorieOption } from "../../constants/Categories";
const Categories = ({ setCategoriesPosts }) => {
  const [isSelected, setisSelected] = useState(null);
  return (
    <div className={style.carousel_item}>
      {categorieOption.map((ele, index) => {
        return (
          <CategoryCard
            key={index}
            setCategoriesPosts={setCategoriesPosts}
            ele={ele}
            selected={isSelected === index}
            onChange={() => setisSelected(index)}
          ></CategoryCard>
        );
      })}
    </div>
  );
};

export default Categories;

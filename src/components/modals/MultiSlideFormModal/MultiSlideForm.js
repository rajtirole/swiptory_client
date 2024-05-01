import React, { useState } from "react";
import style from "./MultiSlideForm.module.css"; // Import module CSS
import { StoryCreationCategory } from "../../../constants/Categories";
import declineIcon from "../../../assets/Vector (9).png";

export const SlideCard = ({ currentSlideIndex, form, setform }) => {
    const handleInputChange = (event) => {
      setform({
        ...form,
        [event.target.name]: event.target.value,
      });
    };
    return (
      <>
        <div className={style.slide}>
          <div className={style.feilds}>
            <div className={style.labelContainer}>
              <label id="heading">Heading :</label>
            </div>
            <div className={style.inputcontainers}>
              <input
                value={form.heading}
                name="heading"
                placeholder="Your Heading"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className={style.feilds}>
            <div className={style.labelContainer}>
              <label id="description">Description :</label>
            </div>
            <div className={style.inputcontainers}>
              <input
                value={form.description}
                name="description"
                placeholder="Story Description"
                onChange={handleInputChange}
                
              ></input>
            </div>
          </div>
          <div className={style.feilds}>
            <div className={style.labelContainer}>
              <label id="image">Image :</label>
            </div>
            <div className={style.inputcontainers}>
              <input
                value={form.image}
                name="image"
                placeholder="Add Image url"
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className={style.feilds}>
            <div className={style.labelContainer}>
              <label id="image">Category :</label>
            </div>
            <div className={style.inputcontainers}>
              <select
                id="category"
                className={style.selectContainer}
                name="category"
                onChange={handleInputChange}
              >
                <option selected disabled>
                  Select Category
                </option>
                {StoryCreationCategory.map((e) => {
                  return (
                    <option value={e} name={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </>
    );
  };
  function FormModal() {
    const [forms,setforms]= useState(Array.from({ length: 6 }, () => ({
        heading: "",
        description: "",
        image: "",
        category: "",
      })))
    const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

    const submitHandler=()=>{
        console.log(forms);

    }
  
    const [form, setForm] = useState(forms[currentSlideIndex - 1]);
const [slide,setSlide]=useState(3)

  const slideChangeHandler=({currentSlideIndex,i})=>{
   
   
    

  }
    const navigateSlide = (direction) => {
      if (direction === "prev" && currentSlideIndex > 1) {
        setCurrentSlideIndex((prev) => prev - 1);
         let fromss=forms.map((e,i)=>{
            console.log(currentSlideIndex);
            console.log(forms);
            if((currentSlideIndex-1)===i){
                console.log(form);
                return form
            }
            return e
        })
        setforms([...fromss])
      setForm(forms[currentSlideIndex - 2]);
      } else if (direction === "next" && currentSlideIndex < 6&&currentSlideIndex< slide) {
        setCurrentSlideIndex((prev) => prev + 1);
         let fromss=forms.map((e,i)=>{
            if((currentSlideIndex-1)===i){
                return form
            }
            return e
        })
        setforms([...fromss])
        console.log(forms);
        setForm(forms[currentSlideIndex]);
       
      }
    };
    const addSlideHandler=()=>{
        console.log(slide);
        slide<6&&setSlide((prev)=>prev+1)
       
        

}    
const declineChangeHandler=(i)=>{

}
  
  return (
    <>
      <div className={style.formContainer}>
        <div className={style.slideContainer}>
          <p>Add upto 6 slides</p>
          <div className={style.SlideButtonContainer}>

          {
          Array.from({ length: slide }, (_, i) => (
           <div>
             <button key={i} onClick={() => {
                console.log(i);
                console.log(currentSlideIndex);
                console.log(forms);
                let fromss=forms.map((e,index)=>{
                   if((currentSlideIndex-1)===index){
                       return form
                   }
                   return e
               })
               setforms([...fromss])
               setForm(forms[i]);
               console.log(forms);
               console.log(form);
               setCurrentSlideIndex(i+1)
               

           
            }}>
              Slide {i + 1}
            </button>
           { <img src={declineIcon} onClick={()=>{
                declineChangeHandler(i)
            }}></img>}
           </div>
          ))
          }
          <div>
          <button onClick={addSlideHandler}>Add +</button>

          </div>
          </div>
        </div>
       <div className={style.inputContainer}>
       <SlideCard form={form} setform={setForm} />
       </div>
       <div className={style.navigation}>
       <div>
          <button
            className={style.previousButton}
            onClick={() => navigateSlide("prev")}
          >
            Previous
          </button>
          <button
            className={style.nextButton}
            onClick={() => navigateSlide("next")}
          >
            Next
          </button>
        </div>
        <div>
          <button className={style.postButton} onClick={submitHandler}>Post</button>
        </div>
      </div>

      </div>
    </>
  );
  
}

export default FormModal;
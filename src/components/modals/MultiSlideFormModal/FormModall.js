import React, { useState } from "react";
import style from "./MultiSlideForm.module.css"; // Import module CSS
import { StoryCreationCategory } from "../../../constants/Categories";
import declineIcon from "../../../assets/Vector (9).png";

export const SlideCard = ({ formCurrent, form, setform }) => {
    const handleInputChange = (event) => {
    console.log({...form[formCurrent],[event.target.name]:event.target.value});
        let formss=form.map((e,i)=>{
            if(formCurrent==i){
                return {...form[formCurrent],[event.target.name]:event.target.value}
            }
            return e
        })
        setform([...formss])
    };
    console.log(form);
    return (
      <>
        <div className={style.slide}>
          <div className={style.feilds}>
            <div className={style.labelContainer}>
              <label id="heading">Heading :</label>
            </div>
            <div className={style.inputcontainers}>
              <input
                value={form[formCurrent].heading}
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
                value={form[formCurrent].description}
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
                value={form[formCurrent].image}
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
  function FormModall() {
    const [forms,setforms]= useState(Array.from({ length: 6 }, () => ({
        heading: "",
        description: "",
        image: "",
        category: "",
      })))
    const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
    const [slides, setSlides] = useState(3);

    const submitHandler=()=>{
        console.log(forms);

    }
  
    const [form, setForm] = useState(forms[currentSlideIndex - 1]);
const [slide,setSlide]=useState(3)
const [formCurrent,setFromCurrent]=useState(0)

  const slideChangeHandler=({currentSlideIndex,i})=>{
   
   
    

  }
    const navigateSlide = (direction) => {
      if (direction === "prev") {
        console.log(formCurrent);
        console.log(forms);
       formCurrent>0&&setFromCurrent((prev)=>prev-1)
      } else if (direction === "next" ) {
        console.log(formCurrent);
        console.log(forms);
        if(slides-1>formCurrent){
            console.log(formCurrent);
            console.log(slides);
            console.log(forms);
        formCurrent<5&&setFromCurrent((prev)=>prev+1)
        }
      }
    };
    const addSlideHandler=()=>{
        console.log(slides);
        slides<6&&setSlides((prev)=>prev+1)
        
        // let fromss=forms.map((e,i)=>{
        //     console.log(slide);
        //     console.log(currentSlideIndex);
        //     if((currentSlideIndex-1)===i){
        //         return form
        //     }
        //     return e
        // })
        // // setforms([...fromss])
        // setCurrentSlideIndex()

        // slide<6&&setSlide((prev)=>prev+1)
        

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
          Array.from({ length: slides }, (_, i) => (
           <div>
             <button key={i} onClick={() => {
                    setFromCurrent(i)
            }}>
              Slide {i + 1}
            </button>
           {i>2&&<img src={declineIcon} onClick={()=>{
                declineChangeHandler(i)
            }}></img>}
           </div>
          ))
          }
          <div>
          {slides<6&&<button onClick={addSlideHandler}>Add +</button>}

          </div>
          </div>
        </div>
       <div className={style.inputContainer}>
      { 
      <SlideCard form={forms} setform={setforms} formCurrent={formCurrent}/>}
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

export default FormModall;
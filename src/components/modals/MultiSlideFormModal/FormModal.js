import React, { useState } from "react";
import style from "./MultiSlideForm.module.css"; // Import module CSS
import { StoryCreationCategory } from "../../../constants/Categories";
import declineIcon from "../../../assets/Vector (9).png";
import { postSchema } from "../../../lib/zod/userValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postStories } from "../../../api/api";
export const SlideCard = ({
  formCurrent,
  form,
  setform,
  validationError,
  setValidationError,
}) => {
  const handleCategoryChange = (event) => {
    setValidationError(null);
    const category = event.target.value;
    let formss = form.map((e, i) => {
      return {
        ...form[i],
        category: category,
      };
    });
    setform([...formss]);
  };

  const handleInputChange = (event) => {
    setValidationError(null);
    let formss = form.map((e, i) => {
      if (formCurrent == i) {
        return {
          ...form[formCurrent],
          [event.target.name]: event.target.value,
        };
      }
      return e;
    });
    setform([...formss]);
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
              //   onChange={handleInputChange}
              value={form[formCurrent].category}
              defaultValue={"Select Category"}
              onChange={handleCategoryChange}
            >
              <option disabled value={"Select Category"} name={"Select Category"}>
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
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const [slides, setSlides] = useState(3);
  const [formCurrent, setFromCurrent] = useState(0);
  const [validationError, setValidationError] = useState(null);
  const [forms, setforms] = useState(
    Array.from({ length: 6 }, () => ({
      heading: "",
      description: "",
      image: "",
      category: "",
    }))
  );

  const submitHandler =async () => {
    const validPosts = forms.slice(0, slides);
    console.log(forms);
    console.log(formCurrent);
    console.log(slides);
    console.log(validPosts);
    try {
      const parsedPosts = postSchema.parse(validPosts);
      console.log("Valid posts:", parsedPosts);
      if(parsedPosts){
          try {
            let postResponse = await postStories(validPosts);
            console.log(postResponse);
        } catch (error) {
            console.log(error);
            
        }
      }
    } catch (error) {
      setValidationError({
        message: "Please fill out all fields",
      });
      console.error("Invalid posts:", error);
    }
  };

  const navigateSlide = (direction) => {
    if (direction === "prev") {
      formCurrent > 0 && setFromCurrent((prev) => prev - 1);
    } else if (direction === "next") {
      if (slides - 1 > formCurrent) {
        formCurrent < 5 && setFromCurrent((prev) => prev + 1);
      }
    }
  };
  const addSlideHandler = () => {
    slides < 6 && setSlides((prev) => prev + 1);
  };
  const declineChangeHandler = (i) => {};

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.slideContainer}>
          <p>Add upto 6 slides</p>
          <div className={style.SlideButtonContainer}>
            {Array.from({ length: slides }, (_, i) => (
              <div>
                <button
                  key={i}
                  onClick={() => {
                    setFromCurrent(i);
                  }}
                >
                  Slide {i + 1}
                </button>
                {i > 2 && (
                  <img
                    src={declineIcon}
                    onClick={() => {
                      declineChangeHandler(i);
                    }}
                  ></img>
                )}
              </div>
            ))}
            <div>
              {slides < 6 && <button onClick={addSlideHandler}>Add +</button>}
            </div>
          </div>
        </div>
        <div className={style.inputContainer}>
          {
            <SlideCard
              form={forms}
              setform={setforms}
              formCurrent={formCurrent}
              validationError={validationError}
              setValidationError={setValidationError}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          }
        </div>
        {validationError && (
          <div className={style.validationErrorContainer}>
            {validationError.message}
          </div>
        )}
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
            <button className={style.postButton} onClick={submitHandler}>
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormModall;

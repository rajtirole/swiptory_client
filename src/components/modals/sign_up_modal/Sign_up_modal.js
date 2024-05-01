import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import style from "./Sign_up_modal.module.css";
import password_image from "../../../assets/Vector (8).png";
import { userSchema } from "../../../lib/zod/userValidation";
import { registerUser } from "../../../api/api";
import declineImage from "../../../assets/Vector (9).png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostsContext } from "../../../context/PostContext";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    padding: "1rem 2rem",
  },
};
Modal.setAppElement("#root");

export const Sign_up_modal = () => {
  const [validationError, setValidationError] = useState(null);
  const [passwordValue, setPasswordValue] = useState("password");
  const { isPageReloadRequired, setisPageReloadRequired } = usePostsContext();

  const submitHandler = async (e) => {
    const result = userSchema.safeParse(formValue);
    if (result.success) {
      try {
        // Proceed with form submission
        let userValue = await registerUser(formValue);
        userValue?.success &&
          toast.success(userValue?.message || "success", {
            position: "top-center",
          });
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "something went wrong", {
          position: "top-center",
        });
      }
    } else {
      // Handle validation errors
      setValidationError(result.error.formErrors.fieldErrors);
    }
    setisPageReloadRequired(true);
    // setisPageReloadRequired(!isPageReloadRequired)
  };

  const changeHandelr = async (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setValidationError(false);
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={style.Sign_up_button_container}>
      <button onClick={openModal} className={style.Sign_up_button}>
        Register Now
      </button>
      <button onClick={openModal} className={style.Sign_up_button_small_device}>
        Register
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={style.Overlay}
      >
        <div className={style.RegisterContainer}>
          <img
            src={declineImage}
            className={style.declineImageContainer}
            onClick={closeModal}
          ></img>
          <div className={style.heading}>Register to SwipTory</div>
          <div className={style.inputContainer}>
            <div className={style.inputValueContainer}>
              <div>
                <label>Username</label>
              </div>
              <div className={style.input}>
                <input
                  type="text"
                  placeholder="Enter username"
                  onChange={changeHandelr}
                  name="username"
                  value={formValue.username}
                ></input>
              </div>
            </div>
            <div className={style.inputValueContainer}>
              <div>
                <label>password</label>
              </div>
              <div className={style.input}>
                <input
                  placeholder="Enter password"
                  type={passwordValue}
                  onChange={changeHandelr}
                  name="password"
                  value={formValue.password}
                ></input>
                <img
                  src={password_image}
                  onClick={(e) => {
                    passwordValue === "text"
                      ? setPasswordValue("password")
                      : setPasswordValue("text");
                  }}
                ></img>
              </div>
            </div>
          </div>
          {validationError && (
            <>
              <div className={style.errorContainer}>
                {validationError?.username}
              </div>
            </>
          )}
          {validationError?.password && (
            <>
              <div className={style.errorContainer}>
                {validationError?.password}
              </div>
            </>
          )}
          <div>
            <button className={style.RegisterButton} onClick={submitHandler}>
              Register
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sign_up_modal;

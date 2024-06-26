import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import style from "../EditStoryModal/UpdateStoryModal.module.css";
import password_image from "../../../assets/Vector (8).png";
import { userSchema } from "../../../lib/zod/userValidation";
import { signInUser } from "../../../api/api";
import declineImage from "../../../assets/Vector (9).png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  },
};
Modal.setAppElement("#root");

export function LikeAndBookmarkLoginModal({
  login,
  modal,
  likeLogin,
  setLikeLogin,
  isLikeLogin,
}) {
  const navigate = useNavigate();
  const { setUser, user, setIsAuthenticated, checkAuthUser, isAuthenticated } =
    useUserContext();
  const { isPageReloadRequired, setisPageReloadRequired } = usePostsContext();
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });

  const [validationError, setValidationError] = useState(null);
  const [passwordValue, setPasswordValue] = useState("password");
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const reset = () => {
    setFormValue({ username: "", password: "" });
  };

  const submitHandler = async (e) => {
    const result = userSchema.safeParse(formValue);

    if (result.success) {
      try {
        let userValue = await signInUser(formValue);
        const isLoggedIn = await checkAuthUser();
        if (!isLoggedIn) {
          toast({ title: "Login up failed. Please try again." });
          return;
        }

        if (isLoggedIn) {
          toast.success(userValue?.message || "Login Successfully", {
            position: "top-center",
          });
          reset();
          navigate("/");
        } else {
          toast({ title: "Login failed. Please try again." });
          return;
        }
        setIsOpen(false);
        setIsAuthenticated(true);
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || "something went wrong", {
          position: "top-center",
        });
      }
    } else {
      // Handle validation errors
      setValidationError(result.error.formErrors.fieldErrors);
    }
    setisPageReloadRequired(!isPageReloadRequired);
  };
  const changeHandelr = async (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setValidationError(false);
  };

  return (
    <>
      <div className={style.Sign_button_container}>
        {isLikeLogin && (
          <Modal
            isOpen={true}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            overlayClassName={style.Overlay}
            className={style.modalContainer}
          >
            <div className={style.signInContainer}>
              <img
                src={declineImage}
                className={style.declineImageContainer}
                onClick={closeModal}
              ></img>
              <div className={style.heading}>Login to SwipTory</div>
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
                <button
                  className={style.Sign_in_button}
                  onClick={submitHandler}
                >
                  Login
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

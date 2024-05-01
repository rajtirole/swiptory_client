

import React from 'react'
import style from './UpdateStoryModal.module.css'
import Modal from "react-modal";
import MultiSlideForm from '../MultiSlideFormModal/MultiSlideForm';
import FormModal from '../MultiSlideFormModal/FormModal';
// import editIcon from '../../../assets/Group 89.png'
import editIcon from '../../../assets/tabler_edit.png'

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
    //   background:'red'
    },
  };
const UpdateStoryModal = () => {
const [modalIsOpen, setIsOpen] = React.useState(false);
Modal.setAppElement("#root");
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
      }
    
      function closeModal() {
        setIsOpen(false);
      }
    
  return (
    <>
                     {/* <img src={editIcon} onClick={(e)=>{
                  openModal();
              }} ></img> */}
                   <div className={style.editIconContainer} onClick={(e)=>{
                openModal();
            }} >
                   <img src={editIcon} ></img>
            <div>Edit</div>
                   </div>

            {/* <button onClick={(e)=>{
                openModal();
            }} className={style.buttonContainer}>Edit</button> */}
            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={style.Overlay}
        className={style.modalContainer}
      >
        <FormModal EditmModal={true} closeModal={closeModal}></FormModal>
      </Modal>
    
    </>
  )
}

export default UpdateStoryModal
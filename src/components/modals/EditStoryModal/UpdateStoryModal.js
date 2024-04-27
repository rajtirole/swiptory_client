

import React from 'react'
import style from './UpdateStoryModal.module.css'
import Modal from "react-modal";
import MultiSlideForm from '../MultiSlideFormModal/MultiSlideForm';
import FormModal from '../MultiSlideFormModal/FormModal';

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
            <button onClick={(e)=>{
                openModal();
            }} className={style.buttonContainer}>Edit</button>
            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={style.Overlay}
      >
        <FormModal EditmModal={true} closeModal={closeModal}></FormModal>
      </Modal>
    
    </>
  )
}

export default UpdateStoryModal
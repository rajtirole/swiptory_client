import React from 'react'
import Modal from "react-modal";

const Modals = ({children}) => {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: "20px",
        padding: "1rem 2rem",
    },
    
    };
    Modal.setAppElement('#root');
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
  return (
    <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName={style.Overlay}
        >
            {children}

        </Modal>
  )
}

export default Modals
import React from 'react';
import './Modal.css'; 

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{props.task}</h2>
          <span className="close-btn" onClick={props.onClose}>X</span>
        </div>
        <div className="modal-Start-date">
          From: {props.startDate}
        </div>
        <div className="modal-end-date">
          To: {props.endDate}
        </div>
        <div className='modal-content'>
            {props.description}
        </div>
      </div>
    </div>
  );
};

export default Modal;

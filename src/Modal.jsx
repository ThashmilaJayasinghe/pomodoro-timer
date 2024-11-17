import React from 'react';
import closeIcon from '/close.svg'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <img src={closeIcon} className="icon" alt="settings icon" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

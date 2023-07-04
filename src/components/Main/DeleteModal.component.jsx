import React from "react";
import Modal from "react-modal";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Delete Car</h2>
      <p>Are you sure you want to delete this car?</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default DeleteModal;

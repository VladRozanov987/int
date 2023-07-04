import React, { useState } from "react";
import Modal from "react-modal";
import { styled } from "styled-components";

const AddCarModal = ({ isOpen, onClose, onAddCar }) => {
  const [newCarData, setNewCarData] = useState({
    Company: "",
    Model: "",
    VIN: "",
    Color: "",
    Year: "",
    Price: "",
    Availability: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCar(newCarData);
    setNewCarData({
      Company: "",
      Model: "",
      VIN: "",
      Color: "",
      Year: "",
      Price: "",
      Availability: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Car Modal"
    >
      <h2>Add Car</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Company:
          <input
            type="text"
            name="Company"
            value={newCarData.Company}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Model:
          <input
            type="text"
            name="Model"
            value={newCarData.Model}
            onChange={handleInputChange}
          />
        </label>
        <label>
          VIN:
          <input
            type="text"
            name="VIN"
            value={newCarData.VIN}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="Color"
            value={newCarData.Color}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Year:
          <input
            type="text"
            name="Year"
            value={newCarData.Year}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="Price"
            value={newCarData.Price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Availability:
          <input
            type="text"
            name="Availability"
            value={newCarData.Availability}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </StyledForm>
    </Modal>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  label {
    display: flex;
    flex-direction: column;
  }
  button {
    margin-top: 20px;
    width: 20%;
  }
`;

export default AddCarModal;

import React, { useState } from "react";
import { styled } from "styled-components";
import Modal from "react-modal";

const EditModal = ({ isOpen, onClose, onSave, data }) => {
  const [color, setColor] = useState(data?.car_color || "");
  const [price, setPrice] = useState(data?.price || "");
  const [availability, setAvailability] = useState(data?.availability || false);

  console.log(`selectedCar`, data);

  const handleSave = () => {
    const updatedCar = {
      ...data,
      car_color: color,
      price: price,
      availability: availability,
    };
    onSave(updatedCar);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Edit Car</h2>
      {data ? (
        <StyledEdit>
          <label htmlFor="company">Company:</label>
          <input type="text" id="company" value={data.car} disabled />
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" value={data.car_model} disabled />
          <label htmlFor="vin">VIN:</label>
          <input type="text" id="vin" value={data.car_vin} disabled />
          <label htmlFor="year">Year:</label>
          <input type="text" id="year" value={data.car_model_year} disabled />
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="availability">Availability:</label>
          <input
            type="checkbox"
            id="availability"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
        </StyledEdit>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

const StyledEdit = styled.div`
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

export default EditModal;

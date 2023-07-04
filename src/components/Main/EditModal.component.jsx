import React, { useState } from "react";
import Modal from "react-modal";

const EditModal = ({ isOpen, onClose, onSave, selectedCar }) => {
  const [color, setColor] = useState(selectedCar?.car_color || "");
  const [price, setPrice] = useState(selectedCar?.price || "");
  const [availability, setAvailability] = useState(
    selectedCar?.availability || false
  );

  console.log(`selectedCar`, selectedCar);

  const handleSave = () => {
    const updatedCar = {
      ...selectedCar,
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
      {selectedCar ? (
        <div>
          <label htmlFor="company">Company:</label>
          <input type="text" id="company" value={selectedCar.car} disabled />
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            value={selectedCar.car_model}
            disabled
          />
          <label htmlFor="vin">VIN:</label>
          <input type="text" id="vin" value={selectedCar.car_vin} disabled />
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={selectedCar.car_model_year}
            disabled
          />
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default EditModal;

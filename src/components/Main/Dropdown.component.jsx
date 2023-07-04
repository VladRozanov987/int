import { styled } from "styled-components";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal.component";
import EditModal from "./EditModal.component";

const Dropdown = ({ options, onOptionSelect, onDeleteCard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option);
  };

  const handleDelete = () => {
    onDeleteCard();
    setSelectedOption(null);
    setIsOpen(false);
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    setSelectedOption(null);
    setIsOpen(false);
    setIsEditModalOpen(true);
  };

  return (
    <StyledDropdown>
      <button className="dropdown-toggle" onClick={handleToggle}>
        Actions
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <button onClick={() => handleOptionSelect("Delete")}>Delete</button>
          </li>
          <li>
            <button onClick={() => handleOptionSelect("Edit")}>Edit</button>
          </li>
        </ul>
      )}
      <DeleteModal
        isOpen={selectedOption === "Delete"}
        onClose={() => setSelectedOption(null)}
        onDelete={handleDelete}
      />
      <EditModal
        isOpen={selectedOption === "Edit"}
        onClose={() => setSelectedOption(null)}
        onSave={handleEditCar}
        selectedCar={selectedCar}
      />
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  margin-top: 10px;
`;

export default Dropdown;

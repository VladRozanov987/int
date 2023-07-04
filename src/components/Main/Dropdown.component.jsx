import { styled } from "styled-components";
import React, { useState } from "react";
import DeleteModal from "./DeleteModal.component";
import EditModal from "./EditModal.component";

const Dropdown = ({
  onOptionSelect,
  onDeleteCard,
  selectedCar,
  setSelectedCar,
  onEditCar,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (option === "Delete") {
      setShowModalDel(true);
      setShowModalEdit(false);
    } else if ((option = "Edit")) {
      setShowModalEdit(true);
      setShowModalDel(false);
    }

    setIsOpen(false);
    onOptionSelect(option);
  };

  const handleDelete = () => {
    onDeleteCard();

    setIsOpen(false);
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);

    setIsOpen(false);
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
        isOpen={showModalDel}
        onClose={() => setShowModalDel(false)}
        onDelete={handleDelete}
      />
      <EditModal
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        onEditCard={handleEditCar}
        onSave={handleEditCar}
        selectedCar={selectedCar}
        {...rest}
      />
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  margin-top: 10px;
`;

export default Dropdown;

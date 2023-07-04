import { useEffect, useState } from "react";
// Libs
import { styled } from "styled-components";
import axios from "axios";
import Modal from "react-modal";
// Component
import Pagination from "./Pagination.component";
import Dropdown from "./Dropdown.component";
import AddCarModal from "./AddCarModal.component";

const Main = () => {
  const url = "https://myfakeapi.com/api/cars/";
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const carsPerPage = 21;

  Modal.setAppElement("#root");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.data.cars) {
          setCars(response.data.cars);
          setFilteredCars(response.data.cars);
          localStorage.setItem("cars", JSON.stringify(response.data.cars));
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    const storedCars = JSON.parse(localStorage.getItem("cars"));
    if (storedCars) {
      setCars(storedCars);
      setFilteredCars(storedCars);
    } else {
      fetchData();
    }
  }, []);

  const handleDropdownOption = (option) => {
    console.log("Selected Option:", option);
  };

  const handleDeleteCard = (carId) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    setFilteredCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    localStorage.setItem("cars", JSON.stringify(filteredCars));
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    openModal();
  };

  const handleSaveCar = (updatedCar) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
    setFilteredCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
    localStorage.setItem("cars", JSON.stringify(filteredCars));
    setSelectedCar(null);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(
        cars.filter((car) => car.car.toLowerCase().includes(query))
      );
    }
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const handleAddCar = (newCarData) => {
    const newCar = {
      id: cars.length + 1,
      car: newCarData.Company,
      car_model: newCarData.Model,
      car_vin: newCarData.VIN,
      car_color: newCarData.Color,
      car_model_year: newCarData.Year,
      price: newCarData.Price,
      availability: newCarData.Availability,
    };

    setCars((prevCars) => [...prevCars, newCar]);
    setFilteredCars((prevCars) => [...prevCars, newCar]);
    closeModal();
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <StyledMain>
      <h1>Cars List</h1>
      <div className="col">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <button onClick={openModal}>Add Car</button>
        <AddCarModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddCar={handleAddCar}
        />
      </div>

      <div className="grid-container">
        {currentCars.map((car) => (
          <div
            className={car.availability ? "card bg-ok" : "card bg-no"}
            key={car.id}
          >
            <div>
              <p>
                <strong>Company:</strong> {car.car}
              </p>
              <p>
                <strong>Model:</strong> {car.car_model}
              </p>
              <p>
                <strong>VIN:</strong> {car.car_vin}
              </p>
              <p>
                <strong>Color:</strong> {car.car_color}
              </p>
              <p>
                <strong>Year:</strong> {car.car_model_year}
              </p>
              <p>
                <strong>Price:</strong> {car.price}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                {car.availability
                  ? "U can buy it =)"
                  : "We don`t have this model =("}
              </p>
            </div>
            <Dropdown
              options={["Edit", "Delete"]}
              onOptionSelect={handleDropdownOption}
              onDeleteCard={() => handleDeleteCard(car.id)}
              selectedCar={selectedCar}
              car={car}
              setSelectedCar={setSelectedCar}
              onEditCar={handleEditCar}
              onSaveCar={handleSaveCar}
            />
          </div>
        ))}
      </div>
      <div>
        {filteredCars.length > carsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCars.length / carsPerPage)}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input,
    button {
      outline: none;
      margin: 10px 0;
      width: 20%;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
    padding: 20px 0;
    .card {
      border: 1px solid #000;
      border-radius: 10px;
      padding: 10px;
    }
    .bg-ok {
      background-color: #80d495;
    }
    .bg-no {
      background-color: #ec8080;
    }
    .d-flex {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      list-style-type: none;
      button {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        margin-top: 10px;
      }
    }
  }
`;

export default Main;

// Libs
import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination.component";

const Main = () => {
  const url = "https://myfakeapi.com/api/cars/";
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const carsPerPage = 21;

  useEffect(() => {
    fetchCarsData();
  }, []);

  const fetchCarsData = async () => {
    try {
      const response = await axios.get(url);
      setCarsData(response.data.cars);
      console.log(response.data.cars);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCars = carsData.filter((car) =>
    Object.values(car)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const carsToShow = filteredCars.slice(startIndex, endIndex);

  return (
    <StyledMain>
      <h1>Cars List</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <div className="grid-container">
        {carsToShow.map((car) => (
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
  input {
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    margin: 10px 0;
    width: 20%;
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
  }
`;

export default Main;

import { styled } from "styled-components";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const showPagination = totalPages > 1;

  const rangeStart = Math.max(1, currentPage - 4);
  const rangeEnd = Math.min(totalPages, rangeStart + 9);

  const pageNumbers = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pageNumbers.push(i);
  }

  return (
    showPagination && (
      <StyledPagination>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
        {totalPages > 10 && <span>...</span>}
        {totalPages > 10 && (
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </StyledPagination>
    )
  );
};

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    outline: none;
    border-radius: 1rem;
  }
  button.active {
    background-color: #007bff;
    color: #fff;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Pagination;

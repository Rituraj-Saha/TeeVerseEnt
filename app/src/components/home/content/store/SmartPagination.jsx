import React from "react";
import { Pagination } from "@mui/material";

const SmartPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value); // pass page number
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      showFirstButton
      showLastButton
    />
  );
};

export default SmartPagination;

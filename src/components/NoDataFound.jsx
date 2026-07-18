import React from "react";

const NoDataFound = ({
  title = "No Data Found",
  message = "There are no records available.",
}) => {
  return (
    <div className="text-center py-5">
      <i
        className="bx bx-folder-open"
        style={{
          fontSize: "70px",
          color: "#b5b5c3",
        }}
      ></i>

      <h5 className="mt-3">{title}</h5>

      <p className="text-muted mb-0">
        {message}
      </p>
    </div>
  );
};

export default NoDataFound;
import React from "react";

export default function Details(props) {
  const { details } = props;

  return (
    <div className="details">
      <h3>Details</h3>
      {Object.keys(details)
        .filter((key) => {
          if (
            key === "Description" ||
            key === "First Name" ||
            key === "Last Name" ||
            key === "id"
          ) {
            return false;
          }
          return true;
        })
        .map((key) => (
          <div key={`${Date.now()}_${`${key}`}`} className="detail-entry">
            {details[key]}
          </div>
        ))}
    </div>
  );
}

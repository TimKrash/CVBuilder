import React from "react";
import "./InformationEntry.scss";

function InformationEntry(props) {
  const { placeholder, value } = props;

  return <input type="text" placeholder={placeholder} defaultValue={value} />;
}

export default InformationEntry;

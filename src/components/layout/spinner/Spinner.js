import React from "react";
import "./spinner.css";

export default () => {
  return (
    <div className="spinner-wrapper">
      <div className="lds-dual-ring" />
    </div>
  );
};

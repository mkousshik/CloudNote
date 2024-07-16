import React from "react";
import "./Alert.css";

export const Alert = (props) => {
  const capitalize = (word) => {
    if (word !== "success") {
      word = "error";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="alert-container">
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type}`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
        </div>
      )}
    </div>
  );
};
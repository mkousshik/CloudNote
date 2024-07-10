import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <i className="fa-solid fa-copy mx-1"></i>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
            <i className="fa-solid fa-trash-can mx-1"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

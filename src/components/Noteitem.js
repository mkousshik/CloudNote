import React, { useState, useContext } from "react";
import "./Noteitem.css";
import noteContext from "../context/notes/NoteContext";
import Background from "./Background";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [bg_color, set_bg_color] = useState(note.bg_color || "white");
  const handleBackground = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="col-md-3">
        <div className="card my-1" style={{ backgroundColor: `${bg_color}` }}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <div className="icon-tray">
              <i
                className="fa-solid fa-copy circle"
                onClick={() => {
                  const textToCopy = `${note.title}\n${note.description}`;
                  navigator.clipboard
                    .writeText(textToCopy)
                    .then(() => {
                      props.showAlert("Copied to clipboard!", "success");
                    })
                    .catch((err) => {
                      props.showAlert("Failed to copy", "error");
                    });
                }}
              ></i>
              <i
                className="fa-solid fa-palette circle"
                onClick={handleBackground}
              ></i>
              <i
                className="fa-solid fa-pen-to-square circle"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              <i
                className="fa-solid fa-trash-can circle"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note deleted successfully!", "success");
                }}
              ></i>
            </div>
          </div>
        </div>
        {isOpen && (
          <Background
            setIsOpen={setIsOpen}
            set_bg_color={set_bg_color}
            note={note}
          />
        )}
      </div>
    </>
  );
};

export default Noteitem;

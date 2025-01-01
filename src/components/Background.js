import React, { useRef, useEffect, useContext } from "react";
import "./Noteitem.css";
import noteContext from "../context/notes/NoteContext";

const Background = (props) => {
  const context = useContext(noteContext);
  const { noteColor } = context;
  const { setIsOpen, set_bg_color, note } = props;
  const ref = useRef();

  const handle_set_bg = (color) => {
    set_bg_color(color.backgroundColor);
    noteColor(note._id, color.backgroundColor);
    setIsOpen(false); // Close the component after selecting a color
  };

  const colors = [
    { backgroundColor: "white", border: "2px solid #ccc" },
    { backgroundColor: "rgb(250, 175, 168)", border: "2px solid rgb(210, 145, 138)" },
    { backgroundColor: "rgb(243, 159, 118)", border: "2px solid rgb(213, 129, 88)" },
    { backgroundColor: "rgb(255, 248, 184)", border: "2px solid rgb(225, 218, 154)" },
    { backgroundColor: "rgb(226, 246, 211)", border: "2px solid rgb(196, 216, 181)" },
    { backgroundColor: "rgb(180, 221, 211)", border: "2px solid rgb(150, 191, 181)" },
    { backgroundColor: "rgb(212, 228, 237)", border: "2px solid rgb(182, 198, 207)" },
    { backgroundColor: "rgb(174, 204, 220)", border: "2px solid rgb(144, 174, 190)" },
    { backgroundColor: "rgb(211, 191, 219)", border: "2px solid rgb(181, 161, 189)" },
    { backgroundColor: "rgb(246, 226, 221)", border: "2px solid rgb(216, 196, 191)" },
    { backgroundColor: "rgb(233, 227, 212)", border: "2px solid rgb(203, 197, 182)" },
    { backgroundColor: "rgb(239, 239, 241)", border: "2px solid rgb(209, 209, 211)" }
  ];

  // Close the component when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={ref} onClick={(e) => e.stopPropagation()}>
      <div className="container_bg">
        {colors.map((color, index) => (
          <div
            key={index}
            className="circle_bg"
            style={color}
            onClick={() => handle_set_bg(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Background;

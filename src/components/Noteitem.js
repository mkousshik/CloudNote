import React,{useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote} = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            {/* <i className="fa-solid fa-copy mx-1"></i> */}
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)} }></i>
            <i className="fa-solid fa-trash-can mx-1" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully!", "success");}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

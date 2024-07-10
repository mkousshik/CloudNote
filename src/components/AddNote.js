import React, {useContext, useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag: "general"});

  const handleAddNote = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
  };
  const onChange=(e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form className="container my-3">
        <div className="form-group">
          <label htmlFor="title">Email address</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Title"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;

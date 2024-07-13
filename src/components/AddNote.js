import React, {useContext, useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""});

  const handleAddNote = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description: "", tag: ""});
  };
  const onChange=(e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form className="container my-3">
        <div className="my-3">
          <label htmlFor="title">Email address</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Password"
            value={note.description}
            onChange={onChange}
          />
        </div>

        <div className="my-3">
          <label htmlFor="description">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter Tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-2"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Modal from "./Modal";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes} = context;
  const [enote, esetNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    
    useEffect(() => {
      if (localStorage.getItem('token')) {
        getNotes();
      } else { 
        navigate("/login");
      }
      // eslint-disable-next-line
    }, []);

  const updateNote=(currentNote)=>{
    esetNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});    setIsOpen(true);
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <Modal isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} enote={enote} esetNote={esetNote} showAlert={props.showAlert}/>
      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;

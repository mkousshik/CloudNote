import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Modal from "./Modal";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes} = context;
  const [enote, esetNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };

  useEffect(() => {
    getNotes();
  }, [getNotes])

  const updateNote=(currentNote)=>{
    esetNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});    setIsOpen(true);
  }

  return (
    <>
      <AddNote/>
      <Modal isOpen={isOpen} closeModal={closeModal} setIsOpen={setIsOpen} enote={enote} esetNote={esetNote}/>
      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;

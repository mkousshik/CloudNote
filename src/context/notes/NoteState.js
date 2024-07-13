import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // get all notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YWE5YTE2Yjg4NzQyNjQ4NDg3YzM0In0sImlhdCI6MTcxOTMxNDg3Mn0.CdDpQ3kop15rSnc3JPG27zl4D7x7h-C7yVRo-tOsAJQ",
      },
      
    });
    const json = await response.json();
    setNotes(json);
  };


  // add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YWE5YTE2Yjg4NzQyNjQ4NDg3YzM0In0sImlhdCI6MTcxOTMxNDg3Mn0.CdDpQ3kop15rSnc3JPG27zl4D7x7h-C7yVRo-tOsAJQ",
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json(); 
    return setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YWE5YTE2Yjg4NzQyNjQ4NDg3YzM0In0sImlhdCI6MTcxOTMxNDg3Mn0.CdDpQ3kop15rSnc3JPG27zl4D7x7h-C7yVRo-tOsAJQ",
      },
    });
    console.log(response)

    // client side
    const newNote = notes.filter((note) => {
      return id !== note._id;
    });
    return setNotes(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3YWE5YTE2Yjg4NzQyNjQ4NDg3YzM0In0sImlhdCI6MTcxOTMxNDg3Mn0.CdDpQ3kop15rSnc3JPG27zl4D7x7h-C7yVRo-tOsAJQ",
      },
      body: JSON.stringify({title, description, tag})
    });
    console.log(response)

    //logic to edit in client side
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

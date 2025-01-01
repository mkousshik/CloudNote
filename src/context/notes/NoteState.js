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
        "auth-token": localStorage.getItem('token')
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
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag })
    });
    const note = await response.json(); 
    return setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    //API Call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // console.log(response)

    // client side
    const newNote = notes.filter((note) => {
      return id !== note._id;
    });
    return setNotes(newNote);
  };

  //add a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    // console.log(response)

    //logic to edit in client side
    if (response.ok) {
      // Logic to edit on client side
      // Assuming you have a state variable called notes that holds the list of notes
      setNotes(prevNotes =>
        prevNotes.map(note => 
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    }
    
  };

  // add a bg
  const noteColor = async (id, bg_color) => {
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/updatebg/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ id, bg_color })
      });
  
      console.log({id, bg_color});
      if (!response.ok) {
        throw new Error('Failed to update background color');
      }
  
      // Logic to edit on client side assuming you have 'setNotes' function
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? { ...note, bg_color } : note
        )
      );
    } catch (error) {
      console.error('Error updating background color:', error);
      // Handle error as needed, e.g., show a notification to the user
    }
  };
  

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, noteColor}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

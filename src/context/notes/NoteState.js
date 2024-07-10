import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitials = [
    {
      "_id": "668d4e2c40656a4c435c6797",
      "user": "667aa9a16b88742648487c34",
      "title": "new note",
      "description": "try ok",
      "tag": "personal",
      "date": "2024-07-09T14:50:20.270Z",
      "__v": 0
    },
    {
      "_id": "668d4e4040656a4cc435c679a",
      "user": "667aa9a16b88742648487c34",
      "title": "new note2",
      "description": "try ok1",
      "tag": "personal",
      "date": "2024-07-09T14:50:40.546Z",
      "__v": 0
    },
    {
      "_id": "668d4e4640656a4c43c5c679c",
      "user": "667aa9a16b88742648487c34",
      "title": "new note3",
      "description": "try ok3",
      "tag": "personal",
      "date": "2024-07-09T14:50:46.043Z",
      "__v": 0
    },
    {
      "_id": "668zd4e4a40656a4c435c679e",
      "user": "667aa9a16b88742648487c34",
      "title": "new note4",
      "description": "try ok4",
      "tag": "personal",
      "date": "2024-07-09T14:50:50.956Z",
      "__v": 0
    }
  ] 
  const [notes, setNotes] = useState(notesInitials)
  // add a note 
  const addNote = (title, description, tag) =>{
    console.log("adding a note ")
    const note = {
      "_id": "111",
      "user": "667aa9a16b88742648487c34",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-07-09T14:50:50.956Z",
      "__v": 0
    }
    return setNotes(notes.concat(note))
  }
  // delete a note
  const deleteNote = () =>{

  }

  //edit a note
  const editNote = () =>{
    
  }

  return (
    <NoteContext.Provider value={{notes, addNote}}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
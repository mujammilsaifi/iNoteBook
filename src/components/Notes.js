import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";

const Notes = () => {
    const context=useContext(noteContext)
    const {notes}=context;
  return (
    
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note)=>{
            return <NotesItem note={note} />
        })}
      </div>
  );
};
export default Notes;
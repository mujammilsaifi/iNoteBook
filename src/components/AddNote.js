
import React, { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleAdd = (e) => {
    // e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})//for clear the input field by value
    props.showAlert("Added note Successfully","success")
  };
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
      <h1>Add Your Notes Here</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title" value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description" onChange={onChange}
            name="description" value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag" onChange={onChange}
            name="tag" value={note.tag}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleAdd}>
          Add to Note
        </button>
      </form>
    </div>
  );
};
export default AddNote;

import React,{useContext,useEffect,useRef,useState} from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";
import {useNavigate} from 'react-router-dom';
const Notes = (props) => {
  let history=useNavigate();
    const context=useContext(noteContext)
    const {notes,getAll,editNote}=context;
    useEffect(() => {
      if(localStorage.getItem('token')){
        getAll()
      }
      else{
        history('/login');

      }
      // eslint-disable-next-line
    }, [])
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const ref=useRef(null)
  const refclose=useRef(null)//for close modul
  const updateNote=(currentNode)=>{
        ref.current.click()
        setNote({id:currentNode._id ,etitle:currentNode.title,edescription:currentNode.description,etag:currentNode.tag})
        
  }
  
  const handleUpdate = (e) => {
    
    // console.log("update is clicked",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click()
    props.showAlert("Updated Successfully","success")
  };
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert= {props.showAlert}/>
      
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Changes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* ----------------------form-------------- */}
            <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={note.etitle}
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
            id="edescription" onChange={onChange}
            name="edescription"
            value={note.edescription}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag" onChange={onChange}
            name="etag"
            value={note.etag}
          />
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length <5} onClick={handleUpdate} type="button" className="btn btn-primary">Update Changes</button>
            </div>
          </div>
        </div>
      </div>
        <div className="row my-3">
          <h1>Your Notes</h1>
          {notes.map((note)=>{
              return <NotesItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          })}
        </div>
    </>
  );
};
export default Notes;
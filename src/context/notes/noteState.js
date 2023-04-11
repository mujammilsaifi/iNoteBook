import React,{useState} from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    let host="http://localhost:5000"
    const noteInitial=[ ]
    const [notes, setNotes] = useState(noteInitial);

    // Add Note 
    const getAll= async()=>{
        // FETCH API
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            
          });
          const json=await response.json()
        //   console.log(json)
          setNotes(json)
    }

        // Add Note here
        const addNote= async(title,description,tag)=>{
            // FETCH API
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tag}), 
              });
            const json=await response.json();
            setNotes(notes.concat(json))
            // console.log(json)
        }
        // Delete Note
        const deleteNote=async (id)=>{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
               
              });
              
              return response
            //   const json=await response.json()
            //   console.log(json)
        }
        //Edit Note
        const editNote= async (id,title,description,tag)=>{
            // API FETCH IN EDIT NOTE
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tag}), 
              });
            const json= response.json();
            console.log(json)
            let updatedNode= JSON.parse(JSON.stringify(notes))
            // update details here
            for (let index = 0; index < updatedNode.length; index++) {
                const element = updatedNode[index];
                if(element._id===id){
                    updatedNode[index].title=title
                    updatedNode[index].description=description
                    updatedNode[index].tag=tag
                    break;
                }                
            }
            setNotes(updatedNode)
        }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAll}}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState
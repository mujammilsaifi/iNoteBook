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
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjg2OTE2ODA1NzdhZDE1YTNkYjY0In0sImlhdCI6MTY3NzUxMTk1MX0.jzI7DdgGh5vy44o3wuiLX29Nw_yblL3Wb2boimPYrvM"
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
                  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjg2OTE2ODA1NzdhZDE1YTNkYjY0In0sImlhdCI6MTY3NzUxMTk1MX0.jzI7DdgGh5vy44o3wuiLX29Nw_yblL3Wb2boimPYrvM"
                },
                body: JSON.stringify({title,description,tag}), 
              });
            const json=await response.json();
          //  let note={
          //       "_id": "63fce4ad6161d80d82695552e75d",
          //       "user": "63fb8691680577ad15a3db64",
          //       "title": title,
          //       "description": description,
          //       "tag": tag,
          //       "date": "2023-02-27T17:13:17.572Z",
          //       "__v": 0
          //       } ; 
            setNotes(notes.concat(json))
            // console.log(json)
        }
        // Delete Note
        const deleteNote=async (id)=>{
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjg2OTE2ODA1NzdhZDE1YTNkYjY0In0sImlhdCI6MTY3NzUxMTk1MX0.jzI7DdgGh5vy44o3wuiLX29Nw_yblL3Wb2boimPYrvM"
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
                  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYjg2OTE2ODA1NzdhZDE1YTNkYjY0In0sImlhdCI6MTY3NzUxMTk1MX0.jzI7DdgGh5vy44o3wuiLX29Nw_yblL3Wb2boimPYrvM"
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
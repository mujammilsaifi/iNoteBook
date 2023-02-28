import React,{useState} from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
   const noteInitial=[
            {
            "_id": "63fcd3b34c8645a5cc7aefe4",
            "user": "63fb8691680577ad15a3db64",
            "title": "This is testing purpose",
            "description": "this is my notes",
            "tag": "follow me",
            "date": "2023-02-27T16:00:51.270Z",
            "__v": 0
            },
            {
            "_id": "63fce4ad11d80d826952e75d",
            "user": "63fb8691680577ad15a3db64",
            "title": "This is test success",
            "description": "this is your notes",
            "tag": "don't follow",
            "date": "2023-02-27T17:13:17.572Z",
            "__v": 0
            },  
            {
                "_id": "63fcd3b34c8645a5cc7aefe4",
                "user": "63fb8691680577ad15a3db64",
                "title": "This is testing purpose",
                "description": "this is my notes",
                "tag": "follow me",
                "date": "2023-02-27T16:00:51.270Z",
                "__v": 0
                },
                {
                "_id": "63fce4ad11d80d826952e75d",
                "user": "63fb8691680577ad15a3db64",
                "title": "This is test success",
                "description": "this is your notes",
                "tag": "don't follow",
                "date": "2023-02-27T17:13:17.572Z",
                "__v": 0
                },  
                {
                    "_id": "63fcd3b34c8645a5cc7aefe4",
                    "user": "63fb8691680577ad15a3db64",
                    "title": "This is testing purpose",
                    "description": "this is my notes",
                    "tag": "follow me",
                    "date": "2023-02-27T16:00:51.270Z",
                    "__v": 0
                    },
                    {
                    "_id": "63fce4ad11d80d826952e75d",
                    "user": "63fb8691680577ad15a3db64",
                    "title": "This is test success",
                    "description": "this is your notes",
                    "tag": "don't follow",
                    "date": "2023-02-27T17:13:17.572Z",
                    "__v": 0
                    },  
        ]
        const [notes, setNotes] = useState(noteInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState
import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all note
    const getNotes = async () => {
        //TODO Api call

        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWEyMmRjN2IwNWRhYmJmMDI2ODA1In0sImlhdCI6MTYzNDY0MDQyOX0.vxb6oNhfqmc0p5t-r8A48ojasrm1O0nr3jgKqlk0ejU"
            },

        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }


    //Add a note
    const addNote = async (title, description, tag) => {
        //TODO Api call

        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWEyMmRjN2IwNWRhYmJmMDI2ODA1In0sImlhdCI6MTYzNDY0MDQyOX0.vxb6oNhfqmc0p5t-r8A48ojasrm1O0nr3jgKqlk0ejU"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note =await response.json();
        
        setNotes(notes.concat(note))

        console.log("Adding a new note");
        
    }
    //Delete a note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWEyMmRjN2IwNWRhYmJmMDI2ODA1In0sImlhdCI6MTYzNDY0MDQyOX0.vxb6oNhfqmc0p5t-r8A48ojasrm1O0nr3jgKqlk0ejU"
            },

        });
        const json = response.json();
        console.log(json)

        console.log("Deleting a note");
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZWEyMmRjN2IwNWRhYmJmMDI2ODA1In0sImlhdCI6MTYzNDY0MDQyOX0.vxb6oNhfqmc0p5t-r8A48ojasrm1O0nr3jgKqlk0ejU"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json =await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <noteContext.Provider value={{ notes, setNotes, addNote,editNote, getNotes, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;
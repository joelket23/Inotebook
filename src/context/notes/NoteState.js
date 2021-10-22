import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial =[
        {
          "_id": "617176984a7a2693bae8d6ac",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Early bird",
          "description": "In this sanem is top rank she is absolutly best. My best scene is photoshoot and when she scremming on jan devit. Also that cooking challange is best.",
          "tag": "In top",
          "__v": 0
        },
        {
          "_id": "617176e04a7a2693bae8d6b0",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Everywhere I go",
          "description": "This is my best series where selin is at top performer. I always like selin performer and she is best in acting 23 according to me the way she talk is best.",
          "tag": "In top",
          "__v": 0
        },
        {
          "_id": "617176e04a7a2693bae8d6b0",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Everywhere I go",
          "description": "This is my best series where selin is at top performer. I always like selin performer and she is best in acting 23 according to me the way she talk is best.",
          "tag": "In top",
          "__v": 0
        },
        {
          "_id": "617176e04a7a2693bae8d6b0",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Everywhere I go",
          "description": "This is my best series where selin is at top performer. I always like selin performer and she is best in acting 23 according to me the way she talk is best.",
          "tag": "In top",
          "__v": 0
        },
        {
          "_id": "617176e04a7a2693bae8d6b0",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Everywhere I go",
          "description": "This is my best series where selin is at top performer. I always like selin performer and she is best in acting 23 according to me the way she talk is best.",
          "tag": "In top",
          "__v": 0
        },
        {
          "_id": "617176e04a7a2693bae8d6b0",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Everywhere I go",
          "description": "This is my best series where selin is at top performer. I always like selin performer and she is best in acting 23 according to me the way she talk is best.",
          "tag": "In top",
          "__v": 0
        },
        {
          "_id": "617176e04a7a2693bae8d6b0",
          "user": "616ea22dc7b05dabbf026805",
          "title": "Everywhere I go",
          "description": "This is my best series where selin is at top performer. I always like selin performer and she is best in acting 23 according to me the way she talk is best.",
          "tag": "In top",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;
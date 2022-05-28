import React from "react";
import Sidebar from "./components/Sidebar";
import MDEditor from "@uiw/react-md-editor";
import { nanoid } from "nanoid";
import "./styles/reset.css"
import "./styles/styles.css"

function App() {
  const vpHeight = window.innerHeight - 40;

  const [value, setValue] = React.useState("**Hello world!!!**");
  const [notes, setNotes] = React.useState([]);
  const [currentNote, setCurrentNote] = React.useState();

  function addNote() {
    setNotes([...notes, {
      noteID: nanoid(),
      text: value
    }])
  }

  function displayNote(noteID) {
    setCurrentNote(noteID)
    for(let i = 0; i < notes.length; i++) {
      if(notes[i].noteID === noteID) {
        setValue(notes[i].text)
      }
    }
  }

  function delNote(currentNote) {
    let answer = window.confirm("Delete note?")

    if(answer) {
      let newArr = []
      for(let i = 0; i < notes.length; i++) {
        if(notes[i].noteID !== currentNote) {
          newArr.push(notes[i])
        }
      }
      setNotes(newArr)
    } else {
      console.log("note was not deleted")
    }

  }

  return (
    <>
      <div className="btnrow">
        <button onClick={addNote}>Save note</button>
        <button onClick={() => delNote(currentNote)}>Delete note</button>
      </div>

      <div className="row vh-100">
        <div className="col-2">
          <Sidebar 
            notes = {notes}
            handleClick = {displayNote}
          />
        </div>
        <div className="col-10">
          <MDEditor 
            value={value}
            height={vpHeight}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App;

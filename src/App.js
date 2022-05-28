import React from "react";
import Sidebar from "./components/Sidebar";
import MDEditor, { title } from "@uiw/react-md-editor";
import { nanoid } from "nanoid";
import "./styles/reset.css"
import "./styles/styles.css"


function App() {
  const vpHeight = window.innerHeight - 40;

  const [value, setValue] = React.useState({
    text: "** Hello world!! **",
    title: "First Note"
  })
  const [notes, setNotes] = React.useState([]);
  const [currentNote, setCurrentNote] = React.useState();

  function handleChange(event) {
    setValue(prevValue => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value
      }
    })
  }

  function addNote() {
    setNotes([...notes, {
      noteID: nanoid(),
      text: value.text,
      title: value.title
    }])
  }

  function displayNote(noteID) {
    setCurrentNote(noteID)
    for(let i = 0; i < notes.length; i++) {
      if(notes[i].noteID === noteID) {
        setValue(prevValue => {
          return {
            ...prevValue,
            text: notes[i].text,
            title: notes[i].title
          }
        })
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
        <input
          type="text"
          placeholder="Note Title"
          name="title"
          onChange={handleChange}
          value={value.title}
        />
      </div>

      <div className="row vh-100">
        <div className="col-2 pe-0">
          <Sidebar 
            notes = {notes}
            handleClick = {displayNote}
          />
        </div>
        <div className="col-10 ps-0">
          <MDEditor 
            name="text"
            value={value.text}
            height={vpHeight}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  )
}

export default App;

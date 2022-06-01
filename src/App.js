import React from "react";
import Sidebar from "./components/Sidebar";
import MDEditor from "@uiw/react-md-editor";
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
  const [darkMode, setDarkMode] = React.useState(false);

  function toggle() {
    setDarkMode(prevMode => !prevMode)
  }

  React.useEffect(() => {
    let notesArr = JSON.parse(localStorage.getItem("notes"));
    if (notesArr) {
      for (let i = 0; i < notesArr.length; i++) {
        console.log(notesArr[i])
        setNotes(prevNotes => [...prevNotes, notesArr[i]])
      }
    }
  }, [])

  React.useEffect(() => {
    console.log(notes)
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function addNote() {
    let noteObj = {
      noteID: nanoid(),
      text: value.text,
      title: value.title
    }
    setNotes([...notes, {
      noteID: noteObj.noteID,
      text: noteObj.text,
      title: noteObj.title
    }])
  }

  function displayNote(noteID) {
    setCurrentNote(noteID)
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].noteID === noteID) {
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

    if (answer) {
      let newArr = []
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].noteID !== currentNote) {
          newArr.push(notes[i])
        }
      }
      setNotes(newArr)
      localStorage.setItem("notes", JSON.stringify(newArr))
      setValue(prevValue => {
        return {
          text: "",
          title: ""
        }
      })
    } else {
      console.log("note was not deleted")
    }
  }

  return (
    <div className={darkMode ? "dark" : "light"}
      data-color-mode={darkMode ? "dark" : "light"}
    >
      <div className="row">
        <div className="col-2 pe-0 pt-2 sideBarCol">
          <Sidebar
            notes={notes}
            handleClick={displayNote}
            mode={darkMode}
          />
        </div>
        <div className="col-10">
          <div className="row btnRow ps-2">
            <h1 className="title text-center">Notes App</h1>
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Note Title"
              name="title"
              onChange={(e) => setValue(prevValue => {
                return {
                  ...prevValue,
                  title: e.target.value
                }
              })}
              value={value.title}
            />
            <button className="btn btn-success mx-1 mb-1" onClick={addNote}>Save note</button>
            <button className=" btn btn-danger mx-1 mb-1" onClick={() => delNote(currentNote)}>Delete note</button>
            <button className="btn btn-dark mx-1 mb-1" onClick={toggle}>Dark mode</button>
          </div>
          <MDEditor
            value={value.text}
            height={vpHeight}
            onChange={(val) => {
              setValue(prevValue => {
                return {
                  ...prevValue,
                  text: val
                }
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App;
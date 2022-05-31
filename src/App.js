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
    for (let i = 0; i <= localStorage.length; i++) {
      let note = JSON.parse(localStorage.getItem(i));
      if(note !== null){
        console.log(note)
        setNotes(prevNotes => [...prevNotes, note])
      }
    }
  }, [])

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
    localStorage.setItem(localStorage.length, JSON.stringify(noteObj))
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
        } else {
          localStorage.removeItem(i)
        }
      }
      setNotes(newArr)
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
      <div className="btnrow mb-2">
        <h1 className="title text-center">Title</h1>
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
        <button className="btn btn-success" onClick={addNote}>Save note</button>
        <button className=" btn btn-danger" onClick={() => delNote(currentNote)}>Delete note</button>
        <button className="btn btn-dark" onClick={toggle}>Dark mode</button>
      </div>

      <div className="row vh-100">
        <div className="col-2 pe-0">
          <Sidebar
            notes={notes}
            handleClick={displayNote}
            mode={darkMode}
          />
        </div>
        <div className="col-10 ps-0">
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
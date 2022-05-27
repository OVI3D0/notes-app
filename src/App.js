import React from "react";
import Sidebar from "./components/Sidebar";
import MDEditor from "@uiw/react-md-editor";
import "./styles/reset.css"
import "./styles/styles.css"

function App() {
  const vpHeight = window.innerHeight - 40;

  const [value, setValue] = React.useState("**Hello world!!!**");
  const [notes, setNotes] = React.useState([]);

  function addNote() {
    setNotes([...notes, {
      noteID: notes.length + 1,
      text: value
    }])
    console.log(value);
  }

  function displayNote(id) {
    setValue(notes[id - 1].text)
  }

  return (
    <>
      <div className="btnrow">
        <button onClick={addNote}>button</button>
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

import React from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import "./styles.css"

function App() {
  return (
    <>
      <div className="container">
        <Sidebar />
        <Editor />
      </div>
    </>
  )
}

export default App;

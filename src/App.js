import React from "react";
import Sidebar from "./components/Sidebar";
import MDEditor from "@uiw/react-md-editor";
import "./styles/reset.css"
import "./styles/styles.css"

function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const vpHeight = window.innerHeight;
  return (
    <>
      <div className="row vh-100">
        <div className="col-2">
          <Sidebar />
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

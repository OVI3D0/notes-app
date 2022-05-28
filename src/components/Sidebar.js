import React from "react";
import "../styles/sideBar.css";

export default function Sidebar(props) {
    let notesArr = props.notes;
    const noteMap = notesArr.map(item => {
        return (
            <div 
                key={item.noteID} 
                id={item.noteID}
                onClick={() => props.handleClick(item.noteID)}
                className="sideBarDiv"
            >
                 <p>Note {item.noteID}</p>   
            </div>
        )
    })

    let bar = notesArr.length > 0 ? <div>{noteMap}</div> : <h1>No notes!!</h1>;

    return (
        <>
            {bar}
        </>
    )
}
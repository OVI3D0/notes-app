import React from "react";
import "../styles/sideBar.css";

export default function Sidebar(props) {
    let notesArr = props.notes;
    const noteMap = notesArr.map(item => {
        return (
            <div 
                key={item.noteID}
                onClick={() => props.handleClick(item.noteID)}
                className={`${props.mode ? "dark" : "light"} sideBarDiv align-items-center d-flex`}
            >
                 {item.title}   
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
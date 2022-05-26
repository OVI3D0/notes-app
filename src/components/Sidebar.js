import React from "react"

export default function Sidebar(props) {
    let notesArr = props.notes;
    
    const noteMap = notesArr.map(item => {
        return (
            <div key={item.noteID}>{item.text}</div>
        )
    })

    let bar = notesArr.length > 0 ? <div>{noteMap}</div> : <h1>No notes!!</h1>;

    return (
        <>
            {bar}
        </>
    )
}
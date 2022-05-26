import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function Editor () {
    const [value, setValue] = React.useState("# Type your markdown note's title here");

    return (
        <>
            <MDEditor 
                value={value}
                onChange={setValue}
            />
            <MDEditor.Markdown source={value} />
        </>
    )
}
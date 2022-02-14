import React, { useState } from "react";

export const XFileReder = (props) => {
    const {className , setNewImage} = props;
    
    const onFileChange = (event) => {
        console.log(event)
        const file = event.target.files[0];
        const fileRider = new FileReader();
        fileRider.onloadend = ()=> {
            setNewImage(fileRider.result);
        }
        fileRider.readAsDataURL(file);
    }
    return (
        <input
            className={className || "form-control"}
            type="file"
            onChange = {e => onFileChange(e)}
        />
    )
};

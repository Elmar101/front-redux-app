import React from 'react'
import XSippiner from './XSippiner';

export const XButtonWithProgress = (props) => {
  const {className, disabled, text, pendingApiCall, onClick} = props;
  return (
    <button 
      className={className || "btn btn-primary"}
      onClick = {onClick}
      disabled = {disabled}

    >
      {pendingApiCall && <XSippiner/>}
      {text}
    </button>
  )
}

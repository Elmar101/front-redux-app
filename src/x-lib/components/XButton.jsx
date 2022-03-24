import React from 'react'
import Button from "@mui/material/Button";
import XSippiner from './XSippiner';

export const XButton = (props) => {
    const { text , disabled , pendingApiCall, type , color, variant,onClick} = props;
    return (
        <Button
          type={type || "button"}
          variant={variant || "contained"}
          color={color || "primary"}
          disabled={disabled}
          onClick = {onClick}
      >
        {pendingApiCall && <XSippiner textColor = "text-light" />}
          {text}
      </Button>
    )
}


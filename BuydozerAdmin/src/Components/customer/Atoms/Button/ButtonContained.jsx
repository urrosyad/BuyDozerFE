import { Button, styled } from '@mui/material';
import React from 'react'

const ButtonContained = ({onClick, text, primaryColor, secondColor, hoverColor, width, height, fz}) => {
    const StyleButton = styled(Button)(({}) => ({ 
              width: width,
              height: height,
              borderRadius: "10px",
              color: primaryColor,
              border: `2px solid ${secondColor}` ,
              backgroundColor: secondColor,
              fontSize: fz,
              ":hover": {
                backgroundColor: hoverColor,
                color: primaryColor,
                border: `2px solid ${hoverColor}`,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
              }
            }));
  return (
          <StyleButton type='button' onClick={onClick} >
              {text}
          </StyleButton>
  )
}

export default ButtonContained

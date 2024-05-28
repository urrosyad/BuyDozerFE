import { Button, styled } from '@mui/material';

const ButtonContained = (props) => {
  const { onClick, icon = "", text, primaryColor, secondColor, hoverColor, width, height, fz } = props

  const StyleButton = styled(Button)(({ }) => ({
    width: width,
    height: height,
    borderRadius: "10px",
    color: primaryColor,
    border: `2px solid ${secondColor}`,
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
      {icon}
      {text}
    </StyleButton>
  )
}

export default ButtonContained

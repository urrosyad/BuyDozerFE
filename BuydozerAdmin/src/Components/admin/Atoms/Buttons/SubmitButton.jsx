import styled from '@emotion/styled';
import { Button } from '@mui/material';
import theme from '@src/theme'
import React from 'react'

const SubmitButton = ({onSubmit}) => {

  const SubmitButton = styled(Button)(({ theme }) => ({
    width: "20%",
    height: "45px",
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "  5px 40px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: `2px solid ${theme.palette.primary.main}`
    },
  }));

  return (
          <SubmitButton type="button" onClick={onSubmit} variant='outlined'>
             Submit
          </SubmitButton>
  )
}

export default SubmitButton
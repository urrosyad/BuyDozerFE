import React from 'react'
import { Button, styled } from '@mui/material';
import theme from '@src/theme';

const CancelButton = ({ onClose }) => {
      const CancelButton = styled(Button)(({ theme }) => ({
          width: "20%",
          height: "45px",
          color: theme.palette.error.main,
          borderColor: theme.palette.error.main,
          border: "2px solid",
          padding: "  5px 40px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.primary.contrastText,
            border: `2px solid ${theme.palette.error.main}`
          },
        }));
  return (
          <CancelButton type='button' onClick={onClose}>Batal</CancelButton>
  )
}

export default CancelButton
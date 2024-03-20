import React, { useState } from 'react'
import {
  Box, IconButton, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Divider, TextField, Button,
       } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import { styled } from '@mui/material'

const DeleteButton = () => {
  const [open, isOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const StylingContent = styled(DialogContent)(({ theme }) => ({
    overflowY: 'auto',
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#EEF2FF",
    },
  }));


  const SubmitButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    border: "2px solid",
    padding: "  5px 40px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: "2px solid",
    },
  }));

  const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    border: "2px solid",
    padding: "  5px 40px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.primary.contrastText,
      border: "2px solid",
    },
  }));


  return (
    <>
      <Box>
        <IconButton color='error'>
          <DeleteRounded fontSize='small' />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: "20px" }, }}>
      <DialogTitle variant="h4" sx={{
         width: "500px", fontWeight: "medium" }}
         >
          Hapus Unit
      </DialogTitle> 
      <Divider sx={{ width: "90%", alignSelf: "center" }} />
      Stl
      </Dialog>
    </>
  )
}

export default DeleteButton
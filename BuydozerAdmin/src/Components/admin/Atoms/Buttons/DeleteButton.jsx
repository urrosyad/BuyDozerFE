import React, { useState } from 'react'
import {
  Box, IconButton, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Divider, TextField, Button,
       } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import { styled } from '@mui/material'
import theme from '../../../../theme'

const DeleteButton = () => {
  const [open, setIsOpen] = useState(false)

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
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


  const CancelButton = styled(Button)(({ theme }) => ({
    width: "25%",
    height: "30px",
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

  const DelButton = styled(Button)(({ theme }) => ({
    width: "25%",
    height: "30px",
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
    <>
      <Box>
        <IconButton onClick={handleClickOpen} color='error'>
          <DeleteRounded style={{fontSize: "16px"}} />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { width: "450px", height: "280px", borderRadius: "20px" }, }}>
      <DialogTitle variant="h5" sx={{width: "100%", fontWeight: "medium" }}>
          Hapus Unit
      </DialogTitle> 
      <Divider sx={{ width: "90%", alignSelf: "center" }} />
      <DialogContent sx={{display: "flex", flexDirection: 'column', gap: "20px", overflowY:"hidden"}}>
        <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: theme.palette.primary.main }} >
          Apakah anda yakin untuk menghapus Unit #unit?
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: theme.palette.primary.main }} >
          Hapus unit akan mengakibatkan hilangnya data transaksi unit terkait!
        </Typography>
      </DialogContent>
      <Divider sx={{ width: "90%", alignSelf: "center", marginTop: "20px" }} />
        <DialogActions sx={{ margin: "10px 23px", gap: "2px" }}>
          <DelButton type="submit" onClick={handleClose}>Hapus</DelButton>
          <CancelButton onClick={handleClose}>Batal</CancelButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteButton
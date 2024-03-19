import React, { useState } from 'react'
import {
  Box, IconButton, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Divider, TextField, Button,
} from '@mui/material'
import { BorderColorRounded } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import theme from '../../../theme'

const EditButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const labelInput = [
    { label: "Nama Unit", id: "unitName", type: "text" },
    { label: "Brand Unit", id: "unitBrand", type: "text" },
    { label: "Ketersediaan Unit", id: "qtyUnit", type: "number" },
    { label: "Harga Beli", id: "buyPrice", type: "number" },
    { label: "Harga Sewa", id: "sellPrice", type: "number" },
    { label: "Foto Unit", id: "imgUnit", type:"file",},
    { label: "Foto Brand", id: "imgBrand", type: "file"},
  ]


  const StylingField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #EEF2FF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2A6DD0",
      },
      "& input[type='number']": {
        "-moz-appearance": "textfield",
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "&[type=number]": {
          "-moz-appearance": "textfield",
        },
      },

    },
  }));

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
    padding: "  5px 4px",
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
        <IconButton color='warning' onClick={handleClickOpen}>
          <BorderColorRounded fontSize='small' />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: "20px", width: "500px"}}}>
        <DialogTitle variant="h4" sx={{ fontWeight: "medium" }}>Edit Unit</DialogTitle>
        <Divider sx={{ width: "90%", alignSelf: "center" }} />
        <StylingContent>
          {labelInput.map((data, index) => (
            <div key={index}>
              <DialogContentText marginBottom="5px">
                <Typography variant='h6'>
                  {data.label}
                </Typography>
              </DialogContentText>
              { data.type === "file" ? (
                <>
                <img src="" alt={`ini nanti ${data.label}`}
                style={{ width: "100px", height: "100px", objectFit: 'cover', borderRadius: "10px", border: "solid 2px #193D71", margin:"5px 0px" }} 
                />
                <StylingField id={data.id} type={data.type} variant="outlined" size='small'
                sx={{
                  marginBottom: "10px"
                }} />
                </>
              ) : (
              <StylingField id={data.id} type={data.type} variant="outlined" size='small'
                sx={{
                  marginBottom: "10px"
                }} />
              )}
              
            </div>
          ))}
        </StylingContent>
        <DialogActions sx={{ margin: "10px 23px", gap: "10px" }}>
          <SubmitButton type="submit" variant='outlined'>Submit</SubmitButton>
          <CancelButton onClick={handleClose}>Batal</CancelButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditButton
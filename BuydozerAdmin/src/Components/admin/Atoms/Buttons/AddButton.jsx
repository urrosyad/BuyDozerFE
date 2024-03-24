import React, { Component, useState } from 'react'
import { Card, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Divider, Grid } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import theme from '../../../../theme'
import { AddCircleOutlineOutlined, UploadFileRounded } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const AddButton = ({ }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const labelInput = [
    { label: "Nama Unit", id: "unitName", value: "", type: "text" },
    { label: "Brand Unit", id: "unitBrand", value: "", type: "text" },
    { label: "Ketersediaan Unit", id: "qtyUnit", value: "", type: "number" },
    { label: "Deskripsi Unit", id: "descUnit", value: "", type: "textarea" },
    { label: "Harga Beli", id: "buyPrice", value: "", type: "number" },
    { label: "Harga Sewa", id: "sellPrice", value: "", type: "number" },
    { label: "Foto Unit", id: "imgUnit", value: "", type: "file" },
    { label: "Foto Brand", id: "imgBrand", value: "", type: "file" },
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

  const StylingGrid = styled(Grid)(({ theme }) => ({
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

  const StylingTextarea = styled(TextareaAutosize)({
    width: '100%',
    padding: "5px 5px 50px 5px",
    border: '1px solid #EEF2FF',
    borderRadius: '5px',
    backgroundColor: theme.palette.primary.contrastText,
    boxSizing: 'border-box',
    fontFamily: "Rubik, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    '&:hover': {
      border: '1px solid black',
    },
    '&:focus': {
      border: '2px solid #2A6DD0',
      outline: 'none',
    },
    resize: 'none',
    fontSize: '16px',
    overflowY: "auto"
  });


  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          transition: "all 0.1s",
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <Button sx={{
          width: "25vh", fontWeight: theme.typography.fontWeightMedium,
          ":hover": {
            color: theme.palette.primary.contrastText,
          }
        }}
          startIcon={<AddCircleOutlineOutlined />}
          onClick={handleClickOpen}
        >
          Tambah Unit
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: "20px" } }}>
        <DialogTitle variant="h4" sx={{ width: "500px", fontWeight: "medium" }}>Tambah Unit</DialogTitle>
        <Divider sx={{ width: "93%", alignSelf: "center", marginBottom: "20px" }} />
        <StylingGrid container spacing={2} sx={{ padding: "10px 20px" }}>
          <Grid item xs={6}>
            {labelInput.slice(0, Math.ceil(labelInput.length / 2)).map((data) => (
              <div key={data.id}>
                <DialogContentText>
                  <Typography variant='h6'>
                    {data.label}
                  </Typography>
                </DialogContentText>
                {data.type === "textarea" ? (
                  <StylingTextarea
                    id={data.id}
                    maxRows={1}
                  />
                ) : (
                  <StylingField
                    id={data.id}
                    type={data.type}
                    variant="outlined"
                    size='small'
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                  />
                )}
              </div>
            ))}
          </Grid>
          <Grid item xs={6}>
            {labelInput.slice(Math.ceil(labelInput.length / 2)).map((data) => (
              <div key={data.id}>
                <DialogContentText>
                  <Typography variant='h6'>
                    {data.label}
                  </Typography>
                </DialogContentText>
                <StylingField
                  id={data.id}
                  type={data.type}
                  variant="outlined"
                  size='small'
                  sx={{ marginBottom: "10px" }}
                />
              </div>
            ))}
          </Grid>
        </StylingGrid>
        <DialogActions sx={{margin: "10px 23px", gap: "10px" }}>
          <SubmitButton type="submit" variant='outlined'>Submit</SubmitButton>
          <CancelButton onClick={handleClose}>Batal</CancelButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddButton
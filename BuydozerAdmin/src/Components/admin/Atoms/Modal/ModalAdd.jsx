import React, { Component, useState } from 'react'
import { Typography, Button, Dialog, DialogTitle, DialogContentText, TextField, DialogActions, Divider, Grid, styled } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import theme from '../../../../theme'



const ModalAdd = ({ onClose, isOpen , labelInput}) => {
        
        
          // const labelInput = [
          //   { label: "Nama Unit", id: "unitName", value: "", type: "text" },
          //   { label: "Brand Unit", id: "unitBrand", value: "", type: "text" },
          //   { label: "Ketersediaan Unit", id: "qtyUnit", value: "", type: "number" },
          //   { label: "Deskripsi Unit", id: "descUnit", value: "", type: "textarea" },
          //   { label: "Harga Beli", id: "buyPrice", value: "", type: "number" },
          //   { label: "Harga Sewa", id: "sellPrice", value: "", type: "number" },
          //   { label: "Foto Unit", id: "imgUnit", value: "", type: "file" },
          //   { label: "Foto Brand", id: "imgBrand", value: "", type: "file" },
          // ]
        
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
            width: "30%",
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
        
          const CancelButton = styled(Button)(({ theme }) => ({
            width: "30%",
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
        <Dialog open={isOpen} onClose={onClose} sx={{ "& .MuiPaper-root": { width: "450px", height: "480px", borderRadius: "20px"}}}>
          <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>Tambah Unit</DialogTitle>
          <Divider sx={{ width: "90%", alignSelf: "center", marginBottom: "20px" }} />
          <StylingGrid container spacing={2} sx={{ padding: "10px 20px" }}>
            <Grid item xs={6}>
              {labelInput.slice(0, Math.ceil(labelInput.length / 2)).map((data) => (
                <div key={data.id}>
                  <DialogContentText>
                    <Typography sx={{ fontSize: "14px", fontWeight: "medium" }}>
                      {data.label}
                    </Typography>
                  </DialogContentText>
                  {data.type === "textarea" ? (
                    <StylingTextarea id={data.id} maxRows={1}/>
                  ) : (
                    <StylingField id={data.id} type={data.type} variant="outlined" size='small' fullWidth sx={{ marginBottom: "10px" }}/>
                  )}
                </div>
              ))}
            </Grid>
            <Grid item xs={6}>
              {labelInput.slice(Math.ceil(labelInput.length / 2)).map((data) => (
                <div key={data.id}>
                  <DialogContentText>
                    <Typography sx={{ fontSize: "14px", fontWeight: "medium" }}>
                      {data.label}
                    </Typography>
                  </DialogContentText>
                  <StylingField id={data.id} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px", marginBottom: "10px" }}
                  />
                </div>
              ))}
            </Grid>
          </StylingGrid>
          <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
          <DialogActions sx={{ margin: "10px 23px", gap: "2px" }}>
            <SubmitButton type="submit" variant='outlined'>Submit</SubmitButton>
            <CancelButton onClick={onClose}>Batal</CancelButton>
          </DialogActions>
        </Dialog>
  )
}

export default ModalAdd
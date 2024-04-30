import React, { Component, useState } from 'react'
import { Typography, Button, Dialog, DialogTitle, DialogContentText, TextField, DialogActions, Divider, Grid, styled, FormControl, Box, DialogContent } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import theme from '@src/theme'
import SubmitButton from '../Buttons/SubmitButton'
import CancelButton from '../Buttons/CancelButton'


const ModalUnit = ({ typeModal, onClose, onSubmit, onChange, isOpen, labelInput, formik }) => {

  const textareaStyle = {
    width: '100%',
    height: '80px',
    padding: "10px 5px 50px 15px",
    border: '1px solid lightgrey',
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
  }


  return (
    <Dialog open={isOpen} onClose={onClose} sx={{
      "& .MuiPaper-root": { borderRadius: "20px" }
    }}>
      <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>{typeModal}</DialogTitle>
      <Divider sx={{ width: "90%", alignSelf: "center", marginBottom: "20px" }} />
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <FormControl sx={{ width: "95%", marginLeft: "5px" }}>
              {labelInput.slice(0, Math.ceil(labelInput.length / 2)).map((data, index) => (
                <Box key={index} style={{ marginBottom: "5px" }}>
                  <DialogContentText sx={{ fontSize: "14px", fontWeight: "medium" }}>
                    {data.label}
                  </DialogContentText>
                  {data.type === "file" && data.value
                    ?
                    <>
                      {formik.errors[data.name]
                        ? <TextField name={data.name} value={''} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} helperText={formik.errors[data.name]} error />
                        : <TextField name={data.name} value={''} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange}
                        />
                      }
                      <img src={data.value} style={{ width: "80px", height: "80px", objectFit: 'cover', borderRadius: "5px", marginTop: "2px", border: "solid 1px #193D71" }} />
                    </>
                    :
                    <>
                      {formik.errors[data.name]
                        ? <TextField name={data.name} value={data.value || ''} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} helperText={formik.errors[data.name]} error />
                        : <TextField name={data.name} value={data.value || ''} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} />
                      }
                    </>
                  }
                </Box>
              ))}
            </FormControl>
          </Grid>
          <Grid item xs={5} >
            <FormControl sx={{ width: "120%", marginRight: "5px" }}>
              {labelInput.slice(Math.ceil(labelInput.length / 2)).map((data, index) => (
                <Box key={index} style={{ marginBottom: "5px" }}>
                  <DialogContentText sx={{ fontSize: "14px", fontWeight: "medium" }}>
                    {data.label}
                  </DialogContentText>
                  {data.type === "textarea"
                    ? (
                      formik.errors[data.name]
                        ? (
                          <>
                            <TextareaAutosize style={textareaStyle} name={data.name} value={data.value || ''} type={data.type} maxRows={1} onChange={onChange} />
                            <Box sx={{ display: "flex", bgcolor: theme.palette.primary.contrastText, borderRadius: "5px", mt: "-10px", p: "5px 0px 0px 13px" }}>
                              <Typography variant='caption' color={"red"}>
                                {formik.errors[data.name]}
                              </Typography>
                            </Box>
                          </>
                        ) : (<TextareaAutosize style={textareaStyle} name={data.name} value={data.value || ''} type={data.type} maxRows={1} onChange={onChange} />))
                    : (
                      formik.errors[data.name]
                        ? (<TextField name={data.name} type={data.type} value={data.value || ''} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} helperText={formik.errors[data.name]} error />
                        ) : (<TextField name={data.name} type={data.type} value={data.value || ''} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} />))
                  }
                </Box>
              ))}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
      <DialogActions sx={{ margin: "10px 20px", gap: "2px" }}>
        <SubmitButton onSubmit={onSubmit} />
        <CancelButton onClose={onClose} />
      </DialogActions>
    </Dialog>
  )
}

export default ModalUnit
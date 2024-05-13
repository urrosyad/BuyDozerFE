import React, { Component, useState } from 'react'
import { Typography, Button, Dialog, DialogTitle, DialogContentText, TextField, DialogActions, Divider, Grid, styled, FormControl, Box, DialogContent } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import theme from '@src/theme'
import SubmitButton from '../Buttons/SubmitButton'
import CancelButton from '../Buttons/CancelButton'


const ModalPaymentConfirm
    = ({ typeModal, onClose, isOpen, labelInput, formik }) => {

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
                    <img src={formik.values.paymentConfirmationReceipt} alt="Foto Bukti Pembayaran" style={{border: "solid 1px black", width:"100%", height:"100%" }} />
                </DialogContent>
                <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
                <DialogActions sx={{ margin: "10px 20px", gap: "2px" }}>
                    <CancelButton onClose={onClose} />
                </DialogActions>
            </Dialog>
        )
    }

export default ModalPaymentConfirm

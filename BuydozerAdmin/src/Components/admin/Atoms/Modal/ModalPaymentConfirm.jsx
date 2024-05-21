import React, { Component, useState } from 'react'
import { Typography, Button, Dialog, DialogTitle, DialogContentText, TextField, DialogActions, Divider, Grid, styled, FormControl, Box, DialogContent } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import theme from '@themes/theme';
import SubmitButton from '../Buttons/SubmitButton'
import CancelButton from '../Buttons/CancelButton'


const ModalPaymentConfirm
    = ({ typeModal, onClose, isOpen, labelInput, formik, img }) => {

        return (
            <Dialog open={isOpen} onClose={onClose} sx={{
                "& .MuiPaper-root": { borderRadius: "20px" }
            }}>
                <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>{typeModal}</DialogTitle>
                <Divider sx={{ width: "90%", alignSelf: "center", marginBottom: "20px" }} />
                <DialogContent>
                    <img src={formik ? formik.values.paymentConfirmationReceipt : img} alt="Foto Bukti Pembayaran" style={{width:"100%", height:"100%" }} />
                </DialogContent>
                <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
            </Dialog>
        )
    }

export default ModalPaymentConfirm

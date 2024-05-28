import React from 'react'
import theme from '@themes/theme';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, Divider, Typography, DialogTitle } from '@mui/material';

const ModalConfirm = (props) => {
  const { isOpen, onClose, onSubmit, titleModal, messageAsk, messageConfirm, confirmText } = props

  return (
    <Dialog open={isOpen} onClose={onClose} sx={{ "& .MuiPaper-root": { width: "450px", height: "300px", borderRadius: "10px" } }}>
      <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>
        {titleModal}
      </DialogTitle>
      <Divider sx={{ width: "90%", alignSelf: "center" }} />

      <DialogContent sx={{ display: "flex", flexDirection: 'column', gap: "20px", overflowY: "hidden" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "medium", color: "#193D71" }} >
          {messageAsk}
        </Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: "thin", color: "red" }} >
          {messageConfirm}
        </Typography>
      </DialogContent>

      <Divider sx={{ width: "90%", alignSelf: "center" }} />

      <DialogActions sx={{ margin: "10px 23px", gap: "2px" }}>
        <Button 
        variant='contained' 
        color="primaryDark" sx={{ width: "20%", color:"white", borderRadius:"7px", boxShadow:"unset"}}
        onClick={onSubmit}>
          {confirmText}
        </Button>

        <Button 
        variant='outlined' 
        color="primaryDark" sx={{ width: "20%", color:"#193D71", borderRadius:"7px"}}
        onClick={onClose}>
          Batal
        </Button>
      </DialogActions>
    </Dialog>

  )

}

export default ModalConfirm
import React from 'react'
import theme from '@src/theme';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogContent, Divider, Typography, DialogTitle } from '@mui/material';

const ModalConfirm = ({ isOpen, onClose, onSubmit, nameUnit, titleModal, messageAsk, messageConfirm, submitText  }) => {

  const CancelButton = styled(Button)(({ theme }) => ({
    width: "20%",
    height: "45px",
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "  5px 40px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      border: `2px solid ${theme. palette.primary.main}`
    },
  }));

  const DelButton = styled(Button)(({ theme }) => ({
    width: "20%",
    height: "45px",
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    border: "2px solid",
    padding: "5px 40px",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.primary.contrastText,
      border: `2px solid ${theme.palette.error.main}`
    },
  }));

  return (
          <Dialog open={isOpen} onClose={onClose} sx={{ "& .MuiPaper-root": { width: "450px", height: "300px", borderRadius: "20px" }}}> 
          <DialogTitle variant="h5" sx={{width: "100%", fontWeight: "medium" }}>
              {titleModal}
          </DialogTitle> 
          <Divider sx={{ width: "90%", alignSelf: "center" }} />
          <DialogContent sx={{display: "flex", flexDirection: 'column', gap: "20px", overflowY:"hidden"}}>
            <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: theme.palette.primary.main }} >
              {messageAsk} <b>{nameUnit}?</b>
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: theme.palette.error.main}} >
              {messageConfirm}
            </Typography>
          </DialogContent>
          <Divider sx={{ width: "90%", alignSelf: "center" }} />
            <DialogActions sx={{ margin: "10px 23px", gap: "2px" }}>
              <DelButton type="button" onClick={onSubmit}>{submitText}</DelButton>
              <CancelButton onClick={onClose}>Batal</CancelButton>
            </DialogActions>
          </Dialog>
  )
}

export default ModalConfirm
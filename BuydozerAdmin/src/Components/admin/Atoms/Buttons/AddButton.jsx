import theme from '@themes/theme'
import { styled } from '@mui/material/styles'
import { TextareaAutosize } from '@mui/base'
import { Component, useState } from 'react'
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Divider, Grid } from '@mui/material'
import { AddCircleOutlineOutlined, UploadFileRounded } from '@mui/icons-material'

const AddButton = ({ onClick, addName }) => {

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
          width: "30vh", height: "5vh", fontSize: "14px", fontWeight: theme.typography.fontWeightMedium,
          ":hover": {
            color: theme.palette.primary.contrastText,
          }
        }}
          startIcon={<AddCircleOutlineOutlined style={{ fontSize: '16px' }} />}
          onClick={onClick}>
          {addName}
        </Button>
      </Box>
    </>
  )
}

export default AddButton
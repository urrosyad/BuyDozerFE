import { styled } from '@mui/material'
import { useState } from 'react'
import { DeleteRounded } from '@mui/icons-material'
import {
  Box, IconButton, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Divider, TextField, Button,
} from '@mui/material'

const DeleteButton = ({ onClick }) => {
  return (
    <>
      <Box>
        <IconButton onClick={onClick} color='error'>
          <DeleteRounded style={{ fontSize: "16px" }} />
        </IconButton>
      </Box>

    </>
  )
}

export default DeleteButton
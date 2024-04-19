import React, { useState } from 'react'
import {
  Box, IconButton, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Divider, TextField, Button,
       } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import { styled } from '@mui/material'
import theme from '../../../../theme'

const DeleteButton = ({onClick}) => {
  return (
    <>
      <Box>
        <IconButton onClick={onClick} color='error'>
          <DeleteRounded style={{fontSize: "16px"}} />
        </IconButton>
      </Box>

    </>
  )
}

export default DeleteButton
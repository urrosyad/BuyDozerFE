import React, { useState } from 'react'
import {
  Box, IconButton, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions,
  Divider, TextField, Button,
  Grid, TextareaAutosize
} from '@mui/material'
import { BorderColorRounded } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import theme from '@themes/theme'
import SubmitButton from './SubmitButton'
import CancelButton from './CancelButton'

const EditButton = ({ onClick }) => {
  return (
      <Box>
        <IconButton color='warning' onClick={onClick}>
          <BorderColorRounded style={{fontSize: "16px"}} />
        </IconButton>
      </Box>
  )
}

export default EditButton
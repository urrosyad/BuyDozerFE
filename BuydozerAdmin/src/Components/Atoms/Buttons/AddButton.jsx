import React from 'react'
import { Card, Box, Typography, Button } from '@mui/material'
import theme from '../../../theme'
import { AddCircleOutlineOutlined, PlusOneOutlined } from '@mui/icons-material'


const AddButton = () => {
  return (
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
      <Button
        sx={{
          width: "25vh",
          fontWeight: theme.typography.fontWeightMedium,
          ":hover": {
            color: theme.palette.primary.contrastText,
          },
        }}
        startIcon={<AddCircleOutlineOutlined/>}
      >
        Tambah Unit
      </Button>
    </Box>
  )
}

export default AddButton
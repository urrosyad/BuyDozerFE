import { Box, Typography } from '@mui/material'
import React from 'react'
import { flexCenter } from '@themes/commonStyles'

const ErrorPage = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", mt:"20%"}}>
          <Typography sx={{fontWeight:"100",fontSize: "14px"}}>
            Terjadi Masalah
          </Typography>
          <Typography sx={{fontWeight:"100",fontSize:"48px", color:"#193D71"}}>
            -ERROR 404-
          </Typography>

    </Box>
  )
}

export default ErrorPage
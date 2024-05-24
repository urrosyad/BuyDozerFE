import React, { useEffect } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const  navigate = useNavigate()


  return (
    <Box display={"flex"}>
      <Typography variant="h4">
        Dashboard 
      </Typography>
    </Box>
  )
}

export default Dashboard
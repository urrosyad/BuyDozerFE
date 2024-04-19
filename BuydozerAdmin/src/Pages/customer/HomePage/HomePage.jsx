import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate()
  const handle = () =>{
    navigate('/admin/dashboard')
  }
  return (
    <Box>
      HomePage
    <Button variant='outlined' onClick={handle}>Go to admin page</Button>  
    </Box>
    
  )
}

export default HomePage
import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
  return (
      <Box display={"flex"} justifyContent={'center'} alignContent={"center"} flex={1}>
         <Outlet />
      </Box>
  )
}

export default CustomerLayout
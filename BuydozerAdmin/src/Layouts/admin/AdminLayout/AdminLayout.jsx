import React from 'react'
import {Outlet}  from 'react-router-dom'
import {Sidenav}  from '../Sidenav'
import {Header} from '../Header'
import {Box} from '@mui/material'

const AdminLayout = () => {
  return (
          <Box sx={{ display: "flex", height: "auto",  overflowY: "auto", overflowX: "hidden",
          '&::-webkit-scrollbar': {
            width: '8px',
            boxShadow: "10px"
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: "#8BB9FF",
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: "#FFFFFF",
          },}}>
           <Sidenav />
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1}}>
             <Header />
             <Box>
                <Outlet />
             </Box>
            </Box>
          </Box>
  )       
}

export default AdminLayout;
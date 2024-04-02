import React from 'react'
import {Outlet}  from 'react-router-dom'
import {Sidenav}  from '../Sidenav'
import {Header} from '../Header'
import {Box} from '@mui/material'
import { PrivateRoutes } from '@routers/PrivateRoutes'

const AdminLayout = () => {
  return (
          <Box sx={{ display: "flex", height: "auto" }}>
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
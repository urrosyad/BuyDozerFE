import { Box } from '@mui/material'
import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import Navbar from '@layouts/customer/Navbar/Navbar'
import Footer from '@layouts/customer/Footer/Footer'

const CustomerLayout = () => {
  return (
      <>

        <Outlet />
      </>
  )
}

export default CustomerLayout
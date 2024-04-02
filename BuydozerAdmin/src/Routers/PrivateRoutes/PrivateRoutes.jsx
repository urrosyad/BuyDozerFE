import React, { useState } from 'react'
import { Routes, Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '@hooks/useAuth';

const PrivateRoutes = () => {
const { auth } = useAuth()
const location = useLocation()

  return (
    auth?.isLoggedIn
    ? <Outlet/>
    : <Navigate to="/" state={{ from: location }} replace/>
  ) 
  // isAuth ? <Outlet/> : <Navigate to="/" replace /> 
}
export default PrivateRoutes
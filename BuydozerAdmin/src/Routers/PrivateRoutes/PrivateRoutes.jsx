import React, { useState } from 'react'
import { Routes, Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '@hooks/useAuth';

const PrivateRoutes = ({ allowedRoles }) => {
const { auth } = useAuth()
const location = useLocation()
const userRole = auth.userRole
// console.log(userRole);

// const roleAuthorized = () => {
//   if (!userRole) return false; // Jika userRole belum di-set, tidak diizinkan masuk
//   if (allowedRoles.includes(userRole)) return true; // Jika userRole termasuk dalam allowedRoles, diizinkan
//   return false; // Jika userRole tidak termasuk dalam allowedRoles, tidak diizinkan
// };

// return (
//   roleAuthorized()
//     ? <Outlet />
//     : userRole === "admin"
//       ? <Navigate to="*" state={{ from: location }} replace />
//       : <Navigate to="/" state={{ from: location }} replace />
// );


// return(
// userRole && allowedRoles.includes(userRole)
// ? <Outlet/> 
// : userRole === 1999 
//   ? <Navigate to="*" state={{ from: location }} replace/> //ini seharusnya halaman unuthorized
//   : <Navigate to="/" state={{ from: location }} replace/>
// )
  

  return (
    auth?.isLoggedIn
    ? <Outlet/>
    : <Navigate to="/" state={{ from: location }} replace/>
  ) 

}
export default PrivateRoutes
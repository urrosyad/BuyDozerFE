import React, { useState } from 'react'
import { Routes, Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '@hooks/useAuth';

const PrivateRoutes = ({ allowedRoles }) => {
const { auth } = useAuth()
const location = useLocation()
const userRole = auth?.userRole
console.log(userRole);

// if (!auth?.isLoggedIn) {
//   // Jika pengguna belum masuk, arahkan ke halaman login
//   return <Navigate to="/login" state={{ from: location }} replace />;
// }

// if (auth?.isLoggedIn) {
//   // Cek apakah user memiliki role yang diizinkan
//   if (allowedRoles.includes(userRole)) {
//     // Jika role diizinkan, render halaman yang diminta
//     return <Outlet />;
//   } else {
//     // Jika role tidak diizinkan, arahkan ke halaman yang sesuai
//     if (userRole === 1999) {
//       return <Navigate to="/admin/dashboard" replace />;
//     } else if (userRole === 2000) { 
//       return <Navigate to="/" replace />;
//     }
//   }
// } else {
//   // Jika pengguna belum masuk, arahkan ke halaman login
//   return <Navigate to="/" state={{ from: location }} replace />;
// }
// };

  return (
    auth?.isLoggedIn
      ? <Outlet />
      : <Navigate to="/" state={{ from: location }} replace />
  ) 
}

export default PrivateRoutes
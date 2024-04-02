import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Dashboard, BuyData, RentData, UnitData, UserData, RentListData, TransactionData } from '@pages/admin';
import { HomePage, UnitPage, TransactionPage, LoginPage, RegisterPage } from '@pages/customer';
import { PrivateRoutes } from '@routers/PrivateRoutes';
import { AdminLayout } from '@layouts/admin/AdminLayout';
import { AuthProvider } from '@context/AuthProvider';


const Routers = () => {
  const [userRole, setUserRole] = useState('');
  

  return (
    <BrowserRouter>
      {/* <Box sx={{ display: "flex", height: "auto" }}> */}
      {/* <Sidenav /> */}
      {/* {userRole === 'admin' && <Sidenav />} */}
      {/* <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1}}> */}
      {/* <Header /> */}
      {/* {userRole === 'admin' && <Header onLogoutSuccess={handleLogoutSuccess}/>} */}
      
      <AuthProvider>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="buy" element={<BuyData />} />
            <Route path="rent" element={<RentData />} />
            <Route path="unit" element={<UnitData />} />
            <Route path="user" element={<UserData />} />
            <Route path="rentlist" element={<RentListData />} />
            <Route path="transaction" element={<TransactionData />} />
          </Route>
        </Route>

        <Route path="/beranda" element={<HomePage />} />
        <Route path="/unit" element={<UnitPage />} />
        <Route path="/transaksi" element={<TransactionPage />} />
        <Route path="*" element={<Box>Page Not Found</Box>} />
      </Routes>
      {/* </Box>
    </Box> */}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;
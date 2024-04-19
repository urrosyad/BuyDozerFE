import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Dashboard, BuyData, RentData, UnitData, UserData, RentListData, TransactionData } from '@pages/admin';
import { HomePage, UnitPage, TransactionPage, LoginPage, RegisterPage } from '@pages/customer';
import { PrivateRoutes } from '@routers/PrivateRoutes';
import { AdminLayout } from '@layouts/admin/AdminLayout';
import { AuthProvider } from '@context/AuthProvider';
import CustomerLayout from '@layouts/customer/CustomerLayout/CustomerLayout';

const Routers = () => {
  const [userRole, setUserRole] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="*" element={<Box justifyContent={'center'}>Page Not Found</Box>} />

          <Route path="/admin/*" element={<AdminLayout />}>
            <Route element={<PrivateRoutes allowedRoles={[1999]} />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="buy" element={<BuyData />} />
              <Route path="rent" element={<RentData />} />
              <Route path="unit" element={<UnitData />} />
              <Route path="user" element={<UserData />} />
              <Route path="rentlist" element={<RentListData />} />
              <Route path="transaction" element={<TransactionData />} />
            </Route>
          </Route>


          <Route path="/buydozer/*" element={<CustomerLayout />} >
            <Route element={<PrivateRoutes allowedRoles={[1999, 2000]} />}>
              <Route path="beranda" element={<HomePage />} />
              <Route path="unit" element={<UnitPage />} />
              <Route path="transaksi" element={<TransactionPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;
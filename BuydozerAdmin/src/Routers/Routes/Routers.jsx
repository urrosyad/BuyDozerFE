import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Dashboard, BuyData, RentData, UnitData, UserData, RentListData, TransactionData } from '@pages/admin';
import { HomePage, UnitPage, TransactionPage, LoginPage, RegisterPage, ErrorPage } from '@pages/customer';
import { PrivateRoutes } from '@routers/PrivateRoutes';
import { AdminLayout } from '@layouts/admin/AdminLayout';
import { AuthProvider } from '@context/AuthProvider';
import CustomerLayout from '@layouts/customer/CustomerLayout/CustomerLayout';
import { AllUnitPage } from '../../Pages/customer';

const Routers = () => {
  // const [userRole, setUserRole] = useState('');
  const userRole = localStorage.getItem("UserRole")
  console.log(userRole);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />

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

          <Route exact path="/" element={<HomePage />} />
          <Route path="/buydozer/*" element={<CustomerLayout />} >
              <Route path="unit" element={<UnitPage />} />
              <Route path="allunit" element={<AllUnitPage />} />
              <Route path="transaksi" element={<TransactionPage />} />
            <Route element={<PrivateRoutes allowedRoles={[1999, 2000]} />}>
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;
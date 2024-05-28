import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Dashboard, UnitData, UserData, RentListData, TransactionData, PaymentConfirmData } from '@pages/admin';
import { HomePage, UnitPage, TransactionPage, LoginPage, RegisterPage, ErrorPage, Unauthorized, AllUnitPage, UnitDetailPage, InvoicePage } from '@pages/customer';
import { PrivateRoutes } from '@routers/PrivateRoutes';
import { AdminLayout } from '@layouts/admin/AdminLayout';
import { AuthProvider } from '@context/AuthProvider';
import CustomerLayout from '@layouts/customer/CustomerLayout/CustomerLayout';


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
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route path="/admin/*" element={<AdminLayout />}>
            <Route element={<PrivateRoutes allowedRoles={[1999]} />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="paymentconfirm" element={<PaymentConfirmData />} />
              <Route path="unit" element={<UnitData />} />
              <Route path="user" element={<UserData />} />
              <Route path="rentlist" element={<RentListData />} />
              <Route path="transaction" element={<TransactionData />} />
            </Route>
          </Route>

          <Route exact path="/" element={<HomePage />} />
            <Route path="/buydozer/*" element={<CustomerLayout />} >
              <Route path="allunit" element={<AllUnitPage />} />
              <Route path="unit" element={<UnitPage />} />
              <Route path="transaksi" element={<TransactionPage />} />
              <Route path="invoice/:transactionNum" element={<InvoicePage />} />
              <Route path="unit/:nameUnit" element={<UnitDetailPage />} />
            </Route>
          {/* <Route element={<PrivateRoutes allowedRoles={[1999, 2000]} />}>
          </Route> */}

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;
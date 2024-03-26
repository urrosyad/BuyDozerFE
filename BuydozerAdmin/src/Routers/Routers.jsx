import React, { useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Sidenav } from '../Layouts/admin/Sidenav'
import { Header } from '../Layouts/admin/Header'
import { Dashboard, BuyData, RentData, UnitData, UserData, RentListData, TransactionData } from '../Pages/admin'
import { HomePage, UnitPage, TransactionPage, LoginPage } from '../Pages/customer'

const Routers = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Ambil peran pengguna dari localStorage saat aplikasi dimuat
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    }
  }, []);

  
  return (
    <BrowserRouter>
    <Box sx={{ display: "flex", height: "auto" }}>
      {/* <Sidenav /> */}
      {/* {userRole === 'admin' && <Sidenav />} */}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1}}>
        {/* <Header /> */}
        {/* {userRole === 'admin' && <Header />} */}
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/buy" element={<BuyData/>} />
          <Route path="/admin/rent" element={<RentData/>} />
          <Route path="/admin/unit" element={<UnitData/>} />
          <Route path="/admin/user" element={<UserData/>} />
          <Route path="/admin/rentlist" element={<RentListData/>} />
          <Route path="/admin/transaction" element={<TransactionData/>} />
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/unit" element={<UnitPage/>} />
          <Route path="/transaction" element={<TransactionPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
  )
}

export default Routers
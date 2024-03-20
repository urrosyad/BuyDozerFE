import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Sidenav } from '../Layouts/admin/Sidenav'
import { Header } from '../Layouts/admin/Header'
import { Dashboard, BuyData, RentData } from '../Pages/admin'
// import { BuyData } from '../Pages/admin/BuyPage'
// import { RentData } from '../Pages/admin/RentPage'
import { UnitData } from '../Pages/admin/UnitPage'
import { UserData } from '../Pages/admin/UserPage'
import { RentListData } from '../Pages/admin/RentListPage'
import { TransactionData } from '../Pages/admin/TransactionData'


const Routers = () => {

  return (
    <BrowserRouter>
    <Box sx={{ display: "flex", height: "auto" }}>
      <Sidenav />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1, 
        }}
      >
        <Header />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/buy" element={<BuyData/>} />
          <Route path="/rent" element={<RentData/>} />
          <Route path="/unit" element={<UnitData/>} />
          <Route path="/user" element={<UserData/>} />
          <Route path="/rentlist" element={<RentListData/>} />
          <Route path="/transaction" element={<TransactionData/>} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
  )
}

export default Routers
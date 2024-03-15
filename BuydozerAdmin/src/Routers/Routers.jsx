import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Sidenav } from '../Layouts/Sidenav'
import { Header } from '../Layouts/Header'
import { Dashboard } from '../Pages/DashboardPage'
import { BuyData } from '../Pages/BuyPage'
import { RentData } from '../Pages/RentPage'
import { UnitData } from '../Pages/UnitPage'
import { UserData } from '../Pages/UserPage'
import { RentListData } from '../Pages/RentListPage'
import { TransactionData } from '../Pages/TransactionData'



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
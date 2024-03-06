import react from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SideNav from "./Components/Organisms/SideNav";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import "./index.css"
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SideNav />
        <Routes>
          {/* <Route path="/" exact element={<Dashboard/>} /> */}
          {/* <Route path="/unit" element={<UnitData/>} /> */}
          {/* <Route path="/user" element={<UserData/>} /> */}
          {/* <Route path="/buy" element={<BuyData/>} /> */}
          {/* <Route path="/rent" element={<RentData/>} /> */}
          {/* <Route path="/transaction" element={<TransactionData/>} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}



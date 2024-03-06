import { useState, useEffect, useRef } from "react";
import { Sidebar, Menu, MenuItem, } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Grow,
  Paper,
  ClickAwayListener,
  Popper,
  MenuList,
  Divider
} from "@mui/material";
import theme from "../../theme";
import { useTheme } from "@emotion/react";
import { SpaceDashboardRounded, PeopleAltRounded, ReceiptLong, CommuteRounded, CreditCardRounded, WalletRounded } from "@mui/icons-material";
import MenuPage from "../Moleculs/MenuPage";


const Navbar = ({ page }) => {
  const theme = useTheme();

  return (
    <Box
      component={"div"}
      sx={{display: "flex",justifyContent: "space-between",alignItems: "center",padding: 3,boxShadow: 1,width: "100%", height: 30, border: 1}}>
      <Box flexDirection={"row"}>
        <Typography variant="h4" color={theme.palette.primary.main} sx={{ fontWeight: theme.typography.fontWeight.medium }}>
           {page}
        </Typography>
      </Box>
      <Box bgcolor={theme.palette.primary.text}>
        <Button variant="outlined" size="small" sx={{ color: theme.palette.primary.dark }}>
          <Typography variant="h8" color={theme.palette.primary.main}sx={{ fontWeight: theme.typography.fontWeight.reguler }}>
            Logout
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

const SideNav = () => {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState("Dashboard")
  useEffect(()=>{

  })

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      bgcolor={theme.palette.primary.background}
      border={1}
    >
      <Sidebar>
        <Menu style={{height: "100%", border: 1 }}>
          <Box
            sx={{
              padding: 3,
              height: 30,
              bgcolor: theme.palette.primary.background,
              justifyContent: "center",
              border: 1
            }}
          >
            
            <Typography variant="h6" sx={{ alignItems: "center", color: theme.palette.primary.main }}>
              ADMIN BRDOZER
            </Typography>
          </Box>
          <Box sx={{border:1}}>
            <MenuPage menu={"Dashboard"} icon={<SpaceDashboardRounded fontSize="small"/>} link={"/"} seleceted={isSelected} setSelected={setIsSelected}/>

            <MenuPage menu={"User"} icon={<PeopleAltRounded fontSize="small"/>} link={"/user"} seleceted={isSelected} setSelected={setIsSelected}/>
            
            <MenuPage menu={"Unit"} icon={<CommuteRounded fontSize="small"/>} link={"/unit"} seleceted={isSelected} setSelected={setIsSelected}/>
            
            <MenuPage menu={"Pembelian"} icon={<CreditCardRounded fontSize="small"/>} link={"/buy"} seleceted={isSelected} setSelected={setIsSelected}/>
            
            <MenuPage menu={"Penyewaan"} icon={<WalletRounded fontSize="small"/>} link={"/rent"} seleceted={isSelected} setSelected={setIsSelected}/>
            
            <MenuPage menu={"Transaksi"} icon={<ReceiptLong fontSize="small"/>} link={"/transaction"} seleceted={isSelected} setSelected={setIsSelected}/>
          </Box>
        </Menu>
      </Sidebar>
      <Navbar page={isSelected} />
    </Box>
  );
};

export default SideNav;

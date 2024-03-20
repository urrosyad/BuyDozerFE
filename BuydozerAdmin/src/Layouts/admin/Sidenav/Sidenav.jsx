import { useState, useEffect } from "react";
import { Sidebar, Menu} from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { SpaceDashboardRounded, PeopleAltRounded, ReceiptLong, CommuteRounded, CreditCardRounded, WalletRounded, MenuRounded, ShoppingCart, Sell } from "@mui/icons-material";
import { MenuPage } from "../../../Components/admin/Moleculs/MenuPage";

const Sidenav = () => {
  const theme = useTheme();
  const [active, setActive] = useState("/")
  
  const menuItems = [
    { menu: "Dashboard", icon: <SpaceDashboardRounded fontSize="small" />, link: "/", },
    { menu: "User", icon: <PeopleAltRounded fontSize="small" />, link: "/user", },
    { menu: "Unit", icon: <CommuteRounded fontSize="small" />, link: "/unit", },
    { menu: "Pembelian", icon: <ShoppingCart fontSize="small" />, link: "/buy", },
    { menu: "Penyewaan", icon: <WalletRounded fontSize="small" />, link: "/rent", },
    { menu: "List Sewa", icon: <Sell fontSize="small" />, link: "/rentlist", },
    { menu: "Transaksi", icon: <ReceiptLong fontSize="small" />, link: "/transaction", },
  ];

  useEffect(() => {
    const pathname = window.location.pathname;
    const menuItem = menuItems.find(item => item.link === pathname);
    if (menuItem) {
      setActive(menuItem.link);
    }
  }, []);

  return (
    <Box
      bgcolor={"#F9FAFF"}
      display={"flex"}  
      flexDirection={"column"}
      height={"100vh"}
      color={theme.palette.primary.dark}
    >
      <Sidebar>
        <Menu style={{ height: "100%" }}>
          <Box
            sx={{
              justifyContent: "space-between",
              height: "80px",
              backgroundColor: "#F9FAFF",
              color: theme.palette.primary.dark,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              paddingLeft: "18px"
            }}>
            <Box sx={{display: "flex", paddingBottom: "30px"}}>
              <MenuRounded/>
            </Box>
            <Box sx={{
              justifyContent: "flex-end",
              color: theme.palette.primary.dark,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}>
              <Typography variant="h6" fontWeight={"bold"} padding={1} mb={-3}>
                ADMIN
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} padding={1}>
                BUYDOZER
              </Typography>
            </Box>
          </Box>
          <Box sx={{ fontWeight:"bold", bgcolor: "#F9FAFF"}} >
            {menuItems.map((item, index) => (
              <MenuPage
                key={index}
                menu={item.menu}
                icon={item.icon}
                link={item.link}
                selected={active}
                setSelected={setActive}
              />
            ))}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidenav;

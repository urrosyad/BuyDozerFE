import { useTheme } from "@emotion/react";
import { MenuPage } from "@components/admin/Moleculs/MenuPage";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { SpaceDashboardRounded, PeopleAltRounded, ReceiptLong, CommuteRounded, WalletRounded, MenuRounded, Sell } from "@mui/icons-material";


const Sidenav = () => {
  const theme = useTheme();
  const [active, setActive] = useState("/admin/dasboard")

  const menuItems = [
    { menu: "Dashboard", icon: <SpaceDashboardRounded style={{ fontSize: "16px" }} />, link: "/admin/dashboard", },
    { menu: "User", icon: <PeopleAltRounded style={{ fontSize: "16px" }} />, link: "/admin/user", },
    { menu: "Unit", icon: <CommuteRounded style={{ fontSize: "16px" }} />, link: "/admin/unit", },
    { menu: "Payment Confirm", icon: <WalletRounded style={{ fontSize: "16px" }} />, link: "/admin/paymentconfirm", },
    { menu: "List Harga Sewa", icon: <Sell style={{ fontSize: "16px" }} />, link: "/admin/rentlist", },
    { menu: "Transaksi", icon: <ReceiptLong style={{ fontSize: "16px" }} />, link: "/admin/transaction", },
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
      height={"100vh  "}
      color={theme.palette.primary.dark}
    >
      <Sidebar width="220px">
        <Menu style={{ height: "100%" }}>
          <Box
            sx={{
              justifyContent: "space-between",
              height: "60px",
              backgroundColor: "#F9FAFF",
              color: theme.palette.primary.dark,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              paddingLeft: "20px",
            }}>
            <Box sx={{ display: "flex", paddingBottom: "30px" }}>
              <MenuRounded style={{ fontSize: "16px" }} />
            </Box>
            <Box sx={{
              justifyContent: "flex-end",
              color: theme.palette.primary.dark,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}>
              <Box>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold", padding: 1, mb: -3 , color: '#193D71'}} >
                  ADMIN
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold", padding: 1, color: '#193D71' }}>
                  BUYDOZER
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ fontWeight: "bold", bgcolor: "#F9FAFF" }} >
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

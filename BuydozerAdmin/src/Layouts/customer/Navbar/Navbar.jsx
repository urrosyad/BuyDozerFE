import useAuth from '@hooks/useAuth';
import buydozerFont from '@assets/customer/buydozerFont.png'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountCircleRounded } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Link, Menu, Typography, styled } from '@mui/material'

const LoginButton = styled(Button)(({ }) => ({
  width: "80px",
  height: "30px",
  borderRadius: "10px",
  backgroundColor: "#193D71",
  color: "#D9D630",
  border: "2px solid #193D71",
  fontSize: "14px",
  ":hover": {
    backgroundColor: "#215093",
    color: "#D9D630",
    border: "2px solid #215093",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",
  }
}));

const RegisterButton = styled(Button)(({ }) => ({
  width: "80px",
  height: "30px",
  borderRadius: "10px",
  backgroundColor: "#D9D630",
  color: "#193D71",
  border: "2px solid #D9D630",
  fontSize: "14px",
  ":hover": {
    backgroundColor: "#EBE832",
    color: "#193D71",
    border: "2px solid #EBE832",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",
  }
}));

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState("/buydozer/beranda");
  const [profilDropdown, setProfilDropdown] = useState(null);
  const { logoutAuth } = useAuth()
  const navigate = useNavigate()
  const userName = localStorage.getItem("UserName");

  const handleOpenProfil = (event) => {
    setProfilDropdown(event.currentTarget);
  };
  const handleCloseProfil = () => {
    setProfilDropdown(null);
  };

  const handleLogout = () => {
    logoutAuth()
    navigate("/login")
  }

  const navItems = [
    { menu: "BERANDA", navigation: "/" },
    { menu: "UNIT", navigation: "/buydozer/unit" },
    { menu: "TRANSAKSI", navigation: "/buydozer/transaksi" },
  ]

  return (
    <>
      <Box sx={{
        width: "100%",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        zIndex: 10
      }}>
        <Grid container sx={{ width: "100%", height: "80px" }}>
          <Grid item xs={2} sm={4} md={4} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", pl: "10px" }}>
            <Link href="/">
              <img src={buydozerLogo} alt="" style={{ width: "80px" }} />
              <img src={buydozerFont} alt="" style={{ width: "150px", margin: "10px 0px 5px -10px" }} />
            </Link>
          </Grid>

          <Grid item xs={2} sm={4} md={4} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            {navItems.map((item, index) => (
              <Button key={index} onClick={() => { navigate(item.navigation), window.scrollTo(0, 0); }} color='primaryDark' sx={{
                ":hover": {
                  bgcolor: "#FFFFFF",
                }
              }} disableRipple>
                <Typography sx={{ fontSize: "12px", color: "#193D71", fontWeight: "medium", ":hover": { color: "#2A6DD0" }, }} onClick={() => setCurrentPage(item.navigation)}>
                  {item.menu}
                </Typography>
              </Button>
            ))}
          </Grid>

          <Grid item xs={2} sm={4} md={4} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: "10px", pr: "20px" }}>
            {userName
              ?
              <>
                <Typography sx={{ fontSize: "16px", color: "#193D71", fontWeight: "medium" }}>
                  {userName}
                </Typography>
                <IconButton sx={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid #193D71", borderRadius: "45%" }}
                  onClick={handleOpenProfil}>
                  <AccountCircleRounded sx={{ color: "#193D71" }} />
                </IconButton>
              </>
              :
              <>
                <LoginButton type='button' onClick={() => navigate('/login')} >
                  masuk
                </LoginButton>
                <RegisterButton type='button' onClick={() => navigate('/register')} >
                  daftar
                </RegisterButton>
              </>
            }
          </Grid>
        </Grid>
      </Box>
      <Menu
        anchorEl={profilDropdown}
        open={Boolean(profilDropdown)}
        onClose={handleCloseProfil}
        PaperProps={{
          elevation: 0,
          sx: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))',
            mt: "5px",
            ml: "10px",
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography sx={{ fontSize: "14px", color: "#193D71", fontWeight: "medium", ":hover": { color: "#2A6DD0", cursor: "pointer" } }} onClick={handleLogout} >
          Logout
        </Typography>
      </Menu>

    </>
  )
}

export default Navbar


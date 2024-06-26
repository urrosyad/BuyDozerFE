import React from 'react'
import buydozerFont from '@assets/customer/buydozerFont.png'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import footerGradient from '@assets/customer/footerGradient.png'
import { flexCenter, flexStart, flexRow } from '@themes/commonStyles'
import { FacebookRounded, Instagram, LinkedIn, X } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Link, Typography } from '@mui/material'

const iconSocialMedia = [
  { icon: <FacebookRounded sx={{ fontSize: "20px", color: "#FFFFFF", ":hover": { color: "#E8E6E6" } }} /> },
  { icon: <Instagram sx={{ fontSize: "20px", color: "#FFFFFF", ":hover": { color: "#E8E6E6" } }} /> },
  { icon: <X sx={{ fontSize: "15px", color: "#FFFFFF", ":hover": { color: "#E8E6E6" } }} /> },
  { icon: <LinkedIn sx={{ fontSize: "20px", color: "#FFFFFF", ":hover": { color: "#E8E6E6" } }} /> }
]

const navigasiMenu = [
  { menu: "beranda" },
  { menu: "unit" },
  { menu: "transaksi" },
]

const aboutMeMenu = [
  { menu: "FAQ" },
  { menu: "kontak kami" },
]

const serviceMenu = [
  { menu: "pembelian" },
  { menu: "penyewaan" },
  { menu: "pemeliharaan" },
  { menu: "404" },
]

const Footer = () => {
  return (
    <>
      <Box sx={{
        ...flexCenter, backgroundImage: `url(${footerGradient})`, width: "100%", backgroundRepeat: 'no-repeat', flexDirection: "column"
      }}>
        <Grid container padding={"70px"}>
          <Grid item xs={6} sx={{ ...flexStart, flexDirection: "column" }}>
            <Link href="/">
              <img src={buydozerLogo} alt="" style={{ width: "80px" }} />
              <img src={buydozerFont} alt="" style={{ width: "150px", margin: "10px 0px 5px -10px", backgroundColor: "transparent", filter: "" }} />
            </Link>
            <Typography sx={{ width: "75%", fontSize: "14px", color: "#FFFFFF", pl: "15px", m: "10px 0" }}>
              Buydozer hadir di tengah masa pertumbuhan sektor pembangunan yang ada di Indonesia. Buydozer menghadirkan solusi andal kepada perusahan konstruksi untuk pembangunan infrastruktur dan pertambangan modern.
            </Typography>
            <Box sx={{ ...flexRow, mt: "10px" }}>
              {iconSocialMedia.map((data, index) => (
                <Box key={index} sx={{
                  ...flexCenter, bgcolor: "#2A6DD0", borderRadius: "50%", padding: "10px", width: "30px", height: "30px", marginLeft: "15px", ":hover": {
                    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.25)"
                  },
                }}>
                  <>
                    {data.icon}
                  </>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={2} sx={{ ...flexStart, flexDirection: "column", pt: "20px", color: "#FFFFFF" }}>
            <Box height={100} sx={{ display: "flex",justifyContent: "flex-start", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "18px", color: "#FFFFFF", pl:"8px" }}>
                Navigasi
              </Typography>
                {navigasiMenu.map((data, index) => (
              <Button key={data.menu} onClick={() => navigate(item.navigation)}  color='primaryDark' sx={{display:"flex", justifyContent:"left",":hover":{bgcolor: "none",}}} disableRipple>
                  <Typography sx={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 100, ":hover": { color: "#E4E4E4"} }}>
                    {data.menu}
                  </Typography>
              </Button>
                ))}
            </Box>
          </Grid>

          <Grid item xs={2} sx={{ ...flexStart, flexDirection: "column", pt: "20px", color: "#FFFFFF" }}>
            <Box height={100}  sx={{ display: "flex",justifyContent: "flex-start", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "18px", color: "#FFFFFF", pl:"8px" }}>
                Tentang Kami
              </Typography>
                {aboutMeMenu.map((data, index) => (
              <Button key={data.menu} onClick={() => navigate(item.navigation)}  color='primaryDark' sx={{display:"flex", justifyContent:"left",":hover":{bgcolor: "none",}}} disableRipple>
                  <Typography sx={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 100, ":hover": { color: "#E4E4E4"} }}>
                    {data.menu}
                  </Typography>
              </Button>
                ))}
            </Box>
          </Grid>

          <Grid item xs={2} sx={{ ...flexStart, flexDirection: "column", pt: "20px", color: "#FFFFFF" }}>
            <Box height={100}  sx={{ display: "flex",justifyContent: "flex-start", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "18px", color: "#FFFFFF", pl:"8px" }}>
                Layanan
              </Typography>
                {serviceMenu.map((data, index) => (
              <Button key={data.menu} onClick={() => navigate(item.navigation)}  color='primaryDark' sx={{display:"flex", justifyContent:"left",":hover":{bgcolor: "none",}}} disableRipple>
                  <Typography sx={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 100 , ":hover": { color: "#E4E4E4"}}}>
                    {data.menu}
                  </Typography>
              </Button>
                ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ width: "90%", height: "2px", alignSelf: "center", marginTop: "20px", bgcolor: "#FFFFFF", mt: -5 }} />
        <Typography sx={{ fontSize: "10px", m: "25px", color: "#FFFFFF", fontWeight: 100 }}>
          ©2024 Copyright All Right Reserved
        </Typography>
      </Box>

    </>
  )
}

export default Footer
import React from 'react'
import Navbar from '@layouts/customer/Navbar/Navbar'
import Footer from '@layouts/customer/Footer/Footer'
import CarouselSection from '@components/customer/Moleculs//CarouselSection'
import UnitSection from '@components/customer/Moleculs/UnitSection'
import { Box, Divider, Typography } from '@mui/material'
import { flexCenter, flexEnd } from '@themes/commonStyles'
import truckVector from '@assets/customer/categoryUnit/truckVector.jpg'
import miniVector from '@assets/customer/categoryUnit/miniVector.jpg'
import excavatorVector from '@assets/customer/categoryUnit/excavatorVector.jpg'
import bulldozerVector from '@assets/customer/categoryUnit/bulldozerVector.jpg'
import posterPromo1 from '@assets/customer/posterPromo1.jpeg'
import posterPromo2 from '@assets/customer/posterPromo2.jpeg'

const unitCatergory = [
  { name: "Excavator", img: excavatorVector },
  { name: "Truck", img: truckVector },
  { name: "Mini Excavator", img: miniVector },
  { name: "Bulldozer", img: bulldozerVector },
]

const UnitPage = () => {
  return (
    <Box>
      <Navbar />
      <Box height={"50px"}></Box>
      <CarouselSection />

      {/* UNIT CATEGORY SECTION */}
      <Box border={1} sx={{ padding: "5% 15%", display: "flex", flexDirection: "column" }}>
        <Typography sx={{ ml: "30px", fontSize: "22px", fontWeight: "medium", color: "#193D71", mb: "20px" }}>
          KATEGORI UNIT
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {unitCatergory.map((item, index) => (
            <Box key={index} sx={{ ...flexCenter, width: "100%", height: "auto" }}>
              <Box sx={{ ...flexCenter, width: "100%", height: "auto", flexDirection: "column" }}>
                <img src={item.img} style={{ width: "200px", height: "200px" }} />
                <Typography sx={{ fontSize: "20px", color: "#D9D630", fontWeight: "medium", marginBottom: "5px" }}>
                  {item.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {/* END SECTION */}

      {/* PROMO POSTER SECTION */}
      <Box border={1} sx={{
        ...flexCenter, flexDirection: "row", padding: "5% 15%", gap: 2,

      }}>
        <Box sx={{
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          backgroundImage: `url(${posterPromo2})`, backgroundRepeat: 'no-repeat',
          width: '450px',
          height: '250px', position: "relative",
          backgroundSize: "cover", backgroundPosition: "bottom"
        }}>
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }} />
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "flex-end", position: 'relative', zIndex: 1,pr:"20px"
          }}>
            <Typography sx={{
              width: "30%", height: "auto", fontSize: '16px', color: '#D9D630', fontWeight: '100', marginBottom: '5px', textAlign: "end",
            }}>
              Penawaran Terbatas Untuk Pembelian Bulan ini
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: "flex", justifyContent: "flex-start", alignItems: "center",
          backgroundImage: `url(${posterPromo1})`, backgroundRepeat: 'no-repeat',
          width: '450px',
          height: '250px', position: "relative",
          backgroundSize: "cover", backgroundPosition: "bottom"
        }}>
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }} />
          <Box sx={{ pl:"20px", position: 'relative', zIndex: 1 }}>
            <Typography sx={{
              width: "20%", height: "auto", fontSize: '16px', color: '#8BB9FF', fontWeight: '100', marginBottom: '5px', textAlign: "start",
            }}>
              Hemat 20% dalam Penyewaan Langsung 1 Tahun
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* END SECTION */}

      <UnitSection/>

      <Footer />
    </Box>
  )
}

export default UnitPage
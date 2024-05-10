import React, { useState } from 'react'
import { Box, Button, Grid, Link, Typography, styled } from '@mui/material'
import HeaderImg from '@assets/customer/HeaderImg.png'
import { CaterpillarLogo, HyundaiLogo, KomatsuLogo, LiebherrLogo, ToyotaLogo, VolvoLogo, ScaniaLogo } from '@assets/customer/logoCompany';

import PembelianPosterImg from '@assets/customer/PembelianPosterImg.png'
import PenyewaanPosterImg from '@assets/customer/PenyewaanPosterImg.png'
import Poster1 from '@assets/customer/Poster1.png'
import { useNavigate } from 'react-router-dom'
import Navbar from '@layouts/customer/Navbar/Navbar'
import { Footer } from '@layouts/customer/Footer'
import { flexCenter, flexEnd } from '@themes/commonStyles'
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'
import ButtonOutlined from '@components/customer/Atoms/Button/ButtonOutlined';
import CommentSection from '@components/customer/Moleculs/CommentSection';


const logoImgs = [
  { logo: CaterpillarLogo, name: 'Caterpillar' },
  { logo: HyundaiLogo, name: 'Hyundai' },
  { logo: KomatsuLogo, name: 'Komatsu' },
  { logo: LiebherrLogo, name: 'Liebherr' },
  { logo: ToyotaLogo, name: 'Toyota' },
  { logo: VolvoLogo, name: 'Volvo' },
  { logo: ScaniaLogo, name: 'Scania' },
];

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <Navbar />

      {/* HEADER POSTER SECTION */}
      <Box sx={{ 
        ...flexEnd,
        width: '100%',
        height: '600px', backgroundImage: `url(${HeaderImg})`, backgroundRepeat: 'no-repeat', flexDirection: "column",
        borderRadius: "0px 0px 100px 100px", backgroundSize: "cover", backgroundPosition: "bottom",
      }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", width: "100%", p: "0 20% 5% 0" }}>
          <Typography sx={{ fontSize: "36px", color: "#D9D630", fontWeight: "medium", textAlign: 'right', lineHeight: "1.3", mb: "10px" }}>
            menghadirkan<br />solusi andal untuk<br />pertambangan<br />modern
          </Typography>
          <ButtonContained
            onClick={() => navigate("/buydozer/unit")}
            text={"lirik unit"}
            primaryColor={"#412D22"}
            secondColor={"#F5E94C"}
            hoverColor={"#D9D630"}
            width={"150px"}
            height={"40px"}
            fz={"16px"} />
        </Box>
      </Box>
      {/* END SECTION */}

      {/* COMPANY LOGO SECTION */}
      <Box sx={{ ...flexCenter, width: "100%", height: "100px", flexDirection: "row", gap: 4, mb: "50px" }}>
        {logoImgs.map((item, index) => (
          <img key={index} src={item.logo} alt={item.name} style={{ width: '130px', height: '65px', borderRadius: '10px', backgroundSize: "cover" }} />
        ))}
      </Box>
      {/* END SECTION */}


      {/* LAYANAN KAMI SECTION */}
      <Box sx={{ ...flexCenter, width: "100%", height: "auto", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: "medium", fontSize: "24px", letterSpacing: "1px", mb: "20px" }}>
          Layanan Kami
        </Typography>
        <Grid container sx={{ padding: "10px 90px" }}>
          <Grid item xs={5} sx={{ ...flexCenter }}>
            <img src={PembelianPosterImg} alt={"pembelian"} style={{ width: '300px', height: '500px', borderRadius: '20px 0 0 20px', backgroundSize: "cover" }} />
          </Grid>
          <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: "flex-start", flexDirection: "column" }}>
            <Box sx={{ mb: "10px", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "38px", color: "#193D71", fontWeight: "bold" }}>
                PEMBELIAN
              </Typography>
              <Typography sx={{ fontSize: "36px", color: "#D9D630", fontWeight: "medium" }}>
                KENDARAAN ALAT BERAT
              </Typography>
            </Box>
            <Box sx={{ width: "75%", mb: "20px" }}>
              <Typography sx={{ fontSize: "18px", color: "#193D71", fontWeight: "medium" }}>
                Penuhi kebutuhan konstruksi dan industri Anda dengan koleksi alat berat berkualitas tinggi kami. Temukan ekskavator, loader, dan alat berat lainnya untuk investasi jangka panjang dalam keandalan dan performa terbaik.
              </Typography>
            </Box>
            <Box>
              <ButtonOutlined
                onClick={() => {navigate("/buydozer/unit"),window.scrollTo(0, 0);}}
                text={"lihat lihat dulu"}
                primaryColor={"#D9D630"}
                secondColor={"#D9D630"}
                hoverColor={"#FFFEF0"}
                width={"auto"}
                height={"35px"}
                fz={"14px"} />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ padding: "0px 90px", mb: 10 }}>
          <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: "flex-end", flexDirection: "column" }}>
            <Box sx={{ mb: "10px" }}>
              <Typography sx={{ fontSize: "38px", color: "#193D71", fontWeight: "bold", ml: "46%" }}>
                PENYEWAAN
              </Typography>
              <Typography sx={{ fontSize: "36px", color: "#D9D630", fontWeight: "medium" }}>
                KENDARAAN ALAT BERAT
              </Typography>
            </Box>
            <Box sx={{ width: "75%", mb: "20px" }}>
              <Typography sx={{ fontSize: "18px", color: "#193D71", fontWeight: "medium", textAlign: "end" }}>
                Sewa alat berat kami untuk proyek jangka pendek atau hemat biaya. Dapatkan bulldozer, crane, dan truk dump dengan harga bersaing, memberikan solusi efisien tanpa beban kepemilikan.
              </Typography>
            </Box>
            <Box>
              <ButtonOutlined
                onClick={() => {navigate("/buydozer/allunit"),window.scrollTo(0, 0);}}
                text={"Mulai Sewa"}
                primaryColor={"#193D71"}
                secondColor={"#193D71"}
                hoverColor={"#F2F7FF"}
                width={"120px"}
                height={"35px"}
                fz={"14px"} />
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ ...flexCenter }}>
            <img src={PenyewaanPosterImg} alt={"pembelian"} style={{ width: '300px', height: '500px', borderRadius: '0 20px 20px 0', backgroundSize: "cover" }} />
          </Grid>
        </Grid>
      </Box>
      {/* END SECTION */}

      {/* POSTER SECTION */}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", mb: "80px" }}>
        <Typography sx={{ position: "absolute", width: "550px", textAlign: "right", fontSize: "24px", color: "#D9D630", fontWeight: "bold", zIndex: "1", mb: "22%", mr: "3%" }}>
          MULAI BERGABUNG MENJADI BAGIAN DARI INVESTASI JANGKA PANJANG BUYDOZER</Typography>
        <img src={Poster1} style={{ width: '100%', height: '100%', borderRadius: '10px', backgroundSize: "cover", zIndex: "0" }} />
      </Box>
      

      {/* COMMENT SECTION */}
      <CommentSection />
      <Footer />
    </Box>
  )
}

export default HomePage
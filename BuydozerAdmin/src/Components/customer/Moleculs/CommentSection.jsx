import 'react-multi-carousel/lib/styles.css';
import { Box, Typography } from '@mui/material';
import React from 'react'
import { Face, PersonOutlineOutlined } from '@mui/icons-material'
import Carousel from 'react-multi-carousel';
import { flexCenter, flexStart} from '@themes/commonStyles';


const customerComment = [
  { name: "Rakai Wikrama", position: "Project Manager Analyst", comment: "Saya sangat puas dengan pilihan alat berat yang tersedia untuk pembelian di Buydozer. Kualitasnya tidak diragukan lagi, dan layanan purna jualnya sungguh memuaskan" },
  { name: "Ervin Boy Pratama", position: "Contractor", comment: "Menyewa bulldozer dari Buydozer sungguh menghemat waktu dan biaya saya dalam menyelesaikan proyek. Alatnya dalam kondisi prima, dan pelayanan penyewaannya cepat dan mudah" },
  { name: "Canka Sakti", position: "Supervisor", comment: "Terima kasih Buydozer atas solusi penyewaan alat berat yang membantu proyek kami berjalan lancar. Harga yang kompetitif dan alat-alat yang handal benar-benar memberikan nilai tambah" },
  { name: "Eriza Angelika", position: "Arsitecture", comment: "Ketersediaan alat berat di Buydozer tidak perlu di ragukan lagi. Layanan purna jualnya sangat memuaskan, dan pelayanan nya cepat dan terpercaya. Terima kasih Buydozer!" },
]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const CommentSection = () => {

  return (
    <>
    <Box sx={{height:"auto", padding: "10px 90px", margin: "40px 0" }}>
      <Typography sx={{ ml: "30px", fontSize: "22px", fontWeight: "100", color: "#193D71", mb:"20px" }}>
        Apa Kata Pelanggan Kami
      </Typography>
      <Carousel
        responsive={responsive}
        swipeable={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        arrows={false}
      >
        {customerComment.map((item, index) => (
          <Box key={index} sx={{ ...flexCenter, width: "320px", height: "250px", }}>
            <Box sx={{ ...flexCenter, flexDirection: "column", width: "95%", height: "95%", borderRadius: "40px", backgroundColor: "#F5E94C", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.25)" }}>
              <Box sx={{ ...flexCenter, width: "50px", height: "50px", border: "2px solid #193D71", borderRadius: "50%" }}>
                <PersonOutlineOutlined sx={{ color: "#193D71", fontSize: "30px" }} />
              </Box>

              <Box sx={{ ...flexCenter, flexDirection: "column", gap: "0px" }}>
                <Typography sx={{ fontSize: "18px", fontWeight: "medium", color: "#193D71" }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "medium", color: "#516C93" }}>
                  {item.position}
                </Typography>
              </Box>

              <Box sx={{ width: "90%", height: "auto", mt: "5px" }}>
                <Typography sx={{ fontSize: "11px", fontWeight: "medium", mt: "5px", color: "#193D71", textAlign: "center" }}>
                  {item.comment}
                </Typography>
              </Box>

            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
    </>

  )
}

export default CommentSection
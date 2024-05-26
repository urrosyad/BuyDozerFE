import React from 'react'
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { Box, Button, Divider, Link, Skeleton, Typography } from '@mui/material';
import { ArrowForwardIosRounded, Face, PersonOutlineOutlined } from '@mui/icons-material'
import { flexCenter, flexStart } from '@themes/commonStyles';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import formatRupiah from '@utils/formatRupiah';
import { GET_UNIT } from '@api/api';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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

const UnitSection = ({ }) => {
  const { data: dataUnit, isLoading: unitIsLoading, isFetching: unitIsFetching, isSuccess: unitIsSuccess, error: unitIsError, refetch } = useQuery({
    queryKey: ["Unit", {
      nameUnit: "",
      sortBuy: true,
      pageNumber: 1,
      pageSize: 4
    }],
    queryFn: () => GET_UNIT({
      nameUnit: "",
      sortBuy: true,
      pageNumber: 1,
      pageSize: 4
    }),
  })
  const navigate = useNavigate()
  const skeletonBox = Array.from({ length: 5 });

  { unitIsLoading && console.log("data sedang loading") }
  { unitIsFetching && console.log("data berhasil difetching") }
  // { unitIsSuccess && console.log(dataUnit) }


  return (
    <Box sx={{ height: "auto", padding: "10px 90px", margin: "40px 0" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Typography sx={{ fontSize: "22px", fontWeight: "medium", color: "#193D71", }}>
          UNIT KAMI
        </Typography>
        <Button 
        onClick={() => {navigate("/buydozer/allunit"),window.scrollTo(0, 0);}}
        sx={{ color: "#193D71", textDecoration: "none", fontSize: "14px", fontWeight: "thin", mr: "30px", ":hover":{bgcolor: "#FFFFFF",color: "#2A6DD0"}}} disableRipple
        >
          Lihat lainnya
        </Button>
      </Box>
      <Box>

        {unitIsLoading ? (

          // Menampilkan skeleton box saat loading sesuai lenght dataUnit
          <>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap:3, mt:"30px"}}>
              {/* Mapping skeleton box */}
              {skeletonBox.map((_, index) => (
                <Box key={index} sx={{
                  display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", width: "200px", height: "250px", backgroundColor: "#FFFFFF", borderRadius: "10px"
                }}>
                  <Skeleton key={index} variant="rounded" animation="wave" width="100%" height="180px" sx={{ mt: "5px" }} />
                  <Box sx={{ pt: "10px", width: "100%", height: "100px" }}>
                    <Skeleton key={index} variant="rounded" animation="wave" sx={{ width: "50%", height: "10px", mb: "10px" }} />
                    <Skeleton key={index} variant="rounded" animation="wave" width="80%" height="20px" />
                  </Box>
                </Box>
              ))}
            </Box>
          </>

        ) : (

          <Carousel
            responsive={responsive}
            swipeable={true}
            autoPlay={false}
            autoPlaySpeed={3000}
            infinite={true}
            arrows={true}
          >
            {unitIsSuccess && dataUnit && dataUnit.data.map((item, index) => (
              <Link href={`/buydozer/unit/${item.nameUnit}`} underline='none'>
                <Box key={index} sx={{
                  ...flexCenter, flexDirection: "column", width: "200px", height: "250px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", backgroundColor: "#FFFFFF", borderRadius: "10px", ":hover": {
                    cursor: "pointer",
                    transform: "scale(0.99)",
                    transition: "transform 0.3s",
                  }
                }}>
                  <Box sx={{
                    display: "flex", 
                    justifyContent: "flex-start", 
                    alignItems: "flex-end",
                    backgroundImage: `url(${item.imgUnit})`,
                    backgroundRepeat: 'no-repeat',
                    width: '100%', height: '100vh',
                    backgroundSize: "cover", 
                    backgroundPosition: "center",
                    borderRadius: "10px",
                  }}>
                    <img src={item.imgBrand} alt="brand" style={{ position: "absolute", width: "50px", height: "25px", borderRadius: "2px" }} />
                  </Box>
                  <Box sx={{ width: "100%", height: "100px", p: "10px 10px" }}>
                    <Typography fontWeight="thin" sx={{ fontSize: "14px", color: "#193D71" }}>
                      {item.nameUnit}
                    </Typography>
                    <Typography fontWeight="bold" sx={{ fontSize: "18px", color: "#193D71" }}>
                      {item.typeUnit}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))}
          </Carousel>
        )}

      </Box>

    </Box>
  )
}

export default UnitSection
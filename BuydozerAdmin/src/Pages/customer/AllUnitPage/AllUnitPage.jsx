import { Box, Grid, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '@layouts/customer/Navbar/Navbar'
import Footer from '@layouts/customer/Footer/Footer'
import { flexCenter, flexEnd } from '@themes/commonStyles'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'
import { useNavigate } from 'react-router-dom'
import SearchInput from '@components/customer/Moleculs/SearchInput'
import { GET_UNIT } from '@api/api'



const AllUnitPage = () => {
  const navigate = useNavigate()
  const skeletonBox = Array.from({ length: 4 });
  const [searchValue, setSearchValue] = useState('')
  const { data: dataUnit, isLoading: unitIsLoading, isFetching: unitIsFetching, isSuccess: unitIsSuccess, error: unitIsError, refetch } = useQuery({
    queryKey: ["Unit", {
      nameUnit: searchValue,
      sortBuy: true,
      pageNumber: 1,
      pageSize: 100
    }],
    queryFn: () => GET_UNIT({
      nameUnit: searchValue,
      sortBuy: true,
      pageNumber: 1,
      pageSize: 100
     }),
  })

  const handleSearchUnit = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };


  useEffect(() => {    
  refetch
  }, [searchValue, refetch])
  

  return (
    <>
      <Navbar />
      <Box  sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "100%",
        height: "auto",
        padding: "5% 10%",
        flexDirection: "column",
        bgcolor:"#FCFCFC"
      }}>

        <Box  sx={{ ...flexCenter, width: "100%", mt: "20px" }}>
          <Typography sx={{ fontWeight: "medium", fontSize: "32px", letterSpacing: "10px", mb: "20px" }}>
            UNIT KAMI
          </Typography>
        </Box>
        <Box  sx={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "15px 70px 15px 0px", borderRadius:"20px", boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.25)", bgcolor:"#FFFFFF" }}>
          <SearchInput
            color={"#193D71"}
            bgColor={"#FFFFFF"}
            searchValue={searchValue}
            handleSearch={handleSearchUnit}
            />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "auto", flexWrap: "wrap", gap: 5, position: "relative", mt:"10px",p:"30px 20px",borderRadius:"20px", boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.25)", bgcolor: "#FFFFFF" }}>

          {unitIsLoading || unitIsFetching
            ? (
              <>
              <Box  sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "row", width: "100%",gap: 5 }}>
                  {/* Mapping skeleton box */}
                  {skeletonBox.map((_, index) => (
                    <Box key={index} sx={{
                      display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", width: "200px", height: "250px", backgroundColor: "#FFFFFF", borderRadius: "10px"
                    }}>
                      <Skeleton variant="rounded" animation="wave" width="100%" height="150px" sx={{ mt: "5px" }} />
                      <Box sx={{ p: "10px 10px", width: "100%", height: "100px" }}>
                        <Skeleton variant="rounded" animation="wave" sx={{ width: "50%", height: "10px", mb: "10px" }} />
                        <Skeleton variant="rounded" animation="wave" width="80%" height="20px" sx={{mb:"20px"}}/>
                        <Skeleton variant="rounded" animation="wave" width="80%" height="25px"  />
                        
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <>
                {unitIsSuccess && dataUnit.data.map((item, index) => (

                <Box key={index} sx={{
                  ...flexCenter, flexDirection: "column", width: "200px", height: "250px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", backgroundColor: "#FFFFFF", borderRadius: "10px"
                }}>
                  <Box sx={{
                    display: "flex", justifyContent: "flex-start", alignItems: "flex-end",
                    backgroundImage: `url(${item.imgUnit})`,
                    backgroundRepeat: 'no-repeat',
                    width: '100%', height: '100vh',
                    backgroundSize: "cover", backgroundPosition: "center",
                    borderRadius: "10px",
                  }}>
                    <img src={item.imgBrand} alt="brand" style={{ position: "absolute", width: "50px", height: "25px", borderRadius: "2px" }} />
                  </Box>
                  <Box sx={{ width: "100%", height: "100px", p: "10px 10px" }}>
                    <Typography fontWeight="thin" sx={{ fontSize: "14px", color: "#193D71" }} noWrap>
                      {item.nameUnit}
                    </Typography>
                    <Typography variant='body2' fontWeight="bold" sx={{ fontSize: "18px", color: "#193D71" }} noWrap>
                      {item.typeUnit}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: "10px", p: "10px" }}>
                    <ButtonContained
                      onClick={() => {navigate(`/buydozer/unit/${item.nameUnit}`),window.scrollTo(0, 0);}}
                      text="Lihat Detail"
                      primaryColor={"#D9D630"}
                      secondColor={"#193D71"}
                      hoverColor={"#215093"}
                      width={"150px"}
                      height={"30px"}
                      fz={"14px"}
                    />
                  </Box>
                </Box>
                ))}
              </>
            )

          }


        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default AllUnitPage
import { Box, Typography } from '@mui/material'
import React from 'react'
import { flexCenter } from '@themes/commonStyles'
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'
import { Home } from '@mui/icons-material'

const ErrorPage = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: "20%" }}>
      <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
        Terjadi Masalah
      </Typography>
      <Typography sx={{ fontWeight: "100", fontSize: "48px", color: "#193D71" }}>
        -ERROR 404-
      </Typography>
      <ButtonContained
        onClick={handleUploadPaymentConfirm}
        text={
          <>
          <Home/>
          Kembali ke beranda
          </>
        }
      primaryColor={"#D9D630"}
      secondColor={"#193D71"}
      hoverColor={"#215093"}
      width={"100%"}
      height={"40px"}
      fz={"14px"}
                  />

    </Box>
  )
}

export default ErrorPage
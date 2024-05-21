import { Box, Typography } from '@mui/material'
import React from 'react'
import gradientCard from "@assets/admin/gradientCard.png"
import theme from '@themes/theme';

const InfoCard = ({ title, subTitle, qty, icon }) => {
  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      flexWrap: 'wrap',
      width: '90%',
      height: '100px', backgroundImage: `url(${gradientCard})`, backgroundRepeat: 'no-repeat', flexDirection: "column",
      borderRadius: "25px", backgroundSize: "cover", backgroundPosition: "bottom",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.5)"
    }}>
      <Box sx={{
        display: "flex", flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap',
      }}>
        <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'space-around', marginLeft: "20px" }}>
          <Box>
            <Typography sx={{ display: "flex", fontSize: "20`px", fontWeight: "medium", color: "#ffff", borderRadius: "5px" }}>
              {title}
            </Typography>
          </Box>
          <Box marginTop={"-40px"} sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{
              display: "flex", fontSize: "20px", fontWeight: "bold", color: "#ffff", borderRadius: "5px", mr: "5px"
            }}>
              {qty}
            </Typography>
            <Typography sx={{ display: "flex", fontSize: "20px", fontWeight: "medium", color: "#ffff", borderRadius: "5px" }}>
              {subTitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', margin: "15px", marginLeft: "20px" }}>
          <Box sx={{ backgroundColor: "#ffff", height: "70px", width: "70px", borderRadius: "30px", justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            {icon}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoCard
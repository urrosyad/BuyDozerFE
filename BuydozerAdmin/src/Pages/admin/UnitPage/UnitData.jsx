import React, { useState } from 'react'
import {
  Card,
  Box, Typography,
  Grid, InputBase
} from '@mui/material'
import { SearchRounded } from '@mui/icons-material';
import theme from '../../../theme';
import TableUnit from './TableUnit';
import AddButton from '../../../Components/admin/Atoms/Buttons/AddButton';
import ModalAdd from '../../../Components/admin/Atoms/Modal/ModalAdd';


const UnitData = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isModalAddOpen, setIsModalAppOpen] = useState(false)

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };


  return (
    <Grid sx={{
      bgcolor: "#EEF2FF", weight: "100vh", height: "100vh", overflowY: "auto", overflowX: "hidden",
      '&::-webkit-scrollbar': {
        width: '8px',
        boxShadow: "10px"
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#8BB9FF",
        borderRadius: '5px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: "#FFFFFF",
      },
    }}>
      <Card sx={{ p: "10px 20px 50px 20px", m: "30px 15px", bgcolor: "#F9FAFF", borderRadius: "20px" }} >
        <Box sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row", rowGap: 10, m: "15px" }}>

          <Typography variant='h5' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
            Data Unit
          </Typography>

          <Box gap={1} sx={{ display: "flex", justifyContent: "space-between"}}>
            
            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
              <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
              <InputBase sx={{ pl: "10px", color: theme.palette.primary.main, fontWeight: "medium", fontSize: "14px"
            }} placeholder='Cari Unit...'
              value={searchValue} onChange={handleSearch}/>
            </Box>

            <AddButton onClick={() => setIsModalAppOpen(true)}/>
            <ModalAdd 
              isOpen={isModalAddOpen} 
              onClose={() => setIsModalAppOpen(false)}
              labelInput={[
                { label: "Nama Unit", id: "unitName", value: "", type: "text" },
                { label: "Brand Unit", id: "unitBrand", value: "", type: "text" },
                { label: "Ketersediaan Unit", id: "qtyUnit", value: "", type: "number" },
                { label: "Deskripsi Unit", id: "descUnit", value: "", type: "textarea" },
                { label: "Harga Beli", id: "buyPrice", value: "", type: "number" },
                { label: "Harga Sewa", id: "sellPrice", value: "", type: "number" },
                { label: "Foto Unit", id: "imgUnit", value: "", type: "file" },
                { label: "Foto Brand", id: "imgBrand", value: "", type: "file" },
              ]}/>
          </Box>
        </Box>
        <TableUnit/>  
      </Card>
    </Grid>
  )
}

export default UnitData
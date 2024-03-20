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



const UnitData = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    setSearchValue(event.target.value);

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

          <Typography variant='h4' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
            Data Unit
          </Typography>

          <Box gap={3} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
              <SearchRounded fontSize='medium' sx={{ ml: "10px" }} />
              <InputBase sx={{ pl: "10px", color: theme.palette.primary.main, fontWeight: "medium"}}  placeholder='Cari Unit...'
                         value={searchValue} onChange={handleSearch}/>
            </Box>
            <AddButton />
          </Box>
        </Box>
        <TableUnit searchValue={searchValue} />  
      </Card>
    </Grid>
  )
}

export default UnitData
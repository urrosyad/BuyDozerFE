import React, { useState } from 'react'
import {
  Container, Card,
  Box, Typography,
  Grid, Button,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton, InputBase
} from '@mui/material'
import theme from '../../theme'
import AddButton from '../../Components/Atoms/Buttons/AddButton';
import formatRupiah from '../../utils/formatRupiah';
import { BorderColorRounded, DeleteRounded, EditRounded, SearchOffRounded, SearchRounded } from '@mui/icons-material';



const TableUnit = ({searchValue}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dataTable = (fotoUnit, nameUnit, brandUnit, qtyUnit, buyUnit, sellUnit) => {
    return { fotoUnit, nameUnit, brandUnit, qtyUnit, buyUnit, sellUnit, actions: '' };
  }

  const columnStyle = {
    align: 'center',
    bgcolor: "#8BB9FF",
    color: "#EEF2FF"
  };
  
  const columns = [
    { id: 'no', label: ' No', width: "2%", ...columnStyle },
    {
      id: 'fotoUnit', label: 'Foto Unit', width: "10%", ...columnStyle,
      render: (row) => (
        <img
          src={`${row.fotoUnit}`}
          alt={row.nameUnit}
          style={{ width: "100px", height: "100px", objectFit: 'cover', borderRadius: "10px", border: "solid 2px #193D71" }} />
      )
    },
    { id: 'nameUnit', label: 'Nama Unit', width: "10%", ...columnStyle },
    { id: 'brandUnit', label: 'Brand Unit', width: "10%", ...columnStyle },
    { id: 'qtyUnit', label: 'Ketersediaan Unit', width: "10%", ...columnStyle },
    { id: 'buyUnit', label: 'Harga Jual', width: "10%", ...columnStyle },
    { id: 'sellUnit', label: 'Harga Sewa', width: "10%", ...columnStyle },
    {
      id: 'actions', label: 'Aksi', width: "2%", ...columnStyle,
      render: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box>
            <IconButton color='warning'>
              <BorderColorRounded fontSize='small' />
            </IconButton>
          </Box>
          <Box>
            <IconButton color='error'>
              <DeleteRounded fontSize='small' />
            </IconButton>
          </Box>
        </Box>
      )
    },
  ]


  const rows = [
    dataTable('truck.jpeg', 'Excavator', 'Komatsu', 20, `${formatRupiah(300000000)}/unit`, `${formatRupiah(5000000)}/bulan`),
    dataTable('truck.jpeg', 'Bulldozer', 'Caterpillar', 15, `${formatRupiah(400000000)}/unit`, `${formatRupiah(6000000)}/bulan`),
    dataTable('truck.jpeg', 'Crane', 'Liebherr', 10, `${formatRupiah(500000000)}/unit`, `${formatRupiah(7000000)}/bulan`),
    dataTable('truck.jpeg', 'Dump Truck', 'Volvo', 25, `${formatRupiah(350000000)}/unit`, `${formatRupiah(5500000)}/bulan`),

  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterRows = () => {
    return rows.filter(row =>
      row.nameUnit.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.brandUnit.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  const filteredRows = filterRows();

  return (
    <div>
      <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width, backgroundColor: column.bgcolor, color: column.color }} >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="subtitle1" color="#2A6DD0" fontWeight="medium" >Unit tidak tersedia</Typography>
                </TableCell>
              </TableRow>
            ) : 
            (filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const rowIndex = page * rowsPerPage + index + 1;
                const rowStyle = { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFF' };

                return (
                  <TableRow key={index} style={rowStyle}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} sx={{ fontWeight: 'medium', color: "#2A6DD0" }}>
                        {column.id === 'no' ? rowIndex :
                          (column.id === 'actions' ? column.render(row) :
                            column.id === 'fotoUnit' ? column.render(row) : row[column.id])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              }))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </div>
  )
}

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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: theme.palette.primary.contrastText, color: theme.palette.primary.main, borderRadius: "10px", }}>
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
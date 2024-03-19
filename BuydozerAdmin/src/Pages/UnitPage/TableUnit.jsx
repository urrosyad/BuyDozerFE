import React, { useState } from 'react'
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton
} from '@mui/material'
import formatRupiah from '../../utils/formatRupiah';
import {SwapVertRounded } from '@mui/icons-material';
import { EditButton, DeleteButton } from '../../Components/Atoms/Buttons';
import { useQuery } from '@tanstack/react-query';

const TableUnit = ({searchValue}) => {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [sort, setSort] = useState({ field: null, direction: 'asc' });
   
   const dataTable = (fotoUnit, nameUnit, brandUnit, qtyUnit, buyPrice, sellPrice) => {
     return { fotoUnit, nameUnit, brandUnit, qtyUnit, buyPrice, sellPrice, actions: '' };
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
     { id: 'nameUnit', label: 'Nama Unit', width: "10%", ...columnStyle},
     { id: 'brandUnit', label: 'Brand Unit', width: "10%", ...columnStyle},
     { id: 'qtyUnit', label: 'Ketersediaan Unit', width: "10%", ...columnStyle, sortable: true },
     { id: 'buyPrice', label: 'Harga Jual', width: "10%", ...columnStyle, sortable: true },
     { id: 'sellPrice', label: 'Harga Sewa', width: "10%", ...columnStyle, sortable: true  },
     {
       id: 'actions', label: 'Aksi', width: "2%", ...columnStyle,
       render: () => (
         <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
           <Box>
              <EditButton/>
           </Box>
              <DeleteButton/>
         </Box>
       )
     },
   ]
   
   
   const rows = [
     dataTable('truck.jpeg', 'Excavator', 'Komatsu', 20, `${formatRupiah(300000000)}/unit`, `${formatRupiah(5000000)}/bulan`),
     dataTable('truck.jpeg', 'Bulldozer', 'Caterpillar', 15, `${formatRupiah(400000000)}/unit`, `${formatRupiah(6000000)}/bulan`),
     dataTable('truck.jpeg', 'Crane', 'Liebherr', 10, `${formatRupiah(500000000)}/unit`, `${formatRupiah(7000000)}/bulan`),
     dataTable('truck.jpeg', 'Dump Truck', 'Volvo', 25, `${formatRupiah(350000000)}/unit`, `${formatRupiah(5500000)}/bulan`),
     dataTable('truck.jpeg', 'Excavator', 'Komatsu', 20, `${formatRupiah(300000000)}/unit`, `${formatRupiah(5000000)}/bulan`),
     dataTable('truck.jpeg', 'Bulldozer', 'Caterpillar', 15, `${formatRupiah(400000000)}/unit`, `${formatRupiah(6000000)}/bulan`),
     dataTable('truck.jpeg', 'Crane', 'Liebherr', 10, `${formatRupiah(500000000)}/unit`, `${formatRupiah(7000000)}/bulan`),
     dataTable('truck.jpeg', 'Dump Truck', 'Volvo', 25, `${formatRupiah(350000000)}/unit`, `${formatRupiah(5500000)}/bulan`),
     dataTable('truck.jpeg', 'Excavator', 'Komatsu', 20, `${formatRupiah(300000000)}/unit`, `${formatRupiah(5000000)}/bulan`),
     dataTable('truck.jpeg', 'Bulldozer', 'Caterpillar', 15, `${formatRupiah(400000000)}/unit`, `${formatRupiah(6000000)}/bulan`),
     dataTable('truck.jpeg', 'Crane', 'Liebherr', 10, `${formatRupiah(500000000)}/unit`, `${formatRupiah(7000000)}/bulan`),
     dataTable('truck.jpeg', 'Dump Truck', 'Volvo', 25, `${formatRupiah(350000000)}/unit`, `${formatRupiah(5500000)}/bulan`),
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
   
   const handleSort = (field) => {
     const isAsc = sort.field === field && sort.direction === 'asc';
     setSort({ field, direction: isAsc ? 'desc' : 'asc' });
   };
   
   const filterRows = () => {
     const compare = (a, b) => {
       if (a[sort.field] < b[sort.field]) {
         return sort.direction === 'asc' ? -1 : 1;
       }
       if (a[sort.field] > b[sort.field]) {
         return sort.direction === 'asc' ? 1 : -1;
       }
       return 0;
     };
   
     return rows
       .filter(row =>
         row.nameUnit.toLowerCase().includes(searchValue.toLowerCase()) ||
         row.brandUnit.toLowerCase().includes(searchValue.toLowerCase())
       )
       .sort(compare);
   };
   
   const filteredRows = filterRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
   
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
                   onClick={() => column.sortable ? handleSort(column.id) : null}
                   style={{ width: column.width, backgroundColor: column.bgcolor, color: column.color }} 
                   >
                   {column.id === 'buyPrice' || column.id === 'sellPrice' ? (
                     <IconButton sx={{ fontSize: 'medium', color: "#F8FAFF" }} onClick={() => handleSort(column.id)}>
                       <SwapVertRounded />
                     </IconButton>
                   ) : ""}
   
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
             ) : (
             filteredRows
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
           rowsPerPageOptions={[5, 10, 20]}
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


export default TableUnit
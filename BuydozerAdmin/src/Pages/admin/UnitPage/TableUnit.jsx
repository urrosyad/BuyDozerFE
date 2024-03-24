import React, { useState } from 'react'
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton, Collapse,
  Slide
} from '@mui/material'
import formatRupiah from '../../../utils/formatRupiah';
import { SwapVertRounded, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { EditButton, DeleteButton } from '../../../Components/admin/Atoms/Buttons';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import theme from '../../../theme';


const UNIT_DATA = [
  {
    nameUnit: "Electric drive mining truck",
    typeUnit: "Komatsu 830e-S",
    descUnit: "lorem ipsum dolor sit amet indonesia raya bhineka tunggal ika",
    imgUnit: <img src='' alt='foto unit' style={{width: "100px", height: "100px", objectFit: 'cover', borderRadius: "10px", border: "solid 2px #193D71"}}></img>,
    imgBrand: <img src='' alt='logo brand' style={{width: "100%", height: "50px", objectFit: 'cover', borderRadius: "5px", border: "solid 2px #193D71"}}></img>,
    priceBuy: "14520000000",
    priceRent: "35000000",
    qtyUnit: "20",
  },
  {
    nameUnit: "Bulldozer Extrahot",
    typeUnit: "CAT 8DTAA",
    descUnit: "Ini adalah bulldozer extrahot",
    imgUnit: <img src='' alt='foto unit'></img>,
    imgBrand: <img src='' alt='logo brand'></img>,
    priceBuy: "14520000000",
    priceRent: "35000000",
    qtyUnit: "20",
  },
  {
    nameUnit: "Electric drive mining truck",
    typeUnit: "Komatsu 830e-S",
    descUnit: "lorem ipsum dolor sit amet indonesia raya bhineka tunggal ika",
    imgUnit: <img src='' alt='foto unit'></img>,
    imgBrand: <img src='' alt='logo brand'></img>,
    priceBuy: "14520000000",
    priceRent: "35000000",
    qtyUnit: "20",
  },
  {
    nameUnit: "Bulldozer Extrahot",
    typeUnit: "CAT 8DTAA",
    descUnit: "Ini adalah bulldozer extrahot",
    imgUnit: <img src='' alt='foto unit'></img>,
    imgBrand: <img src='' alt='logo brand'></img>,
    priceBuy: "14520000000",
    priceRent: "35000000",
    qtyUnit: "20",
  },
]

const BASE_URL_LOGIN = 'https://localhost:5001/api/Users/login';
const BASE_URL_HEAVYUNIT = 'https://localhost:5001/api/HeavyUnits?ParameterUnit=%25%25&PriceRent=true&PriceBuy=false&PageNumber=1&PageSize=1';


const POST_LOGIN = async () => {
  const loginData = {
    email: 'administrator@localhost',
    password: 'Administrator1!',
    twoFactorCode: 'string',
    twoFactorRecoveryCode: 'string'
  };

  try {
    const response = await axios.post(BASE_URL_LOGIN, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { accessToken } = response.data;
    // console.log(`Post login Bearer ${accessToken}`); 
    
    return accessToken;

  } catch (error) {
    console.error('Error while login:', error);
    throw error;
  }
};

const getAccessToken = async () => {
  try {
    const accessToken = await POST_LOGIN();
    // console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error getting accessToken:', error);
    throw error;
  }
};

const GET_UNIT = async () => {

  const accessToken = await getAccessToken(); // Menunggu getAccessToken diselesaikan
  console.log("Bearer", accessToken);

  try {
    const response = await axios.get(BASE_URL_HEAVYUNIT, {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      }
    });
    const dataUnit = response.data

    console.log(dataUnit)

    return dataUnit;

  } catch (error) {
    console.error('Error fetching Unit:', error);
    // throw error;
  }
};




const TableUnit = () => {
  const [data, setData] = useState(UNIT_DATA);
  const [openDesc, setOpenDesc] = useState(null);

  const handleCollapseToggle = (rowId) => {
    setOpenDesc(openDesc === rowId ? null : rowId);
  };

  const skipAccessorKeys = ["imgUnit", "imgBrand"];

  const columns = [
    { accessorKey: "no", header: "No", width: "1%", cell: (props) => <Typography>{props.row.index + 1}</Typography> },
    { accessorKey: "imgUnit", header: "Foto Unit", width: "5%", cell: (props) => <Typography>{props.getValue()}</Typography> },
    { accessorKey: "imgBrand", header: "Logo Brand", width: "5%", cell: (props) => <Typography>{props.getValue()}</Typography> },
    { accessorKey: "nameUnit", header: "Nama Unit", width: "5%", cell: (props) => <Typography>{props.getValue()}</Typography> },
    { accessorKey: "typeUnit", header: "Tipe Unit", width: "5%", cell: (props) => <Typography>{props.getValue()}</Typography> },
    { accessorKey: "qtyUnit", header: "Ketersediaan Unit", width: "5%", cell: (props) => <Typography>{props.getValue()}</Typography> },
    { accessorKey: "priceBuy", header: "Harga Beli", width: "5%", cell: (props) => <Typography>{formatRupiah(props.getValue())}</Typography> },
    { accessorKey: "priceRent", header: "Harga Sewa", width: "5%", cell: (props) => <Typography>{formatRupiah(props.getValue())}</Typography> },
    {
      accessorKey: "descUnit", header: "", width: "0%", cell: (props) => {
        const rowId = props.row.id;
        const isOpen = openDesc === rowId;
        return (
          <>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleCollapseToggle(rowId)}>
              {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </>
        )
      }
    },
    {
      accessorKey: "actions", header: "Aksi", width: "2%", cell: (props) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box>
            <EditButton />
          </Box>
          <Box>
            <DeleteButton />
          </Box>
        </Box>
      )
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  GET_UNIT();

  // console.log(table.getHeaderGroups());
  // console.log(table.getRowModel());


  return (
    <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (!skipAccessorKeys.includes(header.column.columnDef.accessorKey)) {
                  return (
                    <TableCell key={header.id} align='center' sx={{ bgcolor: "#8BB9FF", color: "#EEF2FF", width: header.column.columnDef.width }}>
                      {header.column.columnDef.header}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => {
            const rowStyle = { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFF' };
            return (
              <>
                <TableRow key={row.id} style={rowStyle}>
                  {row.getVisibleCells().map((cell) => {
                    if (!skipAccessorKeys.includes(cell.column.columnDef.accessorKey)) {
                      return (
                        <TableCell key={cell.id} align='center' sx={{ color: "#2A6DD0", borderBottom: "none", fontWeight: "medium" }}>
                          <Typography>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Typography>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
                <TableRow sx={{ border: "none" }} style={rowStyle}>
                  <TableCell colSpan={columns.length} align='left' >
                    <Collapse in={openDesc === row.id} timeout="auto" unmountOnExit>
                      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
                        <Box display={"flex"} flexDirection={"row"} gap={"5px"}>
                          {row.original.imgUnit}
                          <br />
                          {row.original.imgBrand}
                        </Box>
                        <Box marginLeft={"20px"} >
                          <Typography variant='h6' sx={{ color: theme.palette.primary.main, fontWeight: "medium" }}>
                            Deskripsi
                          </Typography>
                          <Typography variant='subtitle' sx={{ color: theme.palette.primary.main, }}>
                            {row.original.descUnit}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableUnit

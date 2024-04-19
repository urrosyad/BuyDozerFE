import React, { useEffect, useState } from 'react'
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton, Collapse,
  CircularProgress,
  Alert,
} from '@mui/material'
import { SwapVertRounded, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { EditButton, DeleteButton } from '@components/admin/Atoms/Buttons';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useQuery } from '@tanstack/react-query';
import formatRupiah from '@utils/formatRupiah';
import axios from 'axios';
import theme from '@src/theme';
import UnitData from './UnitData';


const GET_UNIT = async (props) => {
  const { SearchValue, PageNumber, PageSize, BuySort } = props
  
  // False = Desc && True = Asc
  const BASE_URL_GET_UNIT = `https://localhost:5001/api/HeavyUnits?ParameterUnit=%25${SearchValue}%25&PriceRent=false&PriceBuy=${BuySort}&PageNumber=${PageNumber}&PageSize=${PageSize}`;

  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_GET_UNIT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    
    const dataUnit = response.data.items
    const totalCount = response.data.totalCount
    return {dataUnit, totalCount};
  } catch (error) {   
    console.error('Error fetching Unit:', error);
    // throw error;
  }
};


const TableUnit = (props) => {
  const { SearchValue, PageNumber, PageSize, BuySort} = props

  const [openDesc, setOpenDesc] = useState(null);
  const [page, setPage] = useState(1); // Halaman ke
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah data setiap halaman 
  const [totalData, setTotalData] = useState(0)
  const [buySort, setBuySort] = useState(false)
  const [isModalDeleteOpen, SetIsModalDeleteOpen] = useState(false)



  const fetchData = async () => {
    const {dataUnit, totalCount} = await GET_UNIT({ SearchValue, PageNumber: page, PageSize: rowsPerPage, BuySort: buySort});
    setTotalData(totalCount)
    console.table(dataUnit);
    if (!dataUnit) {
      throw new Error("Failed to fetch data");
    };
    
    const formattedData = dataUnit.map(data => ({
      id: data.id,
      nameUnit: data.nameUnit,
      typeUnit: data.typeUnit,
      descUnit: data.descUnit,
      imgUnit: <img 
      src={data.imgUnit} 
      alt='foto unit' 
      style={{ width: "100px", height: "100px", objectFit: 'cover', borderRadius: "10px", border: "solid 2px #193D71" }}>
              </img>,
      imgBrand: <img 
      src={data.imgBrand} 
      alt='logo brand' 
      style={{ width: "100%", height: "50px", objectFit: 'cover', borderRadius: "5px", border: "solid 2px #193D71" }}>
              </img>,
      priceBuyUnit: formatRupiah(data.priceBuyUnit),
      priceRentUnit: formatRupiah(data.priceRentUnit),
      qtyUnit: data.qtyUnit,
    }));
    return formattedData;
  };
  

  const {
    data, 
    isPending, 
    isFetching, 
    isLoading,
    error,
    refetch } = useQuery
    ({
    queryKey:["Unit"],
    queryFn: fetchData,
    })

  const handleCollapseToggle = (rowId) => {
    setOpenDesc(openDesc === rowId ? null : rowId);
  };

  // handle when move to the next page
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  // handle row per page in pagination 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  // sorting buy column function
  const handleSortBuy = () => {
    setBuySort(!buySort)
  }
  
  const handleEditOnClick = (index) => {
    const clickedData = data[index].nameUnit;
    console.log('Data yang diklik:', clickedData);

    // to send data nameUnit to parent Component
    props.onSelectRow(clickedData);
  }

  const handleDelOnClick = (index) => {
    const idRow = data[index].id;
    const nameUnitRow = data[index].nameUnit;
    console.log('Data yang diklik:', idRow, nameUnitRow);

    // to send data nameUnit to parent Component
    props.onSelectRowId(idRow, nameUnitRow);
  }

  useEffect(() => {
    refetch()
  }, [SearchValue, page, rowsPerPage, buySort, refetch]);

  const skipAccessorKeys = ["imgUnit", "imgBrand"];
  const columns = [
    { accessorKey: "no", header: "No", width: "0%", cell: (props) => <p>{props.row.index + 1}</p> },
    { accessorKey: "imgUnit", header: "Foto Unit", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "imgBrand", header: "Logo Brand", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "nameUnit", header: "Nama Unit", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "typeUnit", header: "Tipe Unit", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "qtyUnit", header: "Ketersediaan Unit", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "priceBuyUnit", header: "Harga Beli", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "priceRentUnit", header: "Harga Sewa", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    {
      accessorKey: "descUnit", header: "", width: "0%", cell: (props) => {
        const rowId = props.row.id;
        const isCollapse = openDesc === rowId;
        return (
          <>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleCollapseToggle(rowId)}>
              {isCollapse ? <KeyboardArrowUp style={{ fontSize: "16px" }} /> : <KeyboardArrowDown style={{ fontSize: "16px" }} />}
            </IconButton>
          </>
        )
      }
    },
    {
      accessorKey: "actions", header: "Aksi", width: "5%", cell: (props) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box>
            <EditButton onClick={()=>handleEditOnClick(props.row.index)} />
          </Box>
          <Box>
            <DeleteButton onClick={()=>handleDelOnClick(props.row.index)}/>
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

  if ( data === undefined ) {
    return (
      <div>
      <CircularProgress size={50} sx={{
        position: "absolute",
        color: "#8BB9FF", 
        marginTop:20,
        marginLeft: 80,
        }}
      />
      </div>
    )
  }

  // console.table(data);
  // console.table({page, rowsPerPage});
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "15px", width: "100%", }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead style={{ height: "1px" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (!skipAccessorKeys.includes(header.column.columnDef.accessorKey)) {
                  return (
                    <TableCell key={header.id} align='center' sx={{ bgcolor: "#8BB9FF", width: header.column.columnDef.width }}>
                      <Typography sx={{ fontSize: "14px", color: "#EEF2FF", fontWeight: "medium" }}>
                        {header.column.columnDef.header}
                        {(header.column.columnDef.accessorKey === "priceBuyUnit") ? (
                          <IconButton sx={{ fontSize: 'small', color: "#F8FAFF" }} onClick={handleSortBuy}>
                            <SwapVertRounded />
                          </IconButton>
                        ) : null }
                      </Typography>
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody key={columns}>
          { data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align='center' sx={{ color: "#2A6DD0" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "medium" }}>
                  {isPending || isFetching ? (
                    <CircularProgress sx={{color: "#2A6DD0"}} />
                  ) : (
                  "Unit tidak ditemukan"
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row, index) => {
              const rowStyle = { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFF' };
              return (
                <>
                  <TableRow key={row.id} style={rowStyle}>
                    {row.getVisibleCells().map((cell) => {
                      if (!skipAccessorKeys.includes(cell.column.columnDef.accessorKey)) {
                        return (
                          <TableCell key={cell.id} align='center' sx={{ color: "#2A6DD0", borderBottom: "none", fontWeight: "medium" }}>
                            <Typography sx={{ fontSize: "14px", }}>
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
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} gap={10}>
                          <Box display={"flex"} flexDirection={"row"} gap={"5px"}>
                            {row.original.imgUnit}
                            <br />
                            {row.original.imgBrand}
                          </Box>
                          <Box sx={{ marginLeft: "20px", padding: 1, border: "2px solid #8BB9FF", borderRadius: "10px" }} >
                            <Typography sx={{ fontSize: "16px", color: theme.palette.primary.main, fontWeight: "medium" }}>
                              Deskripsi
                            </Typography>
                            <Typography sx={{ fontSize: "14px", color: theme.palette.primary.main, }}>
                              {row.original.descUnit}
                            </Typography>
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              )
            }
            )
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalData}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default TableUnit

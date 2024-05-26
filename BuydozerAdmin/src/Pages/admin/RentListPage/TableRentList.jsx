import { useQuery } from '@tanstack/react-query';
import { GET_RENT_LIST } from '@api/api';
import { useEffect, useState } from 'react'
import { SwapVertRounded } from '@mui/icons-material';
import { EditButton, DeleteButton } from '@components/admin/Atoms/Buttons';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton,
  CircularProgress
} from '@mui/material'

const TableRentList = ( props ) => {
  const { SearchValue } = props
  const [page, setPage] = useState(1); // Halaman ke
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah data setiap halaman 
  const [totalData, setTotalData] = useState(0)
  const [buySort, setBuySort] = useState(false)


  const fetchData = async () => {
    const { dataRentList, totalCount } = await GET_RENT_LIST({ SearchValue: SearchValue, PageNumber: page, PageSize: rowsPerPage, BuySort: buySort });
    setTotalData(totalCount)
    if (!dataRentList) {
      throw new Error("Failed to fetch data");
    };

    const formattedData = dataRentList.map(data => ({
      id: data.id,
      nameRent: data.nameRent,
      priceRentUnit: data.priceRentUnit * 100 / 100 + "% dari harga total",
      months: data.months + " Bulan",
    }));
    return formattedData;
  };

  const { data, isPending, isFetching, isLoading, error, refetch } = useQuery({
    queryKey: ["RentList"],
    queryFn: fetchData,
  })

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
    const clickedData = data[index].nameRent;
    // to send data nameRent to parent Component
    props.onSelectRow(clickedData);
  }

  const handleDelOnClick = (index) => {
    const idRow = data[index].id;
    const nameRentRow = data[index].nameRent;
    // to send data nameRent to parent Component
    props.onSelectRowId(idRow, nameRentRow);
  }

  useEffect(() => {
    refetch()
  }, [SearchValue, page, rowsPerPage, buySort, refetch]);

  const skipAccessorKeys = ["imgRentList", "imgBrand"];
  const columns = [
    { accessorKey: "no", header: "No", width: "0%", cell: (props) => <p>{props.row.index + 1}</p> },
    { accessorKey: "nameRent", header: "Nama Opsi Sewa", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "priceRentUnit", header: "Pajak Sewa", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "months", header: "Bulan Sewa", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    {
      accessorKey: "actions", header: "Aksi", width: "5%", cell: (props) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box>
            <EditButton onClick={() => handleEditOnClick(props.row.index)} />
          </Box>
          <Box>
            <DeleteButton onClick={() => handleDelOnClick(props.row.index)} />
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

  if (data === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
        <CircularProgress size={50} sx={{
          color: "#8BB9FF",
          mb: 20
        }}
        />
      </Box>
    )
  }

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
                        {(header.column.columnDef.accessorKey === "priceBuyRentList") ? (
                          <IconButton sx={{ fontSize: 'small', color: "#F8FAFF" }} onClick={handleSortBuy}>
                            <SwapVertRounded />
                          </IconButton>
                        ) : null}
                      </Typography>
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody key={columns}>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align='center' sx={{ color: "#2A6DD0" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "medium" }}>
                  {isPending || isFetching ? (
                    <CircularProgress sx={{ color: "#2A6DD0" }} />
                  ) : (
                    "RentList tidak ditemukan"
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

export default TableRentList

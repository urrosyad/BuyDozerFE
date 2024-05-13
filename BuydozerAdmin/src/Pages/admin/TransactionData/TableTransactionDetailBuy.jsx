import React, { useEffect, useState } from 'react'
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton, Collapse,
  CircularProgress, Button
} from '@mui/material'
import { SwapVertRounded, KeyboardArrowDown, KeyboardArrowUp, KeyRounded, KeyOffRounded } from '@mui/icons-material';
import { EditButton, DeleteButton, KeyButton } from '@components/admin/Atoms/Buttons';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useQuery } from '@tanstack/react-query';
import formatRupiah from '@utils/formatRupiah';
import { formatDate, formatDateTime } from '@utils/formatDate';
import axios from 'axios';
import theme from '@src/theme';

const GET_TRANSACTION_BUY = async (props) => {
  const { SearchValue, PageNumber, PageSize, SortDate } = props

  // False = Desc && True = Asc
  const BASE_URL_TRANSACTION = `https://localhost:5001/api/TransactionDetailBuy/GetTransactionDetailBuy?ParameterUserName=${SearchValue}&ParameterTransactionNumber=%25${SearchValue}%25&SortDate=${SortDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`;
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_TRANSACTION, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataTransaksi = response.data.items
    const totalCount = response.data.totalCount
    return { dataTransaksi, totalCount };

  } catch (error) {
    console.error('Error fetching User:', error);
    // throw error;
  }
};


const TableTransactionDetailBuy = (props) => {
  const { SearchValue, sortDate, PageNumber, PageSize, ParameterName, statusConfig } = props

  const [openDesc, setOpenDesc] = useState(null);
  const [page, setPage] = useState(1); // Halaman ke
  const [totalData, setTotalData] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah data setiap halaman 
  // const [sortDate, setSortDate] = useState(false)

  const fetchData = async () => {
    const { dataTransaksi, totalCount } = await GET_TRANSACTION_BUY({ SearchValue, PageNumber: page, PageSize: rowsPerPage, SortDate: sortDate });
    setTotalData(totalCount);
    // console.log("fetch data", dataTransaksi); sudah selalu bisa

    console.log("ini adalah data tanggal", dataTransaksi);

    if (!dataTransaksi) {
      throw new Error("Failed to fetch data");
    };

    const formattedData = dataTransaksi.map(data => ({
      id: data.id,
      transactionNum: data.transactionNum,
      nameUnit: data.unit.nameUnit,
      priceRentUnit: formatRupiah(data.unit.priceRentUnit),
      userName: data.user.userName,
      receiverName: data.receiverName,
      receiverHp: data.receiverHp,
      receiverAddress: data.receiverAddress,
      qtyTransaction: data.qtyTransaction,
      dateTransaction: formatDate(data.dateTransaction),
      statusTransaction: data.statusTransaction,
      created: formatDateTime(data.created),
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
        queryKey: ["TransactionRent"],
        queryFn: fetchData,
      })



  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleSortDate = () => {
    setSortDate(!sortDate)
  }

  const handleDetailOnClick = (index) => {
    const clickedData = data[index].transactionNum;
    console.log('Data yang diklik:', clickedData);

    // to send data nameUnit to parent Component
    props.onSelectRow(clickedData);
  }

  const handleKeyOnClick = (index) => {
    const idRow = data[index].id;
    const roleRow = data[index].isAdmin;
    const userNameRow = data[index].userName;
    console.log("Ini IdRow", idRow);

    props.onSelectRowRole(idRow, roleRow, userNameRow);
  }

  useEffect(() => {
    refetch()
  }, [SearchValue, page, rowsPerPage, sortDate, refetch]);


  // const skipAccessorKeys = ["imgUnit", "imgBrand"];
  const columns = [
    { accessorKey: "no", header: "No", width: "0%", cell: (props) => <p>{props.row.index + 1}</p> },
    { accessorKey: "transactionNum", header: "Nomor Transaksi", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "nameUnit", header: "Name Unit", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "priceRentUnit", header: "Harga Sewa Unit", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "qtyTransaction", header: "Kuantitas Barang", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "userName", header: "Nama Pengguna", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "dateTransaction", header: "Tanggal Transaksi", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "created", header: "Tanggal Dibuat", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    {
      accessorKey: "statusTransaction", header: "Status", width: "5%", cell: (props) => {
        const status = statusConfig[props.getValue()] || { content: "Unknown", color: "" };
        console.log(data);
        return (
          <Button variant="contained" sx={{
            width: "100px", color: "white", bgcolor: status.color, borderRadius: "10px", boxShadow: 'unset', ":hover": {
              bgcolor: status.color
            }
          }}>
            {status.content}
          </Button>
        );

      }
    },
    {
      accessorKey: "action", header: "Aksi", width: "5%", cell: (props) => {
        return (
          <Button variant="contained" color='primaryLight' sx={{ color: "white", borderRadius: "10px", boxShadow: 'unset' }} onClick={() => { handleDetailOnClick(props.row.index) }}>
            Detail
          </Button>
        );

      }
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  if (data === undefined) {
    return (
      <div>
        <CircularProgress size={50} sx={{
          position: "absolute",
          color: "#8BB9FF",
          marginTop: 20,
          marginLeft: 68,
        }}
        />
      </div>
    )
  }

  // console.log("ini log dari data table", data)
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "15px", width: "100%", }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead style={{ height: "1px" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id} align='center' sx={{ bgcolor: "#8BB9FF", width: header.column.columnDef.width }}>
                    <Typography sx={{ fontSize: "14px", color: "#EEF2FF", fontWeight: "medium" }}>
                      {header.column.columnDef.header}
                    </Typography>
                  </TableCell>
                );
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
                    "Transaksi pembelian tidak ditemukan"
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row, index) => {
              const rowStyle = { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFF' };
              return (
                <>
                  <TableRow hover role="checkbox" key={row.id} style={rowStyle} sx={{
                    ":hover": {
                      bgcolor: "lightblue"
                    }
                  }}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} align='center' sx={{ color: "#2A6DD0", borderBottom: "none", fontWeight: "medium", overflow: "wrap" }}>
                          <Typography sx={{ fontSize: "14px", }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Typography>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </>
              )
            }))}
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

export default TableTransactionDetailBuy

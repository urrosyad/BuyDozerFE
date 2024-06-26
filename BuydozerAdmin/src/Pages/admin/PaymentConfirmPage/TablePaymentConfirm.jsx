import { useFormik } from 'formik';
import { API_BASE_URL } from '../../../config';
import { useEffect, useState } from 'react'
import { formatDate, formatDateTime } from '@utils/formatDate';
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Clear, ImageSearch, CheckCircleOutline } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PUT_TRANSACTION_STATUS_BUY, PUT_TRANSACTION_STATUS_RENT } from '@api/api';
import {
  Box, Typography,
  Table, TableContainer,
  TableBody, TableCell,
  TableHead, TableRow,
  Paper, TablePagination,
  IconButton,
  CircularProgress, Button,
  Tooltip
} from '@mui/material'
import Swal from 'sweetalert2'
import axios from 'axios';
import formatRupiah from '@utils/formatRupiah';
import { useNavigate } from 'react-router-dom';


const GET_TRANSACTION = async (props) => {
  const { SearchValue, PageNumber, PageSize, SortDate } = props
  const BASE_URL_TRANSACTION = `${API_BASE_URL}/api/TransactionOnGoing/GetTransactionOnGoing?ParameterTransactionNumber=%25${SearchValue}%25&ParameterUserName=%25${SearchValue}%25&ParameterStatus=2&SortDate=${SortDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`;
  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_TRANSACTION, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data.items
    const totalCount = response.data.totalCount
    return { data, totalCount };

  } catch (error) {
    console.error('Error fetching User:', error);
  }
};

const TablePaymentConfirm = (props) => {
  const navigate = useNavigate()
  const { SearchValue, sortDate, statusConfig } = props
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1); // Halaman ke
  const [totalData, setTotalData] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah data setiap halaman 

  const formik = useFormik({
    initialValues: {
      id: null,
      statusTransaction: 0,
      transactionNum: "",
      isBuy: false,
      actionType: ""
    }
  })

  const fetchData = async () => {
    const { data, totalCount } = await GET_TRANSACTION({ SearchValue, PageNumber: page, PageSize: rowsPerPage, SortDate: sortDate });
    setTotalData(totalCount);

    if (!data) {
      throw new Error("Failed to fetch data");
    };

    const formattedData = data.map(data => ({
      id: data.id,
      transactionNum: data.transactionNum,
      userName: data.userName,
      receiverName: data.receiverName,
      receiverHp: data.receiverHp,
      receiverAddress: data.receiverAddress,
      qtyTransaction: data.qtyTransaction,
      totalPriceTransaction: formatRupiah(data.totalPriceTransaction),
      dateTransaction: formatDate(data.dateTransaction),
      statusTransaction: data.statusTransaction,
      isBuy: data.isBuy ? "Pembelian" : "Penyewaan",
      paymentConfirmationReceipt: data.paymentConfirmationReceipt
    }));
    return formattedData;
  };

  const {
    data,
    isPending,
    isFetching,
    error: errorTransaction,
    refetch } = useQuery
      ({
        queryKey: ["Transaction"],
        queryFn: fetchData,
      })

  // Update Status of Transaction Buy
  const { mutate: putConfirmBuy, error: errorConfirmBuy, isSuccess: ConfirmBuyIsSuccess } = useMutation({
    mutationFn: PUT_TRANSACTION_STATUS_BUY,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['TransactionBuy'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan update:", error);
    },
  })

  // Update Status of Transaction Rent
  const { mutate: putConfirmRent, error: errorConfirmRent, isSuccess: ConfirmRentIsSuccess } = useMutation({
    mutationFn: PUT_TRANSACTION_STATUS_RENT,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['TransactionRent'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan update:", error);
    },
  })


  useEffect(() => {
    if (formik.values.id !== null) {
      {
        formik.values.actionType
          ?
          (handleApproval(
            true,
            formik.values.transactionNum,
            formik.values.id,
            formik.values.statusTransaction,
            formik.values.isBuy))
          :
          (handleApproval(
            false,
            formik.values.transactionNum,
            formik.values.id,
            formik.values.statusTransaction,
            formik.values.isBuy))
      }
    }
  }, [formik.values.id, formik.values.statusTransaction]);


  if (errorTransaction || errorConfirmBuy || errorConfirmRent) {
    navigate("/*")
  }

  // Handle Modal for Confirmation and Cancel Transaction
  const handleApproval = (isConfirm, trxNum, trxId, trxStatus, trxType) => {
    const action = isConfirm ? "Konfirmasi" : "Tolak";
    Swal.fire({
      title: `Apakah kamu yakin untuk ${action.toLowerCase()} transaksi ${trxNum}?`,
      text: "Jika masih ragu check datanya sekali lagi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${action}!`
    }).then((result) => {
      if (result.isConfirmed) {
        {
          trxType === "Pembelian"
            ? putConfirmBuy({id: trxId, statusTransaction: trxStatus})
            : putConfirmRent({id: trxId, statusTransaction: trxStatus})
        }
        Swal.fire({
          title: `Ter${action.toLowerCase()}!`,
          text: `Data berhasil di${action.toLowerCase()}!`,
          icon: "success"
        });
        refetch();
      }
    });
  }

  // Handle when Image button is clicked
  const handleShowImageOnClick = (index) => {
    const clickedData = data[index].paymentConfirmationReceipt;
    // to send data nameUnit to parent Component
    props.onSelectRow(clickedData);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  useEffect(() => {
    refetch()
  }, [refetch, data, SearchValue, page, rowsPerPage, sortDate]);

  const hiddenAccessorKey = ["id", "paymentConfirmationReceipt"];
  const columns = [
    { accessorKey: "no", header: "No", width: "0%", cell: (props) => <span>{props.row.index + 1}</span> },
    { accessorKey: "id", header: "Id", width: "0%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "paymentConfirmationReceipt", header: "Bukti Pembayaran", width: "0%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "isBuy", header: "Transaksi", width: "10%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "transactionNum", header: "Nomor Transaksi", width: "10%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "userName", header: "Nama Pengguna", width: "5%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "receiverName", header: "Nama Penerima", width: "5%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "receiverHp", header: "Telepon Penerima", width: "5%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "receiverAddress", header: "Alamat Penerima", width: "5%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "qtyTransaction", header: "Kuantitas Barang", width: "5%", cell: (props) => <span>{props.getValue()}</span> },
    { accessorKey: "dateTransaction", header: "Tanggal Transaksi", width: "5%", cell: (props) => <span>{props.getValue()}</span> },
    {
      accessorKey: "statusTransaction", header: "Status", width: "5%", cell: (props) => {
        const status = statusConfig[props.getValue()] || { content: "Unknown", color: "" };
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
          <Box>

            <Box gap={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title="Konfirmasi">
                <IconButton onClick={() => {
                  formik.setValues({
                    id: props.row.original.id,
                    statusTransaction: 3,
                    transactionNum: props.row.original.transactionNum,
                    isBuy: props.row.original.isBuy,
                    actionType: true
                  });
                }}>
                  <CheckCircleOutline color='success'></CheckCircleOutline>
                </IconButton>
              </Tooltip>
              <Tooltip title="Lihat Gambar">
                <IconButton onClick={() => handleShowImageOnClick(props.row.index)}>
                  <ImageSearch color='warning'></ImageSearch>
                </IconButton>
              </Tooltip>
              <Tooltip title="Tolak">
                <IconButton onClick={() => {
                  formik.setValues({
                    id: props.row.original.id,
                    statusTransaction: 0,
                    transactionNum: props.row.original.transactionNum,
                    isBuy: props.row.original.isBuy,
                    actionType: false
                  });
                }}>
                  <Clear color='error'></Clear>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
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
                if (!hiddenAccessorKey.includes(header.column.columnDef.accessorKey)) {

                  return (
                    <TableCell key={header.id} align='center' sx={{ bgcolor: "#8BB9FF", width: header.column.columnDef.width }}>
                      <Typography sx={{ fontSize: "14px", color: "#EEF2FF", fontWeight: "medium" }}>
                        {header.column.columnDef.header}
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
                    "Transaksi pembelian dan penyewaan tidak ditemukan"
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
                      if (!hiddenAccessorKey.includes(cell.column.columnDef.accessorKey)) {
                        return (
                          <TableCell key={cell.id} align='center' sx={{ color: "#2A6DD0", borderBottom: "none", fontWeight: "medium", overflow: "wrap" }}>
                            <Typography sx={{ fontSize: "14px", }}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Typography>
                          </TableCell>
                        )
                      }
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

export default TablePaymentConfirm

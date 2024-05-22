import React, { useEffect, useState } from 'react'
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
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import formatRupiah from '@utils/formatRupiah';
import { formatDate, formatDateTime } from '@utils/formatDate';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Swal from 'sweetalert2'
import { useFormik } from 'formik';


const GET_TRANSACTION = async (props) => {
  const { SearchValue, PageNumber, PageSize, SortDate, statusConfig } = props
  const BASE_URL_TRANSACTION = `https://localhost:5001/api/TransactionOnGoing/GetTransactionOnGoing?ParameterTransactionNumber=%25${SearchValue}%25&ParameterUserName=%25${SearchValue}%25&ParameterStatus=2&SortDate=${SortDate}&PageNumber=${PageNumber}&PageSize=${PageSize}`;
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
  }
};

const PUT_TRANSACTION_STATUS = async ({ id, statusTransaction }) => {
  const requestBody = ({ id, statusTransaction })
  const BASE_URL_PUT_TRANSACTION_STATUS = `https://localhost:5001/api/TransactionDetailBuy/UpdateTransactionDetailBuy/${id}`
  const accessToken = localStorage.getItem('AccessToken')
  try {
    const response = await axios.put(BASE_URL_PUT_TRANSACTION_STATUS, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataTransaksi = response.data
    console.log("BERHASIL KONFIRMASI");
    return dataTransaksi;
  } catch (error) {
    console.error('Error while Put Unit:', error);
    throw error
  }
}


const TablePaymentConfirm = (props) => {
  const { SearchValue, sortDate, PageNumber, PageSize, ParameterName, statusConfig } = props
  const queryClient = useQueryClient()
  const [openDesc, setOpenDesc] = useState(null);
  const [page, setPage] = useState(1); // Halaman ke
  const [totalData, setTotalData] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Jumlah data setiap halaman 

  const formik = useFormik({
    initialValues: {
      id: null,
      statusTransaction: 0
    }
  })
  // console.log("INI LOG FOMIK", formik.values);

  const fetchData = async () => {
    const { dataTransaksi, totalCount } = await GET_TRANSACTION({ SearchValue, PageNumber: page, PageSize: rowsPerPage, SortDate: sortDate });
    setTotalData(totalCount);

    console.log("ini adalah data TRX", dataTransaksi);

    if (!dataTransaksi) {
      throw new Error("Failed to fetch data");
    };

    const formattedData = dataTransaksi.map(data => ({
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
      created: formatDateTime(data.created),
      paymentConfirmationReceipt: data.paymentConfirmationReceipt
    }));
    return formattedData;
  };

  const {
    data,
    isPending,
    isFetching,
    refetch } = useQuery
      ({
        queryKey: ["Transaction"],
        queryFn: fetchData,
      })


  const { mutate: putConfirm, error: errorConfirm, isSuccess: ConfirmIsSuccess } = useMutation({
    mutationFn: PUT_TRANSACTION_STATUS,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['Transaction'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan update:", error);
    },
  })

  const handleApproval = (isConfirm, trxnum, trxData) => {
    const action = isConfirm ? "Konfirmasi" : "Tolak";
    Swal.fire({
      title: `Apakah kamu yakin untuk ${action.toLowerCase()} transaksi ${trxnum}?`,
      text: "Jika masih ragu check datanya sekali lagi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${action}!`
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("data trxNum: ", trxnum, "\nData trxData:", trxData);
        putConfirm(formik.values)
        Swal.fire({
          title: `Ter${action.toLowerCase()}!`,
          text: `Data berhasil di${action.toLowerCase()}!`,
          icon: "success"
        });
        refetch();
      }
    });
  }

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
  }, [data, SearchValue, page, rowsPerPage, sortDate, refetch]);

  const hiddenAccessorKey = ["id", "paymentConfirmationReceipt"];
  const columns = [
    { accessorKey: "no", header: "No", width: "0%", cell: (props) => <p>{props.row.index + 1}</p> },
    { accessorKey: "id", header: "Id", width: "0%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "paymentConfirmationReceipt", header: "Bukti Pembayaran", width: "0%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "transactionNum", header: "Nomor Transaksi", width: "10%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "userName", header: "Nama Pengguna", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "receiverName", header: "Nama Penerima", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "receiverHp", header: "Telepon Penerima", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "receiverAddress", header: "Alamat Penerima", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "qtyTransaction", header: "Kuantitas Barang", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "dateTransaction", header: "Tanggal Transaksi", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    { accessorKey: "created", header: "Tanggal Dibuat", width: "5%", cell: (props) => <p>{props.getValue()}</p> },
    {
      accessorKey: "statusTransaction", header: "Status", width: "5%", cell: (props) => {
        const status = statusConfig[props.getValue()] || { content: "Unknown", color: "" };
        // console.log(data);
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
                    statusTransaction: 3
                  })

                  // console.log("INI PUT VALUES DI ICON", formik.values);
                  handleApproval(true, props.row.original.transactionNum, formik)

                }}>
                  <CheckCircleOutlineIcon color='success'></CheckCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Lihat Gambar">
                <IconButton onClick={() => handleShowImageOnClick(props.row.index)}>
                  <ImageSearchIcon color='warning'></ImageSearchIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Tolak">
                <IconButton onClick={() => {
                  const putValues = { id: props.row.original.id, statusTransaction: 0 };
                  handleApproval(false, props.row.original.transactionNum, putValues)
                }}>
                  <ClearIcon color='error'></ClearIcon>
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

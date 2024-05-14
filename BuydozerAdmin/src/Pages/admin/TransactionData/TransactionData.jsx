import React, { useState } from 'react'
import {
  Card,
  Box, Typography,
  Grid, InputBase, Alert, Tab,
  Select,
  MenuItem
} from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SearchRounded } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { unitSchema } from '@schemas';
import axios from 'axios';
import theme from '@src/theme';
import TableTransactionDetailBuy from './TableTransactionDetailBuy';
import TableTransactionDetailRent from './TableTransactionDetailRent';
import AddButton from '@components/admin/Atoms/Buttons/AddButton';
import ModalUser from '@components/admin/Atoms/Modal/ModalUser';
import ModalConfirm from '@components/admin/Atoms/Modal/ModalConfirm';
import imgConvert from '@utils/imgConvert';
import SeverityAlert from '@components/admin/Atoms/Alert/SeverityAlert';
import * as yup from 'yup';
import { formatDateTimeOffset, formatDateTime } from '@utils/formatDate';
import formatRupiah from '@utils/formatRupiah'
import ModalTransactionDetailBuy from '../../../Components/admin/Atoms/Modal/ModalTrxDetail';
import ModalTrxDetail from '@components/admin/Atoms/Modal/ModalTrxDetail';

// ubah
const initialValues = {
  id: "",
  transactionNum: "",
  nameUnit: "",
  priceRentUnit: "",
  userName: "",
  receiverName: "",
  receiverHp: "",
  receiverAddress: "",
  qtyTransaction: "",
  dateTransaction: "",
  statusTransaction: "",
}

const GET_TRANSACTION_RENT = async (props) => {
  const { SortDate, searchValue, transactionNum } = props
  console.log('nomor transaksi: ', transactionNum);

  const BASE_URL_GET_TRANSACTIONRENT = `https://localhost:5001/api/TransactionDetailRents/GetTransactionDetailRent?ParameterUserName=%25${searchValue}%25&ParameterTransactionNumber=%25${searchValue}%25&SortDate=${SortDate}&PageNumber=1&PageSize=1`;

  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTIONRENT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataTransaksiRent = response.data.items
    // console.log('log data unit dari api: ', dataUnit);
    return dataTransaksiRent

  } catch (error) {
    throw error;
  }
};
const GET_TRANSACTION_BUY = async (props) => {
  const { SortDate, searchValue, transactionNum } = props
  console.log('nomor transaksi: ', transactionNum);

  const BASE_URL_GET_TRANSACTIONBUY = `https://localhost:5001/api/TransactionDetailBuy/GetTransactionDetailBuy?ParameterUserName=%25${searchValue}%25&ParameterTransactionNumber=%25${searchValue}%25&SortDate=${SortDate}&PageNumber=1&PageSize=1`;

  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTIONBUY, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataTransaksiBuy = response.data.items
    // console.log('log data unit dari api: ', dataUnit);
    return dataTransaksiBuy

  } catch (error) {
    throw error;
  }
};

const TransactionData = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortDate, setSortDate] = useState(false);
  console.log(sortDate);
  const [tab, setTab] = useState('buy');
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDelOpen, setIsModalDelOpen] = useState(false)
  const [isModalKeyOpen, setIsModalKeyOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const queryClient = useQueryClient()
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: unitSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      {
        isEdit
          ? putUser({ id: values.id, userValues: values })
          : null
      }
    }
  })
  console.log('log data unit dari formik values: ', formik.values);


  const handleCancelForm = () => {
    setIsModalEditOpen(false);
    setIsModalDelOpen(false);
    setIsModalKeyOpen(false);
    setIsEdit(false);
    setIsDel(false);
    formik.handleReset(formik.values);
  }

  const handleSelectRow = async (searchValue) => {
    setIsEdit(true)
    setIsModalEditOpen(true)
    console.log(`data yang dikirimkan ${searchValue}`);

    const fetchData = tab != "buy" ? await GET_TRANSACTION_RENT({ searchValue: searchValue, SortDate: sortDate }) : await GET_TRANSACTION_BUY({ searchValue: searchValue, SortDate: sortDate })
    console.log(fetchData)
    console.log("ini console log fetchData", fetchData[0].userName);
    { !fetchData ? console.log("data sedang loading") : console.log("data berhasil di fetching") }

    const valuesToSet =
    {
      ...formik.values,
      transactionNum: fetchData[0].transactionNum,
      nameUnit: fetchData[0].nameUnit,
      userName: fetchData[0].userName,
      receiverName: fetchData[0].receiverName,
      receiverHp: fetchData[0].receiverHp,
      receiverAddress: fetchData[0].receiverAddress,
      qtyTransaction: fetchData[0].qtyTransaction,
      dateTransaction: fetchData[0].dateTransaction,
      statusTransaction: fetchData[0].statusTransaction,
      created: fetchData[0].created,
      totalPriceTransaction: fetchData[0].totalPriceTransaction
    };
    if (tab != 'buy') {
      // Jika tab bukan "buy", maka Anda perlu mengatur dateRent dan dateReturn
      valuesToSet.dateRent = fetchData[0].dateRent;
      valuesToSet.dateReturn = fetchData[0].dateReturn;
      valuesToSet.priceRentUnit = fetchData[0].priceRentUnit;

    } else {
      valuesToSet.priceBuyUnit = fetchData[0].priceBuyUnit;
    }
    formik.setValues(valuesToSet);

  };

  // ubah nameUnit jd userName
  const handleSelectRowId = async (id, userName) => {
    setIsDel(true)
    setIsModalDelOpen(true)
    console.log(`data yang diterima UserData`, id, userName);

    formik.setValues({
      id: id,
      userName: userName
    });
  };

  const handleSelectRowRole = async (id, isAdmin, userName) => {
    setIsModalKeyOpen(true)
    console.log(`data isAdmin`, id, isAdmin, userName);

    formik.setValues({
      id: id,
      userName: userName,
      isAdmin: isAdmin
    });
  };

  const handlePutSubmit = async () => {
    putUser({ id: formik.values.id, userValues: formik.values })
  }

  const handleDelSubmit = async () => {
    delUser({ id: formik.values.id })
  }

  const handlePutRoleAdmin = async () => {
    console.log("ini log dari handlePutRoleAdmin", formik.values.id);
    putIsAdminUser({ id: formik.values.id })
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  const handleSortDate = () => {
    setSortDate(!sortDate)
  };

  const handlePostChange = async (event) => {
    const { name, value } = event.target;
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
    console.table("Ini ADALAH INPUTAN FORMIK POST CANGE" + formik.values);
  };


  const handleTabsChange = (event, newTab) => {
    setTab(newTab);
  };

  const labelDetailBuy = [
    { name: "transactionNum", label: "Nomor Transaksi", value: formik.values.transactionNum, type: "text" },
    { name: "nameUnit", label: "Nama Unit", value: formik.values.nameUnit, type: "text" },
    { name: "priceBuyUnit", label: "Harga Beli", value: formik.values.priceBuyUnit, type: "number" },
    { name: "userName", label: "Nama Pengguna", value: formik.values.userName, type: "text" },
    { name: "receiverName", label: "Nama Penerima", value: formik.values.receiverName, type: "text" },
    { name: "receiverHp", label: "Telepon Penerima", value: formik.values.receiverHp, type: "text" },
    { name: "receiverAddress", label: "Alamat Penerima", value: formik.values.receiverAddress, type: "text" },
    { name: "qtyTransaction", label: "Qty Unit", value: formik.values.qtyTransaction, type: "number" },
    { name: "dateTransaction ", label: "Tanggal Transaksi", value: formik.values.dateTransaction, type: "date" },
    { name: "created", label: "Tanggal Dibuat", value: formatDateTime(formik.values.created), type: "text" },
    { name: "totalPriceTransaction", label: "Total Harga Transaksi", value: formik.values.totalPriceTransaction, type: "number" },

    // { name: "statusTransaction ", label: "Status", value: formik.values.statusTransaction, type: "integer" },
  ]
  const labelDetailRent = [
    { name: "transactionNum", label: "Nomor Transaksi", value: formik.values.transactionNum, type: "text" },
    { name: "nameUnit", label: "Nama Unit", value: formik.values.nameUnit, type: "text" },
    { name: "priceRentUnit", label: "Harga Sewa", value: formik.values.priceRentUnit, type: "number" },
    { name: "userName", label: "Nama Pengguna", value: formik.values.userName, type: "text" },
    { name: "receiverName", label: "Nama Penerima", value: formik.values.receiverName, type: "text" },
    { name: "receiverHp", label: "Telepon Penerima", value: formik.values.receiverHp, type: "text" },
    { name: "receiverAddress", label: "Alamat Penerima", value: formik.values.receiverAddress, type: "text" },
    { name: "qtyTransaction", label: "Qty Unit", value: formik.values.qtyTransaction, type: "text" },
    { name: "dateTransaction ", label: "Tanggal Transaksi", value: formik.values.dateTransaction, type: "date" },
    { name: "created ", label: "Tanggal Dibuat", value: formatDateTime(formik.values.created), type: "text" },
    { name: "dateRent", label: "Tanggal Sewa", value: formik.values.dateRent, type: "date" },
    { name: "dateReturn ", label: "Tanggal Kembali", value: formik.values.dateReturn, type: "date" },
    { name: "totalPriceTransaction", label: "Total Harga Transaksi", value: formik.values.totalPriceTransaction, type: "number" },

  ]

  const statusConfig = [
    { content: "Reject", color: "#EC3535" },
    { content: "Ongoing", color: "#C4C4C4" },
    { content: "Paid", color: "#28D156" },
    { content: "Finished", color: "#1937D1" },
  ];

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
        <Box sx={{ width: '100%' }}>
          <TabContext value={tab}>
            <Box sx={{ width: "100%", pl: "25px" }}>
              <TabList onChange={handleTabsChange} aria-label="tab transaksi" >
                <Tab label="Pembelian" value="buy" />
                <Tab label="Penyewaan" value="rent" />
              </TabList>
            </Box>
            <TabPanel value="buy">
              <Box sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row", rowGap: 10, m: "15px" }}>
                <Typography variant='h5' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
                  Data Transaksi Beli
                </Typography>

                <Box gap={1} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
                    <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
                    <InputBase sx={{
                      pl: "10px", color: theme.palette.primary.main, fontWeight: "medium", fontSize: "14px"
                    }} placeholder='Cari User atau TRX...'
                      value={searchValue} onChange={handleSearch} />
                  </Box>
                  <Box>
                    <Select
                      color='primary'
                      value={sortDate}
                      onChange={handleSortDate}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}>
                      <MenuItem value={true}> Terlama </MenuItem>
                      <MenuItem value={false}> Terbaru </MenuItem>
                    </Select>
                  </Box>
                  <ModalTrxDetail
                    typeModal={"Transaksi Beli"}
                    formik={formik}
                    isOpen={isModalEditOpen}
                    labelInput={labelDetailBuy}
                    onClose={handleCancelForm}
                    statusConfig={statusConfig}
                  />
                </Box>
              </Box>
              <TableTransactionDetailBuy
                sortDate={sortDate}
                SearchValue={searchValue}
                onSelectRow={handleSelectRow}
                onSelectRowId={handleSelectRowId}
                statusConfig={statusConfig}
              />
            </TabPanel>
            <TabPanel value="rent">
              <Box sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row", rowGap: 10, m: "15px" }}>
                <Typography variant='h5' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
                  Data Transaksi Sewa
                </Typography>

                <Box gap={1} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
                    <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
                    <InputBase sx={{
                      pl: "10px", color: theme.palette.primary.main, fontWeight: "medium", fontSize: "14px"
                    }} placeholder='Cari User atau TRX...'
                      value={searchValue} onChange={handleSearch} />
                  </Box>
                  <Box>
                    <Select
                      value={sortDate}
                      onChange={handleSortDate}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}>
                      <MenuItem value={true}> Terlama </MenuItem>
                      <MenuItem value={false}> Terbaru </MenuItem>
                    </Select>
                  </Box>
                  <ModalTrxDetail
                    typeModal={"Transaksi Sewa"}
                    formik={formik}
                    isOpen={isModalEditOpen}
                    labelInput={labelDetailRent}
                    onClose={handleCancelForm}
                    statusConfig={statusConfig}
                  />
                </Box>
              </Box>
              <TableTransactionDetailRent
                sortDate={sortDate}
                SearchValue={searchValue}
                onSelectRow={handleSelectRow}
                onSelectRowId={handleSelectRowId}
                statusConfig={statusConfig}
              />

            </TabPanel>
          </TabContext>
        </Box>

        {/* {putIsSuccess && <SeverityAlert severity={"success"} message={"Data User Berhasil Diedit"} />}
        {delIsSuccess && <SeverityAlert severity={"success"} message={"Data User Berhasil Dihapus"} />}
        {putIsAdminSuccess && <SeverityAlert severity={"success"} message={"Data User Berhasil Dihapus"} />}
        {putError && <SeverityAlert severity={"error"} message={`Gagal Mengedit Data: ${putError}`} />}
        {putIsAdminError && <SeverityAlert severity={"error"} message={`Gagal Mengedit Data User: ${putIsAdminError}`} />}
        {delError && <SeverityAlert severity={"error"} message={`Gagal Menghapus Data: ${delError}`} />} */}

      </Card>
    </Grid>
  )
}

export default TransactionData
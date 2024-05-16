import React, { useState } from 'react'
import {
  Card,
  Box, Typography,
  Grid, InputBase,
  Select,
  MenuItem
} from '@mui/material'
import { SearchRounded } from '@mui/icons-material';
import { useFormik } from 'formik';
import { unitSchema } from '@schemas';
import theme from '@themes/theme';
import TablePaymentConfirm from './TablePaymentConfirm';
import ModalPaymentConfirm from '../../../Components/admin/Atoms/Modal/ModalPaymentConfirm';

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
  paymentConfirmationReceipt: ""
}

const PaymentConfirmData = () => {
  const [searchValue, setSearchValue] = useState('');
  const [sortDate, setSortDate] = useState(false);
  const [isModalEditOpenImage, setIsModalEditOpenImage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
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
  console.log('LOG DATA FORMIK: ', formik.values);


  const handleCancelForm = () => {
    setIsModalEditOpenImage(false);
    setIsModalDelOpen(false);
    setIsModalKeyOpen(false);
    setIsEdit(false);
    setIsDel(false);
    formik.handleReset(formik.values);
  }

  const handleSelectRow = async (paymentConfirmationReceipt) => {
    setIsEdit(true)
    setIsModalEditOpenImage(true)
    console.log(`data yang dikirimkan ${paymentConfirmationReceipt}`);

    formik.setValues({
      paymentConfirmationReceipt: paymentConfirmationReceipt,
    });
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

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };
  const handleSortDate = () => {
    setSortDate(!sortDate)
  };

  const statusConfig = [
    { content: "Reject", color: "#EC3535" },
    { content: "Ongoing", color: "#C4C4C4" },
    { content: "Paid", color: "#28D156" },
    { content: "Finished", color: "#1937D1" },
  ];

  const labelInput = [
    { label: "Foto Brand", name: "paymentConfirmationReceipt", value: formik.values.paymentConfirmationReceipt, type: "file" },
  ]

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
          <Box sx={{ width: "100%", pl: "25px" }}>
          </Box>
          <Box sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row", rowGap: 10, m: "15px" }}>
            <Typography variant='h5' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
              Data Transaksi Terbayar
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
            </Box>
            <ModalPaymentConfirm
              typeModal={"Lihat Gambar"}
              formik={formik}
              isOpen={isModalEditOpenImage}
              labelInput={labelInput}
              onClose={handleCancelForm}
            />
          </Box>
          <TablePaymentConfirm
            sortDate={sortDate}
            SearchValue={searchValue}
            onSelectRow={handleSelectRow}
            onSelectRowId={handleSelectRowId}
            statusConfig={statusConfig}
          />
        </Box>
      </Card>
    </Grid>
  )
}

export default PaymentConfirmData
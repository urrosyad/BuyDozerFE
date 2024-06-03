import React, { useState } from 'react'
import {
  Card,
  Box, Typography,
  Grid, InputBase
} from '@mui/material'
import { SearchRounded } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { rentListSchema } from '@schemas';
import theme from '@themes/theme';
import AddButton from '@components/admin/Atoms/Buttons/AddButton';
import ModalPriceListRent from '@components/admin/Atoms/Modal/ModalPriceListRent';
import ModalConfirm from '@components/admin/Atoms/Modal/ModalConfirm';
import SeverityAlert from '@components/admin/Atoms/Alert/SeverityAlert';
import TableRentList from './TableRentList';
import { GET_RENT_LIST, POST_RENT_LIST, PUT_RENT_LIST, DELETE_RENT_LIST } from '@api/api';

const initialValues = {
  id: "",
  nameUnit: "",
  typeUnit: "",
  descUnit: "",
  imgUnit: "",
  imgBrand: "",
  priceBuyUnit: null,
  priceRentUnit: null,
  qtyUnit: null,
}

const RentListData = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDelOpen, setIsModalDelOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const queryClient = useQueryClient()
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: rentListSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      {
        isEdit
          ? putRentList({ id: values.id, requestBody: values })
          : postRentList({ requestBody: values })
      }
    }
  })


  // CREATE DATA RENT LIST
  const { mutate: postRentList, error: postError, isSuccess: postIsSuccess } = useMutation({
    mutationFn: POST_RENT_LIST,
    onSuccess: (data) => {
      console.log("Data successfully POSTED", data)
      setIsModalAddOpen(false)
      formik.handleReset(formik.values)
      queryClient.invalidateQueries(['RentList'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menambahkan data:", error);
    },
  })

  // UPDATE DATA RENT LIST
  const { mutate: putRentList, error: putError, isSuccess: putIsSuccess } = useMutation({
    mutationFn: PUT_RENT_LIST,
    onSuccess: (data) => {
      console.log("Data successfully UPDATE", data)
      setIsModalEditOpen(false)
      queryClient.invalidateQueries(['RentList'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengedit data:", error);
    },
  })

  // DELETE DATA RENTLIST
  const { mutate: delRentList, error: delError, isSuccess: delIsSuccess } = useMutation({
    mutationFn: DELETE_RENT_LIST,
    onSuccess: (data) => {
      console.log("Data successfully DELETE", data)
      setIsModalDelOpen(false)
      queryClient.invalidateQueries(['RentList'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menghapus data:", error);
    },
  })

  if (postError || putError || delError) {
    navigate("/*")
  }

  const handlePostChange = async (event) => {
    const { name, value } = event.target;
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  const handlePostSubmit = async () => {
    formik.handleSubmit()
  }

  const handlePutSubmit = async () => {
    formik.handleSubmit()
  }

  const handleDelSubmit = async () => {
    delRentList({ id: formik.values.id })
  }

  const handleCancelForm = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setIsModalDelOpen(false);
    setIsEdit(false);
    setIsDel(false);
    formik.handleReset(formik.values);
  }

  const handleSelectRow = async (searchValue) => {
    setIsEdit(true)
    setIsModalEditOpen(true)
    const fetchData = await GET_RENT_LIST({ SearchValue: searchValue })
    formik.setValues({
      ...formik.values,
      ...fetchData.dataRentList[0],
    });
  };

  const handleSelectRowId = async (id, nameRent) => {
    setIsDel(true)
    setIsModalDelOpen(true)
    formik.setValues({
      id: id,
      nameRent: nameRent
    });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };


  const labelInput = [
    { label: "Nama Opsi Sewa", name: "nameRent", value: formik.values.nameRent, type: "text" },
    { label: "Pajak Sewa", name: "priceRentUnit", value: formik.values.priceRentUnit, type: "number" },
    { label: "Bulan", name: "months", value: formik.values.months, type: "number" },
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
        <Box sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row", rowGap: 10, m: "15px" }}>

          <Typography variant='h5' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
            Data List Harga Sewa
          </Typography>

          <Box gap={1} sx={{ display: "flex", justifyContent: "space-between" }}>

            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
              <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
              <InputBase sx={{
                pl: "10px", color: theme.palette.primary.main, fontWeight: "medium", fontSize: "14px"
              }} placeholder='Cari List Harga Sewa...'
                value={searchValue} onChange={handleSearch} />
            </Box>

            <AddButton
              onClick={() => setIsModalAddOpen(true)}
              addName={"Tambah Opsi Sewa"}
            />

            <ModalPriceListRent
              typeModal={"Tambah Opsi Sewa"}
              formik={formik}
              isOpen={isModalAddOpen}
              labelInput={labelInput}
              onChange={handlePostChange}
              onSubmit={handlePostSubmit}
              onClose={handleCancelForm}
            />

            <ModalPriceListRent
              typeModal={"Edit Opsi Sewa"}
              formik={formik}
              isOpen={isModalEditOpen}
              labelInput={labelInput}
              onChange={handlePostChange}
              onSubmit={handlePutSubmit}
              onClose={handleCancelForm}
            />

            <ModalConfirm
              isOpen={isModalDelOpen}
              onSubmit={handleDelSubmit}
              onClose={handleCancelForm}
              nameUnit={formik.values.nameRent}
              submitText={"Hapus"}
              titleModal={"Hapus List Sewa"}
              messageConfirm={"Penghapusan opsi sewa akan mengakibatkan hilangnya data transaksi dengan opsi ini!"}
              messageAsk={"Apakah anda untuk menghapus"}
            />

          </Box>
        </Box>
        {postIsSuccess && <SeverityAlert type={"success"} message={"Data Unit Berhasil Ditambahkan"} />}
        {putIsSuccess && <SeverityAlert type={"success"} message={"Data Unit Berhasil Diedit"} />}
        {delIsSuccess && <SeverityAlert type={"success"} message={"Data Unit Berhasil Dihapus"} />}
        {postError && <SeverityAlert type={"error"} message={`Gagal Menambahkan Data: ${postError}`} />}
        {putError && <SeverityAlert type={"error"} message={`Gagal Mengedit Data: ${putError}`} />}
        {delError && <SeverityAlert type={"error"} message={`Gagal Menghapus Data: ${delError}`} />}

        <TableRentList
          SearchValue={searchValue}
          onSelectRow={handleSelectRow}
          onSelectRowId={handleSelectRowId}
        />

      </Card>
    </Grid>

  )
}

export default RentListData
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
import {POST_UNIT, PUT_UNIT, DELETE_UNIT, GET_UNIT_BYNAME } from '@api/api';
import TableUnit from './TableUnit';
import { unitSchema } from '@schemas';
import theme from '@themes/theme';
import imgConvert from '@utils/imgConvert';
import ModalUnit from '@components/admin/Atoms/Modal/ModalUnit';
import AddButton from '@components/admin/Atoms/Buttons/AddButton';
import SeverityAlert from '@components/admin/Atoms/Alert/SeverityAlert';
import ModalConfirm from '@components/admin/Atoms/Modal/ModalConfirm';

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

const UnitData = () => {
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
    validationSchema: unitSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      {
        isEdit
          ? putUnit({ id: values.id, unitValues: values })
          : postUnit({ unitValues: values })
      }
    }
  })

  // CREATE UNIT
  const { mutate: postUnit, error: postError, isSuccess: postIsSuccess,} = useMutation({
    mutationFn: POST_UNIT,
    onSuccess: (data) => {
      setIsModalAddOpen(false)
      console.log("Hasil submitan add", formik.values);
      formik.handleReset(formik.values)
      queryClient.invalidateQueries(['Unit'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menambahkan data:", error);
    },
  })
  // END CREATE UNIT

  // UPDATE UNIT
  const { mutate: putUnit, error: putError  , isSuccess: putIsSuccess } = useMutation({
    mutationFn: PUT_UNIT,
    onSuccess: (data) => {
      setIsModalEditOpen(false)
      console.log("Hasil submitan update", formik.values);
      queryClient.invalidateQueries(['Unit'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengedit data:", error);
    },
  })
  // END UPDATE UNIT

  // DELETE UNIT
  const { mutate: delUnit, error: delError, isSuccess: delIsSuccess } = useMutation({
    mutationFn: DELETE_UNIT,
    onSuccess: (data) => {
      setIsModalDelOpen(false)
      queryClient.invalidateQueries(['Unit'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menghapus data:", error);
    },
  })
  // END DELETE UNIT

  if (postError || putError || delError) {
    navigate("/*")
  }

  const handlePostChange = async (event) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      const base64String = await imgConvert(files[0]);
      formik.setValues({
        ...formik.values,
        [name]: base64String,
      });
    } else {
      formik.setValues({
        ...formik.values,
        [name]: name === "qtyUnit" || name === "priceBuyUnit" || name === "priceRentUnit" ? (parseInt(value) || null) : value,
      });
    }
  };



  const handlePostSubmit = async () => {
    formik.handleSubmit()
  }

  const handlePutSubmit = async () => {
    formik.handleSubmit()
  }

  const handleDelSubmit = async () => {
    delUnit({ id: formik.values.id })
  }

  const handleCancelForm = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
    setIsModalDelOpen(false);
    setIsEdit(false);
    setIsDel(false);
    formik.handleReset(formik.values);
  }

  const handleSelectRow = async (nameUnit) => {
    setIsEdit(true)
    setIsModalEditOpen(true)
    const fetchData = await GET_UNIT_BYNAME({ nameUnit: nameUnit })
    formik.setValues({
      ...formik.values,
      ...fetchData[0],
    });
  };

  const handleSelectRowId = async (id, nameUnit) => {
    setIsDel(true)
    setIsModalDelOpen(true)
    formik.setValues({
      id: id,
      nameUnit: nameUnit
    });
  };

    const handleSearch = (event) => {
      setSearchValue(event.target.value);
    };

  const labelInput = [
    { label: "Nama Unit", name: "nameUnit", value: formik.values.nameUnit, type: "text" },
    { label: "Tipe Unit", name: "typeUnit", value: formik.values.typeUnit, type: "text" },
    { label: "Foto Unit", name: "imgUnit", value: formik.values.imgUnit, type: "file" },
    { label: "Foto Brand", name: "imgBrand", value: formik.values.imgBrand, type: "file" },
    { label: "Ketersediaan Unit", name: "qtyUnit", value: formik.values.qtyUnit, type: "number" },
    { label: "Harga Beli", name: "priceBuyUnit", value: formik.values.priceBuyUnit, type: "number" },
    { label: "Harga Sewa", name: "priceRentUnit", value: formik.values.priceRentUnit, type: "number" },
    { label: "Deskripsi Unit", name: "descUnit", value: formik.values.descUnit, type: "textarea" },
  ]

  return (
    <Grid sx={{
      bgcolor: "#EEF2FF", weight: "100vh", height: "100vh", overflowY: "scroll",
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
      <Card sx={{height: "auto", p: "10px 20px 50px 20px", m: "30px 15px", bgcolor: "#F9FAFF", borderRadius: "20px"}} >
        <Box sx={{ justifyContent: "space-between", display: "flex", flexDirection: "row", rowGap: 10, m: "15px" }}>

          <Typography variant='h5' sx={{ position: 'relative', display: "flex", fontWeight: "medium", color: theme.palette.primary.dark, borderRadius: "5px" }}>
            Data Unit
          </Typography>

          <Box gap={1} sx={{ display: "flex", justifyContent: "space-between" }}>

            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
              <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
              <InputBase sx={{
                pl: "10px", color: theme.palette.primary.main, fontWeight: "medium", fontSize: "14px"
              }} placeholder='Cari Unit...'
                value={searchValue} onChange={handleSearch} />
            </Box>

            <AddButton
              onClick={() => setIsModalAddOpen(true)}
              addName={"Tambah Unit"}
            />
            <ModalUnit
              typeModal={"Tambah Unit"}
              formik={formik}
              isOpen={isModalAddOpen}
              labelInput={labelInput}
              onChange={handlePostChange}
              onSubmit={handlePostSubmit}
              onClose={handleCancelForm}
            />
            <ModalUnit
              typeModal={"Edit Unit"}
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
              nameUnit={formik.values.nameUnit}
            />

          </Box>
        </Box>
        {postIsSuccess && <SeverityAlert type={"success"} message={"Data Unit Berhasil Ditambahkan"} />}
        {putIsSuccess && <SeverityAlert type={"success"} message={"Data Unit Berhasil Diedit"} />}
        {delIsSuccess && <SeverityAlert type={"success"} message={"Data Unit Berhasil Dihapus"} />}
        {postError && <SeverityAlert type={"error"} message={`Gagal Menambahkan Data: ${postError}`} />}
        {putError && <SeverityAlert type={"error"} message={`Gagal Mengedit Data: ${putError}`} />}
        {delError && <SeverityAlert type={"error"} message={`Gagal Menghapus Data: ${delError}`} />}

        <TableUnit
          SearchValue={searchValue}
          onSelectRow={handleSelectRow}
          onSelectRowId={handleSelectRowId}
        />
      </Card>
    </Grid>

  )
}

export default UnitData
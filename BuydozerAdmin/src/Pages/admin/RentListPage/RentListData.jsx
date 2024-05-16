import React, { useState } from 'react'
import {
  Card,
  Box, Typography,
  Grid, InputBase
} from '@mui/material'
import { SearchRounded } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { rentListSchema } from '@schemas';
import axios from 'axios';
import theme from '@themes/theme';
import AddButton from '@components/admin/Atoms/Buttons/AddButton';
import ModalPriceListRent from '@components/admin/Atoms/Modal/ModalPriceListRent';
import ModalConfirm from '@components/admin/Atoms/Modal/ModalConfirm';
import SeverityAlert from '@components/admin/Atoms/Alert/SeverityAlert';
import TableRentList from './TableRentList';



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


const POST_RentList = async ({ RentListValues }) => {

  const BASE_URL_POST_RentList = "https://localhost:5001/api/PriceListRents/CreatePriceListRent"

  const accessToken = localStorage.getItem('AccessToken')
  try {
    const response = await axios.post(BASE_URL_POST_RentList, RentListValues, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataRentList = response.data
    return dataRentList;
  } catch (error) {
    console.error('Error while Post RentList:', error);
    throw error
  }
};

const GET_RentList_BYNAME = async ({ searchValue }) => {
  console.log('nama RentList: ', searchValue);

  const BASE_URL_GET_RentList = `https://localhost:5001/api/PriceListRents/GetPriceListRent?ParameterNameRent=%25${searchValue}%25&SortPrice=true&PageNumber=1&PageSize=5`;

  const accessToken = localStorage.getItem('AccessToken');
  try {
    const response = await axios.get(BASE_URL_GET_RentList, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataRentList = response.data.items
    // console.log('log data RentList dari api: ', dataRentList);
    return dataRentList

  } catch (error) {
    throw error;
  }
};

const PUT_RentList = async ({ id, RentListValues }) => {
  console.table(id, RentListValues);

  const BASE_URL_PUT_RentList = `https://localhost:5001/api/PriceListRents/UpdatePriceListRent/${id}`
  const accessToken = localStorage.getItem('AccessToken')
  try {
    const response = await axios.put(BASE_URL_PUT_RentList, RentListValues, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataRentList = response.data
    return dataRentList;
  } catch (error) {
    console.error('Error while Put RentList:', error);
    throw error
  }
}

const DELETE_RentList = async ({ id }) => {
  console.log("id yang diterima oleh function DELETE_RentList", id);

  const BASE_URL_DELETE_RentList = `https://localhost:5001/api/PriceListRents/DeletePriceListRent/${id}`
  const accessToken = localStorage.getItem('AccessToken')
  try {
    const response = await axios.delete(BASE_URL_DELETE_RentList, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const dataRentList = response.data
    console.log("Berhasil delete DATA");
    return dataRentList;
  } catch (error) {
    console.error('Error while Delete RentList:', error);
    throw error
  }
}

const RentListData = () => {
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
          ? putRentList({ id: values.id, RentListValues: values })
          : postRentList({ RentListValues: values })
      }
    }
  })
  console.log('log data RentList dari formik values: ', formik.values);


  // Function for create data
  const { mutate: postRentList, error: postError, isSuccess: postIsSuccess } = useMutation({
    mutationFn: POST_RentList,
    onSuccess: (data) => {
      console.log("Data successfully POSTED", data)
      setIsModalAddOpen(false)
      console.log("Hasil submitan add", formik.values);
      formik.handleReset(formik.values)
      queryClient.invalidateQueries(['RentList'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menambahkan data:", error);
    },
  })

  // Function for update data
  const { mutate: putRentList, error: putError, isSuccess: putIsSuccess } = useMutation({
    mutationFn: PUT_RentList,
    onSuccess: (data) => {
      console.log("Data successfully UPDATE", data)
      setIsModalEditOpen(false)
      console.log("Hasil submitan update", formik.values);
      // formik.handleReset(formik.values)
      queryClient.invalidateQueries(['RentList'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengedit data:", error);
    },
  })

  // Function for delete data
  const { mutate: delRentList, error: delError, isSuccess: delIsSuccess } = useMutation({
    mutationFn: DELETE_RentList,
    onSuccess: (data) => {
      console.log("Data successfully DELETE", data)
      setIsModalDelOpen(false)
      queryClient.invalidateQueries(['RentList'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menghapus data:", error);
    },
  })



  const handlePostChange = async (event) => {
    const { name, value } = event.target;
    formik.setValues({
      ...formik.values,
      [name]: value,
    });

    // console.table(formik.values);
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
    console.log(`data yang dikirimkan ${searchValue}`);

    const fetchData = await GET_RentList_BYNAME({ searchValue: searchValue })
    { !fetchData ? console.log("data sedang loading") : console.log("data berhasil di fetching") }
    formik.setValues({
      ...formik.values,
      ...fetchData[0],
    });
  };

  const handleSelectRowId = async (id, nameRent) => {
    setIsDel(true)
    setIsModalDelOpen(true)
    console.log(`data yang diterima UnitData`, id, nameRent);

    formik.setValues({
      id: id,
      nameRent: nameRent
    });
  };


  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
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
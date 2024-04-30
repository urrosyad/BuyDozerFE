import React, { useState } from 'react'
import {
  Card,
  Box, Typography,
  Grid, InputBase, Alert, Tab
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
import TableTransaction from './TableTransaction';
import AddButton from '@components/admin/Atoms/Buttons/AddButton';
import ModalUser from '@components/admin/Atoms/Modal/ModalUser';
import ModalConfirm from '@components/admin/Atoms/Modal/ModalConfirm';
import imgConvert from '@utils/imgConvert';
import SeverityAlert from '@components/admin/Atoms/Alert/SeverityAlert';
import * as yup from 'yup';
import formatRupiah from '@utils/formatRupiah';

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
const GET_TRANSACTIONRENT_BYTRANSACTIONNUM = async ({ transactionNum }) => {
  console.log('nomor transaksi: ', transactionNum);

  const BASE_URL_GET_TRANSACTIONRENT = `https://localhost:5001/api/TransactionDetailRents/GetTransactionDetailRent?ParameterUserName=%25%25&ParameterTransactionNumber=%25${userName}%25&SortDate=true&PageNumber=1&PageSize=1`;

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

//ubah url
// const PUT_USER = async ({ id, userValues }) => {
//   console.table(id, userValues);

//   const BASE_URL_PUT_USER = `https://localhost:5001/api/UserEntitys/UpdateUserEntity/${id}`
//   const accessToken = localStorage.getItem('AccessToken')
//   // const userDTO = {
//   //   id: id,
//   //   userName: userValues.userName,
//   //   email: userValues.email,
//   //   companyUser: userValues.companyUser,
//   //   positionUser: userValues.positionUser
//   // }
//   try {
//     const response = await axios.put(BASE_URL_PUT_USER, userValues, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     const dataUser = response.data
//     return dataUser;
//   } catch (error) {
//     console.error('Error while Put User:', error);
//     throw error
//   }
// }

// // ubah url
// const DELETE_USER = async ({ id }) => {
//   console.log("id yang diterima oleh function DELETE_USER", id);

//   const BASE_URL_DELETE_USER = `https://localhost:5001/api/UserEntitys/DeleteUserEntity/${id}`
//   const accessToken = localStorage.getItem('AccessToken')
//   try {
//     const response = await axios.delete(BASE_URL_DELETE_USER, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     const dataUser = response.data
//     console.log("Berhasil delete DATA");
//     return dataUser;
//   } catch (error) {
//     console.error('Error while Delete User:', error);
//     throw error
//   }
// }

// const UPDATE_USER_FROM_ADMIN = async ({ id }) => {
//   console.log("id yang diterima oleh function DELETE_USER", id);

//   const BASE_URL_DELETE_USER = `https://localhost:5001/api/UserEntitys/DeleteAdmin/${id}`
//   const accessToken = localStorage.getItem('AccessToken')
//   try {
//     const response = await axios.delete(BASE_URL_DELETE_USER, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     const dataUser = response.data
//     console.log("Berhasil delete DATA");
//     return dataUser;
//   } catch (error) {
//     console.error('Error while Delete User:', error);
//     throw error
//   }
// }

// // ubah url
// const PUT_ROLE_ADMIN = async ({ id }) => {
//   console.log("id yang diterima oleh function PUT_ROLE_ADMIN", id);

//   const BASE_URL_PUT_ROLE_ADMIN = `https://localhost:5001/api/UserEntitys/CreateAdmin?id=${id}`
//   console.log(BASE_URL_PUT_ROLE_ADMIN);
//   const accessToken = localStorage.getItem('AccessToken')
//   try {
//     const response = await axios.post(BASE_URL_PUT_ROLE_ADMIN, null, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     const dataUser = response.data
//     console.log("Berhasil update data user menjadi admin");
//     return dataUser;
//   } catch (error) {
//     console.log('Error while updating User to admin:', error);
//     throw error
//   }
// }

const TransactionData = () => {
  const [searchValue, setSearchValue] = useState('');
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

  const handleSelectRow = async (userName) => {
    setIsEdit(true)
    setIsModalEditOpen(true)
    console.log(`data yang dikirimkan ${userName}`);

    const fetchData = await GET_TRANSACTIONRENT_BYTRANSACTIONNUM({ userName: userName })
    console.log("ini console log fetchData", fetchData[0].userName);
    { !fetchData ? console.log("data sedang loading") : console.log("data berhasil di fetching") }

    formik.setValues({
      ...formik.values,
      transactionNum: fetchData[0].transactionNum,
      nameUnit: fetchData[0].nameUnit,
      priceRentUnit: fetchData[0].priceRentUnit,
      userName: fetchData[0].user.userName,
      receiverName: fetchData[0].receiverName,
      receiverHp: fetchData[0].receiverHp,
      receiverAddress: fetchData[0].receiverAddress,
      qtyTransaction: fetchData[0].qtyTransaction,
      dateTransaction: fetchData[0].dateTransaction,
      statusTransaction: fetchData[0].statusTransaction,
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

  // Function for update data
  // const { mutate: putUser, error: putError, isSuccess: putIsSuccess } = useMutation({
  //   mutationFn: PUT_USER,
  //   onSuccess: (data) => {
  //     console.log("Data successfully UPDATE", data)
  //     setIsModalEditOpen(false)
  //     console.log("Hasil submitan update", formik.values);
  //     // formik.handleReset(formik.values)
  //     queryClient.invalidateQueries(['TransaksiRent'], (oldData) => [...oldData, data]);
  //   },
  //   onError: (error) => {
  //     console.error("Error saat mengedit data:", error);
  //   },
  // })

  // Function for delete data
  // const { mutate: delUser, error: delError, isSuccess: delIsSuccess } = useMutation({
  //   mutationFn: DELETE_USER,
  //   onSuccess: (data) => {
  //     console.log("Data successfully DELETE", data)
  //     setIsModalDelOpen(false)
  //     queryClient.invalidateQueries(['User'], (oldData) => [...oldData, data]);
  //   },
  //   onError: (error) => {
  //     console.error("Error saat menghapus data:", error);
  //   },
  // })

  // const { mutate: putIsAdminUser, error: putIsAdminError, isSuccess: putIsAdminSuccess } = useMutation({
  //   mutationFn: PUT_ROLE_ADMIN,
  //   onSuccess: (data) => {
  //     console.log("Data successfully UPDATE", data)
  //     setIsModalKeyOpen(false)
  //     queryClient.invalidateQueries(['User'], (oldData) => [...oldData, data]);
  //   },
  //   onError: (error) => {
  //     console.error("Error saat mengedit data isAdmin:", error);
  //   },
  // })


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
  const labelInput = [
    { name: "transactionNum", label: "Nomor Transaksi", value: formik.values.transactionNum, type: "text" },
    { name: "nameUnit", label: "Nama Unit", value: formik.values.nameUnit, type: "text" },
    { name: "priceRentUnit", label: "Harga Sewa", value: formik.values.priceRentUnit, type: "float" },
    { name: "userName", label: "Nama Pengguna", value: formik.values.userName, type: "text" },
    { name: "receiverName", label: "Nama Penerima", value: formik.values.receiverName, type: "text" },
    { name: "receiverHp", label: "Telepon Penerima", value: formik.values.receiverHp, type: "text" },
    { name: "receiverAddress", label: "Alamat Penerima", value: formik.values.receiverAddress, type: "text" },
    { name: "qtyTransaction", label: "Qty Unit", value: formik.values.qtyTransaction, type: "text" },
    { name: "dateTransaction ", label: "Tanggal Transaksi", value: formik.values.dateTransaction, type: "date" },
    // { name: "created ", label: "Tanggal Dibuat", value: formik.values.created, type: "date" },
    { name: "statusTransaction ", label: "Status", value: formik.values.statusTransaction, type: "integer" },
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
                </Box>
              </Box>
              <TableTransaction
                SearchValue={searchValue}
                onSelectRow={handleSelectRow}
                onSelectRowId={handleSelectRowId}
                onSelectRowRole={handleSelectRowRole}
              />
            </TabPanel>




            <TabPanel value="rent">
              rent
              {/* <TableTransactionRent> */}
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
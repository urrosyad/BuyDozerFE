import { useState } from 'react'
import { useFormik } from 'formik';
import { unitSchema } from '@schemas';
import { SearchRounded } from '@mui/icons-material';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Card, Box, Typography, Grid, InputBase} from '@mui/material'
import { GET_USER_BYNAME, PUT_USER, PUT_ROLE_ADMIN, DELETE_USER } from '@api/api';
import theme from '@themes/theme';
import TableUser from './TableUser';
import ModalUser from '@components/admin/Atoms/Modal/ModalUser';
import ModalConfirm from '@components/admin/Atoms/Modal/ModalConfirm';
import SeverityAlert from '@components/admin/Atoms/Alert/SeverityAlert';
import { useNavigate } from 'react-router-dom';

// ubah
const initialValues = {
  id: "",
  userName: "",
  email: "",
  companyUser: "",
  positionUser: "",
}

const UserData = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');
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

    const fetchData = await GET_USER_BYNAME({ Username: userName })

    {fetchData && 
      formik.setValues({
        ...formik.values,
        id: fetchData[0].id,
        userName: fetchData[0].userName,
        email: fetchData[0].email,
        companyUser: fetchData[0].companyUser,
        positionUser: fetchData[0].positionUser,
      });
    }
  };

  const handleSelectRowId = async (id, userName) => {
    setIsDel(true)
    setIsModalDelOpen(true)
    formik.setValues({
      id: id,
      userName: userName
    });
  };

  const handleSelectRowRole = async (id, isAdmin, userName) => {
    setIsModalKeyOpen(true)
    formik.setValues({
      id: id,
      userName: userName,
      isAdmin: isAdmin
    });
  };

  const handlePutSubmit = async () => {
    putUser({ id: formik.values.id, userValues: formik.values})
  }

  const handleDelSubmit = async () => {
    delUser({ id: formik.values.id })
  }
  const handlePutRoleAdmin = async () => {
    putIsAdminUser({ id: formik.values.id })
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  // Function for update data
  const { mutate: putUser, error: putError, isSuccess: putIsSuccess } = useMutation({
    mutationFn: PUT_USER,
    onSuccess: (data) => {
      setIsModalEditOpen(false)
      console.log("Data successfully UPDATE", data)
      queryClient.invalidateQueries(['User'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengedit data:", error);
    },
  })

  // Function for delete data
  const { mutate: delUser, error: delError, isSuccess: delIsSuccess } = useMutation({
    mutationFn: DELETE_USER,
    onSuccess: (data) => {
      console.log("Data successfully DELETE", data)
      setIsModalDelOpen(false)
      queryClient.invalidateQueries(['User'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat menghapus data:", error);
    },
  })

  const { mutate: putIsAdminUser, error: putIsAdminError, isSuccess: putIsAdminSuccess } = useMutation({
    mutationFn: PUT_ROLE_ADMIN,
    onSuccess: (data) => {
      console.log("Data successfully UPDATE", data)
      setIsModalKeyOpen(false)
      queryClient.invalidateQueries(['User'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengedit data isAdmin:", error);
    },
  })

  if (putError, delError, putIsAdminError) {
    navigate("/*")
  }
  
  const handlePutChange = async (event) => {
    const { name, value } = event.target;
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  const labelInput = [
    { name: "userName", label: "Nama Pengguna", value: formik.values.userName, type: "text" },
    { name: "email", label: "Email", value: formik.values.email, type: "text" },
    { name: "companyUser", label: "Perusahaan Pengguna", value: formik.values.companyUser, type: "text" },
    { name: "positionUser", label: "Jabatan Pengguna", value: formik.values.positionUser, type: "text" },
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
            Data User
          </Typography>

          <Box gap={1} sx={{ display: "flex", justifyContent: "space-between" }}>

            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${theme.palette.primary.main}`, bgcolor: "#F9FAFF", color: theme.palette.primary.main, borderRadius: "10px", }}>
              <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
              <InputBase sx={{
                pl: "10px", color: theme.palette.primary.main, fontWeight: "medium", fontSize: "14px"
              }} placeholder='Cari User...'
                value={searchValue} onChange={handleSearch} />
            </Box>

            <ModalUser
              typeModal={"Edit User"}
              formik={formik}
              isOpen={isModalEditOpen}
              labelInput={labelInput}
              onChange={handlePutChange}
              onSubmit={handlePutSubmit}
              onClose={handleCancelForm}
            />
            <ModalConfirm
              isOpen={isModalDelOpen}
              onSubmit={handleDelSubmit}
              onClose={handleCancelForm}
              nameUnit={formik.values.userName}
              titleModal={"Hapus User"}
              messageAsk={"Apakah anda yakin menghapus data"}
              messageConfirm={"Hapus user akan mengakibatkan hilangnya data transaksi!"}
              submitText={"Hapus"}
            />
            <ModalConfirm
              isOpen={isModalKeyOpen}
              onSubmit={handlePutRoleAdmin}
              onClose={handleCancelForm}
              nameUnit={formik.values.userName}
              titleModal={"Jadikan Admin"}
              messageAsk={"Apakah anda yakin menjadikan admin data user"}
              messageConfirm={"Pastikan hal ini sudah disetujui oleh administrator!"}
              submitText={"Ubah"}
            />
          </Box>
        </Box>
        {putIsSuccess && <SeverityAlert severity={"success"} message={"Data User Berhasil Diedit"} />}
        {delIsSuccess && <SeverityAlert severity={"success"} message={"Data User Berhasil Dihapus"} />}
        {putIsAdminSuccess && <SeverityAlert severity={"success"} message={"Data User Berhasil Dihapus"} />}
        {putError && <SeverityAlert severity={"error"} message={`Gagal Mengedit Data: ${putError}`} />}
        {putIsAdminError && <SeverityAlert severity={"error"} message={`Gagal Mengedit Data User: ${putIsAdminError}`} />}
        {delError && <SeverityAlert severity={"error"} message={`Gagal Menghapus Data: ${delError}`} />}
        <TableUser
          SearchValue={searchValue}
          onSelectRow={handleSelectRow}
          onSelectRowId={handleSelectRowId}
          onSelectRowRole={handleSelectRowRole}
        />
      </Card>
    </Grid>
  )
}

export default UserData
import React, { useState } from 'react'
import * as yup from 'yup';
import { Paper, Box, Typography, Button, FormControl, IconButton, InputBase, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import buydozerFont from '@assets/customer/buydozerFont.png'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import { useFormik } from 'formik'
import { flexCenter } from '@themes/commonStyles'
import axios from 'axios'
import image from '@assets/bgLogin.png'
import theme from '../../../Themes/theme';
import useAuth from '@hooks/useAuth'


const BASE_URL_LOGIN = "https://localhost:5001/api/LoginRegisters/Login"

const styleButton = {
  width: "150px",
  borderRadius: "10px",
  color: "#D9D630",
  border: "2px solid #D9D630",
  fontWeight: "bold",
  fontSize: "16px",
  ":hover": {
    backgroundColor: "#D9D630",
    color: "#193D71",
    border: "2px solid #D9D630"
  }
}

const LoginPage = () => {
  const { loginAuth } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      username: yup.string().required('required!'),
      password: yup.string().required('required!'),
    }),
    onSubmit: async () => {
      try {
        const { Data } = postLogin()

        if (Data) {
          const userError = Data.toLowerCase().includes('username');
          {
            userError
              ? formik.setFieldError('username', Data)
              : formik.setFieldError('password', Data)
          }
        }

      } catch (error) {
        throw error
      }
    }
  })


  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleOnChangeLogin = (e) => {
    const { target } = e
    formik.setFieldValue(target.name, target.value)
  }

  const POST_LOGIN = async () => {
    try {
      const response = await axios.post(BASE_URL_LOGIN, formik.values, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      const {
        UserName,
        UserId,
        accessToken,
        IsAdmin,
        Status,
        Data,
        expiresIn } = response.data;

      if (!Status) {
        loginAuth(
          accessToken,
          IsAdmin ? 1999 : 2000,
          UserName,
          UserId,
          expiresIn
        )
      }

      return { accessToken, Data };
    } catch (error) {
      console.error('Error while login:', error);
      throw error;
    }
  }

  const { mutate: postLogin, isPending: loginIsPending, isSuccess: loginIsSucces, error: loginError } = useMutation({
    mutationFn: POST_LOGIN,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['Login'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat Login:", error);
      navigate("/*")
    },
  })
  {loginError && navigate("/*")}

  return (
    <Box>
      <Box sx={{
        ...flexCenter, backgroundImage: `url(${image})`, flexDirection: "column",
        width: "100%", height: "100vh", backgroundRepeat: 'no-repeat',
      }}>
        <Box sx={{ ...flexCenter, flexDirection: 'column', width: "auto", height: "120px", borderRadius: 2 }}>
          <Box sx={{ ...flexCenter }}>
            <img src={buydozerLogo} style={{ position: "absolute", width: "150px", zIndex: 0, opacity: 0.1 }} />
            <img src={buydozerFont} style={{ width: "250px", zIndex: 1 }} />
          </Box>

        </Box>
        <Paper component="form" onSubmit={POST_LOGIN} sx={{ height: "396px", width: "372px", borderRadius: 2, margin: "0 auto", padding: 2 }}>
          <Box sx={{ ...flexCenter, flexDirection: 'column', marginTop: 1 }}>
            <Typography sx={{
              fontWeight: 'medium', fontSize: "24px", color: '#D9D630'
            }}>
              Welcome To Buydozer
            </Typography>
            <Typography sx={{ fontSize: "16px", color: '#193D71' }}>
              Heavy Unit Heavy Profit
            </Typography>
          </Box>

          <Box sx={{ margin: "10px 20px" }}>
            <FormControl sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: "18px", color: '#193D71' }}>Username</Typography>
              <Box sx={{
                height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px",
              }}>
                <InputBase
                  type='text' name='username' value={formik.values.username}
                  sx={{
                    width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px'
                  }}
                  onChange={handleOnChangeLogin}
                />
              </Box>

              {/* validation */}
              {formik.errors.username && (
                <Box sx={{
                  height: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#F9FAFF", borderRadius: "5px"
                }}>

                  <Typography sx={{ fontSize: 12, color: "#EC3535", ml: "10px" }}>
                    {formik.errors.username}
                  </Typography>
                </Box>
              )}

            </FormControl>
            <FormControl sx={{ width: "100%", marginTop: "10px" }}>
              <Typography sx={{ fontSize: 18, color: '#193D71' }}>Password</Typography>
              <Box sx={{
                height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px",
              }}>
                <InputBase
                  type={showPassword ? 'text' : 'password'} name='password' value={formik.values.password}
                  sx={{
                    width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px'
                  }}
                  onChange={handleOnChangeLogin} />
                <IconButton size='small' sx={{ color: "#2A6DD0", mr: 2 }} onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                </IconButton>
              </Box>

              {/* validation */}
              {formik.errors.password && (
                <Box sx={{
                  height: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#F9FAFF", borderRadius: "5px"
                }}>

                  <Typography sx={{ fontSize: 12, color: "#EC3535", ml: "10px" }}>
                    {formik.errors.password}
                  </Typography>
                </Box>
              )}

            </FormControl>
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Button type='button' onClick={formik.handleSubmit}
                sx={styleButton}>
                {loginIsPending
                  ? <CircularProgress size={25} sx={{color: "#D9D630",}} />
                  :
                  "Login"
                }
              </Button>
              <Typography sx={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', mt: "10px" }}>
                Tidak punya akun?
                <a href="/register" style={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', fontWeight: theme.typography.fontWeightMedium }}> daftar disini! </a>
              </Typography>
            </Box>
          </Box>

        </Paper>
      </Box>
    </Box>
  )
}

export default LoginPage;
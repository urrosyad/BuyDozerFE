import React, { useState } from 'react'
import image from '../../../assets/bgLogin.png'
import { Container, Paper, Box, Typography, TextField, Button, styled, FormControl, InputAdornment, IconButton, Input, InputBase } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import theme from '../../../theme'
import axios from 'axios'
import { useFormik } from 'formik'


const BASE_URL_LOGIN = "https://localhost:5001/api/Users/login"

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(
    {
      email: "",
      password: "",
      twoFactorCode: 'string',
      twoFactorRecoveryCode: 'string'
    }
  )
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }
  })

  const handleLogin = (e) => {
    const { target } = e
    formik.setFieldValue(target.name, target.value)

  }

  const handleChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const POST_LOGIN = async () => {
    try {
      const response = await axios.post(BASE_URL_LOGIN, loginForm, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const { accessToken } = response.data;

      console.log(`Succesfull get accessToken ${accessToken}`);
      console.log(`${formik.values.email} ${formik.values.password}`)

      return accessToken;
    } catch (error) {
      console.error('Error while login:', error);
      throw error;
    }
  }


  return (
    <Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${image})`,
        width: "100%", height: "100vh", backgroundRepeat: 'no-repeat',
      }}>
        <Paper sx={{ height: "396px", width: "372px", borderRadius: 5, margin: "20px auto", padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: '#D9D630' }}>Welcome To Buydozer</Typography>
            <Typography sx={{ fontSize: "16px", color: '#193D71' }}>Heavy Unit Heavy Profit</Typography>
          </Box>
          <form action={POST_LOGIN} method="post">
            <Box sx={{ margin: "10px 20px" }}>
              <FormControl sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "18px", color: '#193D71' }}>Email</Typography>
                <Box sx={{
                  height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px",
                }}>
                  <InputBase
                    type='text' name='email'
                    sx={{
                      width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px'
                    }}
                    onChange={handleLogin}
                  />
                </Box>
              </FormControl>
              <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <Typography sx={{ fontSize: 18, color: '#193D71' }}>Password</Typography>
                <Box sx={{
                  height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px",
                }}>
                  <InputBase
                    type={showPassword ? 'text' : 'password'} name='email'
                    sx={{
                      width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px'
                    }}
                    onChange={handleLogin} />
                  <IconButton size='small' sx={{ color: "#2A6DD0" }} onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                  </IconButton>
                </Box>



                <Box sx={{ margin: "5px" }}>
                  <Typography sx={{ fontSize: 8, color: '#193D71' }}>- password harus mengandung setidaknya 8 character</Typography>
                  <Typography sx={{ fontSize: 8, color: '#193D71' }}>- password harus mengandung campuran huruf dan angka</Typography>
                  <Typography sx={{ fontSize: 8, color: '#193D71' }}>- password harus mengandung 1 huruf kapital</Typography>
                </Box>
              </FormControl>
              <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Button type='submit'
                  sx={{
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
                  }}>
                  Login
                </Button>
                <Typography sx={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', mt: "10px" }}>
                  Tidak punya akun?
                  <a href="/register" style={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', fontWeight: theme.typography.fontWeightMedium }}> daftar disini! </a>
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default LoginPage;
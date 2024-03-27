import React, { useState } from 'react'
import image from '../../../assets/bgLogin.png'
import { Container, Paper, Box, Typography, TextField, Button, styled, FormControl, InputAdornment, IconButton, Input, InputBase } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import theme from '../../../theme'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'


const BASE_URL_LOGIN = "https://localhost:5001/api/Users/login"
const BASE_URL_USER = "https://localhost:5001/api/UserEntitys?ParameterName=%25%25&PageNumber=1&PageSize=1"

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      email: "",
      password: "", 
      twoFactorCode: 'string',
      twoFactorRecoveryCode: 'string'
    }
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = (e) => {
    const { target } = e
    formik.setFieldValue(target.name, target.value)
  }

  const sessionExpired = () => {
    const expiresIn = localStorage.getItem('') 
    setTimeout(() => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('AgeToken');
    navigate('/login')
    }, 3600000);
  }

  const POST_LOGIN = async () => {
    try {
      const response = await axios.post(BASE_URL_LOGIN, formik.values, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const { accessToken, expiresIn } = response.data;
      localStorage.setItem('UserRole', 'admin');
      localStorage.setItem('AccessToken', accessToken);
      localStorage.setItem('AgeToken', expiresIn);
      localStorage.setItem('UserName', formik.values.email)
      onLoginSuccess('admin')
      sessionExpired()
      navigate('/admin/dashboard');
      
      return accessToken;
    } catch (error) {
      console.error('Error while login:', error);
      throw error;
    }}

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
  }}

  return (
    <Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${image})`,
        width: "100%", height: "100vh", backgroundRepeat: 'no-repeat',
      }}>
        <Paper component="form" onSubmit={POST_LOGIN} sx={{ height: "396px", width: "372px", borderRadius: 5, margin: "20px auto", padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 1 }}>
            <Typography sx={{ 
              fontWeight: 'bold', fontSize: 24, color: '#D9D630' 
            }}>
              Welcome To Buydozer
            </Typography>
            <Typography sx={{ 
              fontSize: "16px", color: '#193D71' 
            }}>
              Heavy Unit Heavy Profit
            </Typography>
          </Box>

          <Box sx={{ margin: "10px 20px"}}>
            <FormControl sx={{width:"100%" }}>
              <Typography sx={{ fontSize: "18px", color: '#193D71' }}>Email</Typography>
              <Box sx={{ 
                height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px",
              }}>
                <InputBase 
                type='text' name='email' value={formik.values.email}
                sx={{ 
                  width:"100%", height:"100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl:'10px'
                }}  
                onChange={handleLogin} 
                />
              </Box>
            </FormControl>
            <FormControl sx={{width:"100%",marginTop: "10px" }}>
              <Typography sx={{ fontSize: 18, color: '#193D71' }}>Password</Typography>
              <Box sx={{ 
                height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px",
              }}>
                <InputBase 
                type={showPassword ? 'text' : 'password'} name='password' value={formik.values.password}
                sx={{ 
                  width:"100%", height:"100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl:'10px'
                }}
                onChange={handleLogin} />
                <IconButton size='small' sx={{color: "#2A6DD0", mr: 2}} onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                </IconButton>
              </Box>


              <Box sx={{ margin: "2px" }}>
                <Typography sx={{ fontSize: 8, color: '#193D71' }}>- password harus mengandung setidaknya 8 character</Typography>
                <Typography sx={{ fontSize: 8, color: '#193D71' }}>- password harus mengandung campuran huruf dan angka</Typography>
                <Typography sx={{ fontSize: 8, color: '#193D71' }}>- password harus mengandung 1 huruf kapital</Typography>
              </Box>

            </FormControl>
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Button type='button' onClick={POST_LOGIN}
                sx={styleButton}>
                Login
              </Button>
              <Typography sx={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', mt: "10px" }}>
                Tidak punya akun?
                <a href="#" style={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', fontWeight: theme.typography.fontWeightMedium }}> daftar disini! </a>
              </Typography>
            </Box>
          </Box>

        </Paper>
      </Box>
    </Box>
  )
}

export default LoginPage;
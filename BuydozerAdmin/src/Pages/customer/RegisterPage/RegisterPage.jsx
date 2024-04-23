import React, { useEffect, useState } from 'react'
import image from '../../../assets/bgLogin.png'
import { Grid, Paper, Box, Typography, Button, FormControl, IconButton, InputBase, Snackbar, Alert } from '@mui/material'
import { Description, Visibility, VisibilityOff } from '@mui/icons-material'
import theme from '../../../theme'
import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { registerSchema } from '@schemas'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'



const BASE_URL_REGISTER = "https://localhost:5001/api/LoginRegisters/Register"

const initialValuesRegister = {
    email: "",
    password: "",
    confirmPassword: "",
    username: '',
    companyUser: '',
    positionUser: ''
}

const POST_REGISTER = async (VALUES) => {
    try {
        const response = await axios.post(BASE_URL_REGISTER, VALUES, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.data && response.data.Data && response.data.Data.Errors) {
            const errorMessage = response.data.Data.Errors.map(error => error.Description);
            return errorMessage;
        } else {
            return ["Semua validasi berhasil."];
        }
        
    } catch (error) {
        console.error('Error while register:', error);
        throw error;
    }
}

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showCFPassword, setShowCFPassword] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: initialValuesRegister,
        validationSchema: registerSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                await register(values)
            } catch (error) {
                throw error
            }
        }
    })
    console.table(formik.values);

    const { mutate: register, error: registError, isSuccess: registSuccess } = useMutation({
        mutationFn: POST_REGISTER,
        onSuccess: (data) => {
          console.log("User successfully registered", data)
          console.log("Hasil register", formik.values);
          formik.handleReset(formik.values)
          setOpenSnack(true)
        },
        onError: (error) => {
          console.error("Error saat menambahkan data:", error);
        },
      })

    const handleClickShowPassword = (name) => {
        if (name === 'password') {
            setShowPassword((show) => !show);
        } else if (name === 'confirmPassword') {
            setShowCFPassword((show) => !show);
        }
    }

    const handleOnChangeRegister = (e) => {
        const { target } = e
        formik.setFieldValue(target.name, target.value)
    }


    const registerInput = [
        { label: "Email", name: "email", value: formik.values.email, type: "email" },
        { label: "Password", name: "password", value: formik.values.password, type: "password" },
        { label: "Confirm Password", name: "confirmPassword", value: formik.values.password, type: "password" },
        { label: "Username", name: "username", value: formik.values.username, type: "text" },
        { label: "Perusahaan", name: "companyUser", value: formik.values.companyUser, type: "text" },
        { label: "Jabatan", name: "positionUser", value: formik.values.positionUser, type: "text" },
    ]

    useEffect(() => {
        if (openSnack) {
            const timer = setTimeout(() => {
                setOpenSnack(false);
                navigate("/");
            }, 1500); // Waktu penutupan snackbar
            return () => clearTimeout(timer);
        }
    }, [openSnack, navigate]);

    // useEffect(() => {
    //     if (registSuccess) {
    //         setOpenSnack(true);
    //         console.log("RegistSuccess berhasil keluar");
    //     }
    // }, [registSuccess]);

    // console.log(formik.errors);
    return (
        <Box>
        <Snackbar open={openSnack}>
        <Alert
          variant="filled"
          sx={{ width: '400px', height: "80px", pt: "20px", fontSize: "16px", color: "#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "10px", backgroundColor: "#193D71" }}
        >
          Register Berhasil!!
        </Alert>
      </Snackbar>

            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${image})`,
                width: "100%", height: "100vh", backgroundRepeat: 'no-repeat',
            }}>
                <Paper sx={{ height: "500px", width: "700px", borderRadius: 5, margin: "20px auto", padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 2 }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 24, color: '#D9D630' }}>Daftarkan Diri Anda</Typography>
                    </Box>


                    <Grid container sx={{ padding: "0px 15px" }}>
                        <Grid item xs={6}>
                            {registerInput.slice(0, Math.ceil(registerInput.length / 2)).map((data) => (
                                <Box sx={{ margin: "10px 20px" }}>
                                    {data.type === "password"
                                        ?
                                        <FormControl sx={{ width: "100%", height: "90px"}}>
                                            <Typography sx={{ fontSize: '18px', color: '#193D71' }}>{data.label}</Typography>
                                            <Box sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px" }}>
                                                {data.label === "Password"
                                                    ?
                                                    <>
                                                        <InputBase
                                                            type={showPassword ? 'text' : 'password'} name={data.name} value={formik.values.password}
                                                            sx={{ width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px' }}
                                                            onChange={handleOnChangeRegister} />
                                                        <IconButton size='small' sx={{ color: "#2A6DD0" }} onClick={() => handleClickShowPassword(data.name)}>
                                                            {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                                        </IconButton>
                                                    </>
                                                    :
                                                    <>
                                                        <InputBase
                                                            type={showCFPassword ? 'text' : 'password'} name={data.name} value={formik.values.confirmPassword}
                                                            sx={{ width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px' }}
                                                            onChange={handleOnChangeRegister} />
                                                        <IconButton size='small' sx={{ color: "#2A6DD0" }} onClick={() => handleClickShowPassword(data.name)}>
                                                            {showCFPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                                                        </IconButton>
                                                    </>
                                                }
                                            </Box>
                                            {/* Validation */}
                                            {formik.errors[data.name] && 
                                            <Box sx={{height: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#F9FAFF", borderRadius: "5px"}}>
                                                <Typography sx={{ fontSize: "12px", color: "red", pl: "10px" }}>
                                                    {formik.errors[data.name]}
                                                </Typography>
                                            </Box>
                                            }
                                        </FormControl>
                                        :
                                        <FormControl sx={{ width: "100%", height: "90px"}}>
                                            <Typography sx={{ fontSize: "18px", color: '#193D71' }}>{data.label}</Typography>
                                            <Box sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px", }}>
                                                <InputBase
                                                    type={data.type} name={data.name} value={data.value}
                                                    sx={{ width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px' }}
                                                    onChange={handleOnChangeRegister}
                                                />
                                            </Box>
                                            {/* Validation */}
                                            {formik.errors[data.name] && 
                                            <Box sx={{height: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#F9FAFF", borderRadius: "5px"}}>
                                                <Typography sx={{ fontSize: "12px", color: "red", pl: "10px" }}>
                                                    {formik.errors[data.name]}
                                                </Typography>
                                            </Box>
                                            }
                                        </FormControl>
                                    }
                                </Box>
                            ))}
                        </Grid>

                        <Grid item xs={6}>
                            {registerInput.slice(Math.ceil(registerInput.length / 2)).map((data) => (
                                <Box>
                                    <Box sx={{ margin: "10px 20px" }}>
                                        <FormControl sx={{ width: "100%", height: "90px" }}>
                                            <Typography sx={{ fontSize: "18px", color: '#193D71' }}>{data.label}</Typography>
                                            <Box sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid #2A6DD0`, bgcolor: "#F9FAFF", borderRadius: "5px", }}>
                                                <InputBase
                                                    type={data.type} name={data.name} value={data.value}
                                                    sx={{width: "100%", height: "100%", fontWeight: "medium", fontSize: "14px", color: "#193D71", pl: '10px'}}
                                                    onChange={handleOnChangeRegister}
                                                />
                                            </Box>
                                            {/* Validation */}
                                            {formik.errors[data.name] && 
                                            <Box sx={{height: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#F9FAFF", borderRadius: "5px"}}>
                                                <Typography sx={{ fontSize: "12px", color: "red", pl: "10px" }}>
                                                    {formik.errors[data.name]}
                                                </Typography>
                                            </Box>
                                            }
                                        </FormControl>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                    {/* </Box> */}
                    <Box sx={{ marginTop: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Button type='button'
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
                        }}
                        onClick={formik.handleSubmit}>
                            Register
                        </Button>
                        <Typography sx={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', mt: "10px" }}>
                            Sudah punya akun?
                            <a href="/" style={{ color: '#193D71', textDecoration: 'none', fontSize: '12px', fontWeight: theme.typography.fontWeightMedium }}> login disini! </a>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default RegisterPage;
import React, { useState } from 'react'
import Navbar from '@layouts/customer/Navbar/Navbar'
import Footer from '@layouts/customer/Footer/Footer'
import { Box, Grid, IconButton, Typography, Dialog, Skeleton } from '@mui/material';
import { flexCenter, flexEnd } from '@themes/commonStyles'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ButtonOutlined from '@components/customer/Atoms/Button/ButtonOutlined'
import { KeyboardBackspaceRounded } from '@mui/icons-material';
import ModalBuy from '@components/customer/Modal/ModalBuy';
import ModalRent from '@components/customer/Modal/ModalRent';
import ModalConfirm from '@components/customer/Modal/ModalConfirm';
import formatRupiah from '@utils/formatRupiah';
import GetDateNow from '@utils/GetDateNow';
import { useFormik } from 'formik';
import { buySchema, rentSchema } from '@schemas';

const authData = localStorage.getItem('AuthData')
const auth = JSON.parse(authData)
const accessToken = auth.accessToken
const userId = auth.userId

const GET_UNIT = async ({ nameUnit }) => {
  const BASE_URL_GET_UNIT = `https://localhost:5001/api/HeavyUnits/GetHeavyUnit?ParameterUnit=%25${nameUnit}%25&PriceBuy=false&PageNumber=1&PageSize=100`;
  try {
    const response = await axios.get(BASE_URL_GET_UNIT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data.items
    return { data };
  } catch (error) {
    console.error('Error fetching Unit:', error);
  }
};

const GET_PRICELIST_RENT = async () => {
  const BASE_URL_GET_PRICELIST_RENT = `https://localhost:5001/api/PriceListRents/GetPriceListRent?ParameterNameRent=%25%25&SortPrice=true&PageNumber=1&PageSize=10`;
  try {
    const response = await axios.get(BASE_URL_GET_PRICELIST_RENT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data.items
    return { data };
  } catch (error) {
    console.error('Error fetching Unit:', error);
  }
};

const POST_TRANSACTION_BUY = async ({ buyForm }) => {
  const requestBody = {
    ...buyForm,
    dateTransaction: GetDateNow(),
    statusTransaction: 1,
    transactionDate: GetDateNow()
  }
  // console.log("LOG REQ BODY", requestBody);
  const BASE_URL_POST_TRANSACTION_BUY = "https://localhost:5001/api/TransactionDetailBuy/CreateTransactionDetailBuy"
  try {
    const response = await axios.post(BASE_URL_POST_TRANSACTION_BUY, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const trxBuyData = response.data
    return trxBuyData;
  } catch (error) {
    console.error('Error while Post Trx Rent:', error);
    throw error
  }
};

const POST_TRANSACTION_RENT = async ({ rentForm }) => {
  const requestBody = {
    ...rentForm,
    dateTransaction: GetDateNow(),
    statusTransaction: 1,
    dateRent: GetDateNow()
  }
  console.log("LOG REQ BODY RENT", requestBody);
  const BASE_URL_POST_TRANSACTION_RENT = "https://localhost:5001/api/TransactionDetailRents/CreateTransactionDetailRent"
  try {
    const response = await axios.post(BASE_URL_POST_TRANSACTION_RENT, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const trxRentData = response.data
    return trxRentData;
  } catch (error) {
    console.error('Error while Post Trx Rent:', error);
    throw error
  }
};


const UnitDetailPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { nameUnit } = useParams()
  const [isModalBuy, setIsModalBuy] = useState(false)
  const [isModalRent, setIsModalRent] = useState(false)
  const [isModalConfirm, setIsModalConfirm] = useState(false)
  const [priceBuy, setPriceBuy] = useState(0)
  const [priceRent, setPriceRent] = useState(0)
  const [checked, setChecked] = useState(false);
  // console.log({priceRent});


  // FORMIK FOR BUY TRANSACTION
  const formikBuy = useFormik({
    initialValues: {
      unitId: "",
      userId: "",
      receiverName: "",
      receiverHp: "",
      receiverAddress: "",
      qtyTransaction: 0,
    },
    validationSchema: buySchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      postBuy({ buyForm: formikBuy.values })
      // console.log("button diklik");
    }
  })

  // FORMIK FOR BUY TRANSACTION
  const formikRent = useFormik({
    initialValues: {
      unitId: "",
      userId: "",
      priceListRentId: "",
      receiverName: "",
      receiverHp: "",
      receiverAddress: "",
      qtyTransaction: 0,
    },
    validationSchema: rentSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      postRent({ rentForm: formikRent.values })
      console.log("button diklik");
    }
  })


  // GET DETAIL UNIT
  const { data: dataUnit, isLoading: unitIsLoading, isFetching: unitIsFetching, isSuccess: unitIsSuccess, error: unitIsError, refetch } = useQuery({
    queryKey: ["Unit", { nameUnit }],
    queryFn: () => GET_UNIT({ nameUnit }),
  })


  // GET PRICELIST RENT
  const { data: dataPricelist, isLoading: pricelistIsLoading, isFetching: pricelistIsFetching, isSuccess: pricelistIsSuccess, error: pricelistIsError, } = useQuery({
    queryKey: ["PricelistRent"],
    queryFn: GET_PRICELIST_RENT,
  })


  // CREATE TRANSACTION BUY
  const { mutate: postBuy, error: ErrorBuy, isSuccess: BuyIsSuccess } = useMutation({
    mutationFn: POST_TRANSACTION_BUY,
    onSuccess: (data) => {
      setIsModalBuy(false)
      // console.log("Hasil Pembelian", formikBuy.values);
      formikBuy.handleReset(formikBuy.values)
      queryClient.invalidateQueries(['TransactionBuy'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan pembelian:", error);
    },
  })


  // CREATE TRANSACTION RENT
  const { mutate: postRent, error: ErrorRent, isSuccess: RentIsSuccess } = useMutation({
    mutationFn: POST_TRANSACTION_RENT,
    onSuccess: (data) => {
      setIsModalRent(false)
      console.log("HASIL PENYEWAAN", formikRent.values);
      formikRent.handleReset(formikRent.values)
      queryClient.invalidateQueries(['TransactionRent'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan penyewaan:", error);
    },
  })


  const handleModalBuy = () => {
    setIsModalBuy(true)
    if (dataUnit && unitIsSuccess && dataUnit.data.length > 0) {
      formikBuy.setFieldValue('userId', userId);
      formikBuy.setFieldValue('unitId', dataUnit.data[0].id);
      setPriceBuy(dataUnit.data[0].priceBuyUnit);
    }
  }

  const handleModalRent = () => {
    setIsModalRent(!isModalRent)
    if (dataUnit && unitIsSuccess && dataUnit.data.length > 0) {
      formikRent.setFieldValue('userId', userId);
      formikRent.setFieldValue('unitId', dataUnit.data[0].id);
      setPriceRent(dataUnit.data[0].priceRentUnit);
    }
  }

  const handleModalClose = () => {

    setIsModalBuy(false),
      setIsModalRent(false);
  }

  const handleChangeBuyForm = async (event) => {
    const { name, value } = event.target

    formikBuy.setValues({
      ...formikBuy.values,
      [name]: value
    })
  }

  const handleChangeRentForm = async (event) => {
    const { name, value } = event.target

    formikRent.setValues({
      ...formikRent.values,
      [name]: value
    })
  }

  const handleBuySubmit = () => {
    if (checked) {
      // console.log("YEY SUBMIT BERHASIL");
      formikBuy.handleSubmit()
    } else {
      // console.log("CHECK DULU COY");
    }
  }

  const handleRentSubmit = () => {
    if (checked) {
      console.log("YEY SUBMIT RENT BERHASIL");
      formikRent.handleSubmit()
    } else {
      console.log("CHECK DULU COY");
    }
  }

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const labelInput = [
    { label: "Nama Penerima", name: "receiverName", value: isModalBuy ? formikBuy.values.receiverName : formikRent.values.receiverName, type: "text" },
    { label: "No Handphone", name: "receiverHp", value: isModalBuy ? formikBuy.values.receiverHp : formikRent.values.receiverHp, type: "number" },
    { label: "Alamat Penerima", name: "receiverAddress", value: isModalBuy ? formikBuy.values.receiverAddress : formikRent.values.receiverAddress, type: "text" },
  ]

  // console.log("ini adalah data unit", dataUnit);
  // console.log("ini adalah priceBuy", priceBuy);
  // console.log("ini adalah isi formBUY", formikBuy.values);
  console.log("FORMIK RENT:", formikRent.values);
  // { BuyIsSuccess && console.log("BUY BERHASILLLLLLLLLLLL") }
  { RentIsSuccess && console.log("RENT BERHASILLLLLLLLLLLL") }
  
  return (
    <>
      <Navbar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "100%",
        height: "auto",
        padding: "8% 10%",
        flexDirection: "column",
        bgcolor: "#FCFCFC",
      }}>
        <Box sx={{
          width: "100%",
          flexDirection: "column",
          padding: "10px 0 20px 10px",
          bgcolor: "#FFFFFF",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}>
          <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}>
            <IconButton color='primaryDark' onClick={() => navigate(-1)}>
              <KeyboardBackspaceRounded color="primaryDark" sx={{ fontSize: "26px" }} />
            </IconButton>
          </Box>


          {unitIsLoading || unitIsFetching ? (
            // Tampilkan komponen Skeleton saat loading
            <Grid container>
              <Grid item xs={6} sx={{ ...flexCenter, padding: "20px" }}>
                <Skeleton animation="wave" variant="rounded" width={400} height={400} />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginTop: "10%", padding: "20px" }}>
                  <Skeleton animation="wave" variant="text" width="50%" height={30} />
                  <Skeleton animation="wave" variant="text" width="70%" height={45} />
                  <Skeleton animation="wave" variant="text" width="60%" height={45} />
                  <Skeleton animation="wave" variant="text" width="60%" height={45} />
                  <Skeleton animation="wave" variant="text" width="80%" height={60} />
                </Box>
              </Grid>
            </Grid>
          ) : (
            // Tampilkan data setelah loading selesai
            <>
              {unitIsSuccess && dataUnit.data?.map((item, index) => (
                <Grid container key={index}>
                  <Grid item xs={6}>
                    <Box sx={{ ...flexCenter, width: "100%", height: "auto" }}>
                      <Box
                        sx={{
                          display: "flex", justifyContent: "flex-start", alignItems: "flex-end",
                          backgroundImage: `url(${item.imgUnit})`,
                          backgroundRepeat: 'no-repeat',
                          width: '400px', height: '400px',
                          backgroundSize: "cover", backgroundPosition: "center",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          src={item.imgBrand}
                          alt="brand"
                          style={{ position: "absolute", width: "100px", height: "50px", borderRadius: "2px" }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%", height: "100%", flexDirection: "column", padding: "20px" }}>
                      <Typography sx={{ fontWeight: "thin", fontSize: "18px" }}>
                        {item.nameUnit}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold", fontSize: "28px", letterSpacing: "5px" }}>
                        {item.typeUnit}
                      </Typography>
                      <Typography sx={{ fontWeight: "medium", fontSize: "24px", width: "80%" }}>
                        {`${formatRupiah(item.priceBuyUnit)}/unit`}
                      </Typography>
                      <Typography sx={{ fontWeight: "medium", fontSize: "24px", width: "80%" }}>
                        {`${formatRupiah(item.priceRentUnit)}/month`}
                      </Typography>
                      <Typography sx={{ fontWeight: "medium", fontSize: "12px", width: "80%", m: "20px 0 20px 0" }}>
                        {item.descUnit}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                        <ButtonOutlined
                          onClick={handleModalBuy}
                          text="Beli"
                          primaryColor={"#193D71"}
                          secondColor={"#193D71"}
                          hoverColor={"#F2F7FF"}
                          width={"100px"}
                          height={"40px"}
                          fz={"16px"}
                        />
                        <ModalBuy
                          formik={formikBuy}
                          checked={checked}
                          isOpen={isModalBuy}
                          priceBuy={priceBuy}
                          labelInput={labelInput}
                          onChecked={handleChecked}
                          onChange={handleChangeBuyForm}
                          onSubmit={handleBuySubmit}
                          onClose={handleModalClose}
                        />


                        <ButtonOutlined
                          onClick={handleModalRent}
                          text="Sewa"
                          primaryColor={"#D9D630"}
                          secondColor={"#D9D630"}
                          hoverColor={"#FFFEF0"}
                          width={"100px"}
                          height={"40px"}
                          fz={"16px"}
                        />
                        <ModalRent
                          formik={formikRent}
                          checked={checked}
                          isOpen={isModalRent}
                          priceRent={priceRent}
                          labelInput={labelInput}
                          dataPricelist={pricelistIsSuccess && dataPricelist.data}
                          onChecked={handleChecked}
                          onChange={handleChangeRentForm}
                          onSubmit={handleRentSubmit}
                          onClose={handleModalClose}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </>
          )}

        </Box>
      </Box>
      <Footer />
    </>
  )
}


export default UnitDetailPage;
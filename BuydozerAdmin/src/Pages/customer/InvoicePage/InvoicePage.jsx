import React, { useState } from 'react'
import { flexCenter } from '@themes/commonStyles'
import { Box, IconButton, Skeleton, TextField, Typography } from '@mui/material'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import buydozerFont from '@assets/customer/buydozerFont.png'
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'
import { KeyboardBackspaceRounded, WhatsApp } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { dateToMonth, formatRupiah, formatIndoPhone, numToWord, imgConvert } from '@utils'
// '../../../Utils' 

const authData = localStorage.getItem('AuthData')
const auth = JSON.parse(authData)
const accessToken = auth.accessToken
// const accessToken = localStorage.getItem("AccessToken")

const GET_TRANSACTION_BUY = async ({ transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_BUY = `https://localhost:5001/api/TransactionDetailBuy/GetTransactionDetailBuy?ParameterTransactionNumber=${transactionNum}&SortDate=true&PageNumber=1&PageSize=1`
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTION_BUY, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data.items
    console.log("INI TRXBUY", data);
    return { data };
  } catch (error) {
    console.error('Error get transaction buy:', error);
  }
};

const GET_TRANSACTION_RENT = async ({ transactionNum }) => {
  const BASE_URL_GET_TRANSACTION_RENT = `https://localhost:5001/api/TransactionDetailRents/GetTransactionDetailRent?ParameterTransactionNumber=${transactionNum}&SortDate=true&PageNumber=1&PageSize=1`
  try {
    const response = await axios.get(BASE_URL_GET_TRANSACTION_RENT, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data.items
    console.log("INI TRXRENT", data);

    return { data };
  } catch (error) {
    console.error('Error get transaction rent:', error);
  }
};

const PUT_TRANSACTION_ONGOING = async ({ idTransaction, paymentImg }) => {
  const requestBody = {
    id: idTransaction,
    paymentConfirmationReceiptTransaction: paymentImg,
    statusTransaction: 2
  }

  console.log("LOG REQ BODY", requestBody);
  const BASE_URL_PUT_TRANSACTION_ONGOING = `https://localhost:5001/api/TransactionOnGoing/UpdateTransactionOnGoing/${idTransaction}`
  try {
    const response = await axios.put(BASE_URL_PUT_TRANSACTION_ONGOING, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data
    console.log("INI RESPONSE BUKTI", data);
    return { data };
  } catch (error) {
    console.error('Error fetching Unit:', error);
  }
};

const statusConfig = [
  { content: "DIBATALKAN", color: "#EC3535" },
  { content: "MENUNGGU PEMBAYARAN", color: "#D9D630" },
  { content: "SUDAH DIBAYAR", color: "#28D156" },
  { content: "SELESAI", color: "#193D71" },
]

const InvoicePage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { transactionNum } = useParams()
  const [paymentImg, setPaymentImg] = useState('')
  console.log({ paymentImg });

  // GET DATA TRANSACTION BUY
  const { data: dataBuy, isLoading: buyIsLoading, isFetching: buyIsFetching, isSuccess: buyIsSuccess, errorBuy } = useQuery({
    queryKey: ["TransactionBuy", {
      transactionNum: transactionNum,
    }],
    queryFn: () => GET_TRANSACTION_BUY({
      transactionNum: transactionNum,
    }),
  })

  // GET DATA TRANSACTION RENT
  const { data: dataRent, isLoading: rentIsLoading, isFetching: rentIsFetching, isSuccess: rentIsSuccess, errorRent } = useQuery({
    queryKey: ["TransactionRent", {
      transactionNum: transactionNum,
    }],
    queryFn: () => GET_TRANSACTION_RENT({
      transactionNum: transactionNum,
    }),
  })

  // UPDATE PAYMENT IMG
  const { mutate: putPaymentImg, error: ErrorPaymentImg, isSuccess: paymentImgIsSuccess, isPending: paymentImgIsPending } = useMutation({
    mutationFn: PUT_TRANSACTION_ONGOING,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['TransactionOnGoing'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan pembelian:", error);
    },
  })

  console.log("rentIsSuccess:", rentIsSuccess);
  console.log("dataRent:", dataRent);
  console.log("dataBuy:", dataBuy);

  const isLoading = buyIsLoading || rentIsLoading;
  const isFetching = buyIsFetching || rentIsFetching;
  const isSuccess = buyIsSuccess || rentIsSuccess;

  const transactionData = rentIsSuccess && dataRent?.data?.length ? dataRent.data[0] : buyIsSuccess && dataBuy?.data?.length ? dataBuy.data[0] : {};
  console.log({ dataBuy, dataRent, transactionData });

  const statusIndex = transactionData.statusTransaction;
  const status = statusConfig[statusIndex];

  const handleWhatsAppClick = () => {
    const phoneNumber = "+6285748382270";
    const message = encodeURIComponent(
      "Halo, saya telah melakukan pemesanan unit. Bagaimana untuk peroses pembayaran selanjutnya?"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };


  const handleUploadPaymentConfirm = async () => {
    await putPaymentImg({
      idTransaction: transactionData.id,
      paymentImg: paymentImg
    })
  }

  const handleOnChangePaymentImg = async (event) => {
    const paymentEncoded = await imgConvert(event.target.files[0]);
    setPaymentImg(paymentEncoded);
  };


  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%", padding: "30px" }}>
      <IconButton color='primaryDark' onClick={() => navigate("/buydozer/transaksi")} sx={{ margin: "10px" }}>
        <KeyboardBackspaceRounded color="primaryDark" sx={{ fontSize: "30px" }} />
      </IconButton>

      <Box sx={{ ...flexCenter, width: "70%", height: "100%", flexDirection: "column" }}>

        {/* INVOICE HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "200px", padding: "0px 20px", backgroundColor: "#FFFFE3", }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <img src={buydozerLogo} alt="" style={{ width: "80px" }} />
            <img src={buydozerFont} alt="" style={{ width: "150px", margin: "-10px 9px", backgroundColor: "transparent", filter: "" }} />
            <Typography sx={{ fontSize: "16px", color: "#D9D630", margin: "10px 14px" }}>
              Perusahaan distributor alat berat modern
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Typography sx={{ fontSize: "36px", color: "#193D71", fontWeight: "bold" }}>
              INVOICE
            </Typography>
            <Typography sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium", mt: "-10px" }}>
              {isFetching ? (
                <Skeleton variant="text" width={"200px"} sx={{ fontSize: "24px", color: "#193D71", fontWeight: "medium" }} />
              ) : (
                rentIsSuccess ? "Penyewaan Unit" : "Pembelian Unit"
              )}
            </Typography>
            <Typography sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }}>
              {isFetching ? (
                <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
              ) : (
                transactionData?.transactionNum || "trxbuyrentxxxxx"
              )}
            </Typography>
            <Typography sx={{ fontSize: "18px", color: "#193D71", fontWeight: "medium", mb: "10px" }}>
              {isFetching ? (
                <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
              ) : (
                dataRent?.data?.length
                  ? `${dateToMonth(transactionData.dateRent)} - ${dateToMonth(transactionData.dateReturn)}`
                  :
                  dateToMonth(transactionData.dateBuy)
              )
              }
            </Typography>
            <ButtonContained
              text={status ? status.content : ""}
              primaryColor={"#FFFFFF"}
              secondColor={status ? status.color : "#EBEBEB"}
              hoverColor={status ? status.color : "#EBEBEB"}
              width={"220px"}
              height={"35px"}
              fz={"14px"}
            />
          </Box>
        </Box>

        {/* INVOICE CONTENT */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", padding: "10px 20px", backgroundColor: "#FBFDFF", }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", height: "250px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", p: "0px 15px" }}>
              <Typography sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${transactionData?.nameUnit} ${transactionData?.typeUnit}`
                )}
              </Typography>

              <Typography sx={{ fontSize: "20px", color: "#193D71", fontWeight: "thin" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "25px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${transactionData?.qtyTransaction} unit`
                )}
              </Typography>

              <Typography sx={{ fontSize: "18px", color: "#193D71", fontWeight: "thin" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "25px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  dataRent?.data?.length ? (
                  `Durasi sewa ${transactionData?.months} bulan`) : ""
                )}
              </Typography>
            </Box>


            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Typography sx={{ fontSize: "18px", color: "#23A647", fontWeight: "medium" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  dataRent?.data?.length
                    ?
                    (`${formatRupiah(transactionData.priceRentUnit * transactionData.qtyTransaction)}`)
                    :
                    (`${formatRupiah(transactionData.priceBuyUnit * transactionData.qtyTransaction)}`)
                )}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", width: "100%", flexDirection: "column" }}>
            <Box sx={{ ...flexCenter, flexDirection: "row", gap: "5px" }}>
              <Typography sx={{ fontSize: "16px", color: "#193D71", fontWeight: "medium" }}>
                TOTAL HARGA UNIT
              </Typography>
              <Typography sx={{ fontSize: "20px", color: "#23A647", fontWeight: "bold" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${formatRupiah(transactionData.totalPriceTransaction)}`
                )}
              </Typography>
            </Box>
            <Box sx={{ ...flexCenter, flexDirection: "row", gap: "5px" }}>
              <Typography sx={{ fontSize: "12px", color: "#193D71", fontWeight: "medium" }}>
                TERBILANG
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#23A647", fontWeight: "bold" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${numToWord(transactionData.totalPriceTransaction)}`
                )}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* INVOICE FOOTER */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", padding: "20px 20px", backgroundColor: "#193D71", }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "50px" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "14px", color: "#D9D630", fontWeight: "reguler", mb: "10px" }}>
                kepada
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#D9D630", fontWeight: "medium" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "16px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${transactionData?.receiverName}`
                )}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#D9D630", fontWeight: "100", width: "80%" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "16px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${transactionData?.receiverAddress}`
                )}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#D9D630", fontWeight: "100" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "16px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  `${formatIndoPhone(transactionData?.receiverHp)}`
                )}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "14px", color: "#D9D630", fontWeight: "reguler", mb: "10px" }}>
                dari
              </Typography>
              <Typography sx={{ fontSize: "16px", color: "#D9D630", fontWeight: "medium" }}>
                BUYDOZER
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#D9D630", fontWeight: "100", width: "80%" }}>
                JL. Hasanudin no 56, Cakung, Jakarta Timur, Indonesia
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#D9D630", fontWeight: "100" }}>
                +62 8956-3799-8198
              </Typography>
            </Box>

          </Box>
        </Box>


        {/* UPLOAD PAYMENT CONFIMR */}
        <Box sx={{ width: "100%", flexDirection: "column", p: "10px 0px", mb: "10px" }}>
          {transactionData.statusTransaction === 1 ? (
            <>
              <Typography sx={{ fontSize: "18px", color: "#193D71", fontWeight: "medium", ml: "12px" }}>
                Upload Bukti Pembayaran
              </Typography>
              <TextField
                onChange={handleOnChangePaymentImg}
                color='primaryDark' type='file' size='small' sx={{ width: "100%", p: "2px 0px", bgcolor: "white", mb: "10px" }}>
              </TextField>
              {paymentImgIsPending
                ? (
                  <ButtonContained
                    text={"Mengupload Bukti Pembayaran..."}
                    primaryColor={"#D9D630"}
                    secondColor={"#193D71"}
                    hoverColor={"#215093"}
                    width={"100%"}
                    height={"40px"}
                    fz={"14px"}
                  />
                ) : (
                  <ButtonContained
                    onClick={handleUploadPaymentConfirm}
                    text={"Kirim Bukti Pembayaran"}
                    primaryColor={"#D9D630"}
                    secondColor={"#193D71"}
                    hoverColor={"#215093"}
                    width={"100%"}
                    height={"40px"}
                    fz={"14px"}
                  />
                )}
            </>
          )
            : (
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "40px",
                borderRadius: "10px",
                color: "#D9D630",
                border: `2px solid ${"#7688A3"}`,
                backgroundColor: "#7688A3",
                fontSize: "14px",
                fontWeight: "medium",
              }}>
                Bukti Berhasil diupload
              </Box>
            )}
        </Box>

        {/* BATALKAN TRANSAKSI */}
        {transactionData.statusTransaction === 1 ? (
          <Box sx={{ ...flexCenter, width: "100%", height: "150px", padding: "5px 10px", flexDirection: "column", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}>
            <Typography sx={{ width: "90%", fontSize: "12px", color: "#193D71", fontWeight: "medium", textAlign: "center" }}>
              Permintaan Penawaran anda telah dikirimkan ke admin dan berikut merupakan transaksi invoice dari pembelian unit yang anda lakukan. Setelah ini anda akan melakukan private message dengan admin kami untuk memroses pembayaran lebih lanjut. Jika semua proses pembayaran sesuai prosedur pembaayran yang telah diinstruksikan oleh admin Buydozer telah selesai, silahkan mengupload bukti pembayaran untuk menguatkan proses transaksi.
            </Typography>
            <Box sx={{ ...flexCenter, flexDirection: "row", gap: "15px", mt: "10px" }}>

              <ButtonContained
                onClick={handleWhatsAppClick}
                text={"Konfirmasi ke admin"}
                icon={<WhatsApp sx={{ fontSize: "20px", mr: "5px" }} />}
                primaryColor={"#FFFFFF"}
                secondColor={"#28D156"}
                hoverColor={"#23A647"}
                width={"180px"}
                height={"35px"}
                fz={"12px"}
              />
              <ButtonContained
                // onClick={}
                text={"Batalkan"}
                primaryColor={"#FFFFFF"}
                secondColor={"#EC3535"}
                hoverColor={"#C32828"}
                width={"180px"}
                height={"35px"}
                fz={"12px"}
              />
            </Box>
          </Box>
        ) : null}
      </Box>
      {/* ))} */}
    </Box>
  )
}

export default InvoicePage
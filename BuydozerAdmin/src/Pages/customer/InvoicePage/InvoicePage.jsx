import { useState } from 'react'
import { flexCenter } from '@themes/commonStyles'
import { API_BASE_URL } from '../../../config'
import { Box, Button, IconButton, Skeleton, TextField, Typography } from '@mui/material'
import axios from 'axios'
import useAuth from '@hooks/useAuth'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import buydozerFont from '@assets/customer/buydozerFont.png'
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'
import ModalPaymentConfirm from '@components/admin/Atoms/Modal/ModalPaymentConfirm'
import { CancelRounded, KeyboardBackspaceRounded, WhatsApp } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dateToMonth, formatRupiah, formatIndoPhone, numToWord, imgConvert } from '@utils'
import { GET_TRANSACTION_ONGOING, GET_TRANSACTION_RENT, GET_TRANSACTION_BUY, PUT_TRANSACTION_STATUS_BUY, PUT_TRANSACTION_STATUS_RENT } from '@api/api'


const accessToken = localStorage.getItem("AccessToken");

const PUT_TRANSACTION_ONGOING = async ({ idTransaction, paymentImg }) => {
  const requestBody = {
    id: idTransaction,
    paymentConfirmationReceiptTransaction: paymentImg,
  }

  const BASE_URL_PUT_TRANSACTION_ONGOING = `${API_BASE_URL}/api/TransactionOnGoing/UpdateTransactionOnGoing/${idTransaction}`
  try {
    const response = await axios.put(BASE_URL_PUT_TRANSACTION_ONGOING, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = response.data
    return { data };
  } catch (error) {
    console.error('Error update payment confirm:', error);
  }
};

const statusConfig = [
  { content: "DIBATALKAN", color: "#EC3535" },
  { content: "MENUNGGU PEMBAYARAN", color: "#D9D630" },
  { content: "SUDAH DIBAYAR", color: "#28D156" },
  { content: "SELESAI", color: "#193D71" },
]

const InvoicePage = () => {
  const auth = useAuth()
  const name = auth.auth.userName
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { transactionNum } = useParams()
  const [paymentImg, setPaymentImg] = useState('')
  const [isPayment, setIsPayemnt] = useState(false)
  const [modalImg, setModalImg] = useState(false)

  // GET DATA TRANSACTION BUY
  const { data: dataBuy, isLoading: buyIsLoading, isFetching: buyIsFetching, isSuccess: buyIsSuccess, error: errorBuy } = useQuery({
    queryKey: ["TransactionBuy", {
      transactionNum: transactionNum,
    }],
    queryFn: () => GET_TRANSACTION_BUY({
      transactionNum: transactionNum,
    }),
  })

  // GET DATA TRANSACTION RENT
  const { data: dataRent, isLoading: rentIsLoading, isFetching: rentIsFetching, isSuccess: rentIsSuccess, error: errorRent } = useQuery({
    queryKey: ["TransactionRent", {
      transactionNum: transactionNum,
    }],
    queryFn: () => GET_TRANSACTION_RENT({
      transactionNum: transactionNum,
    }),
  })

  // GET DATA TRANSACTION IMG
  const { data: dataImg, isLoading: imgIsLoading, isFetching: imgIsFetching, isSuccess: imgIsSuccess, error: errorImg } = useQuery({
    queryKey: ["TransactionOngoing", {
      username: name,
      transactionNum: transactionNum,
    }],
    queryFn: () => GET_TRANSACTION_ONGOING({
      username: name,
      transactionNum: transactionNum,
    }),
  })

  // UPDATE PAYMENT IMG
  const { mutate: putPaymentImg, error: errorPaymentImg, isSuccess: paymentImgIsSuccess, isPending: paymentImgIsPending } = useMutation({
    mutationFn: PUT_TRANSACTION_ONGOING,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['TransactionOnGoing'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat melakukan pembelian:", error);
    },
  })

  // BATALKAN PESANAN || UPDATE STATUS TRANSACTION TO REJECTED
  // MUTATE TRANSACTION BUY TO PUT STATUS TRANSACTION
  const { mutate: putStatusBuy, error: errorPutBuy, isSuccess: putBuyIsSuccess, isPending: putBuyIsPending } = useMutation({
    mutationFn: PUT_TRANSACTION_STATUS_BUY,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['TransactionBuy'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengupdate data pembelian:", error);
    },
  })

  // MUTATE TRANSACTION RENT TU PUT STATUS
  const { mutate: putStatusRent, error: errorPutRent, isSuccess: putRentIsSuccess, isPending: putRentIsPending } = useMutation({
    mutationFn: PUT_TRANSACTION_STATUS_RENT,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['TransactionRent'], (oldData) => [...oldData, data]);
    },
    onError: (error) => {
      console.error("Error saat mengupdate data penyewaan:", error);
    },
  })

  if (errorBuy, errorImg, errorPaymentImg, errorPutBuy, errorPutRent, errorRent) {
    navigate("/*")
  }
  const isLoading = buyIsLoading || rentIsLoading;
  const isFetching = buyIsFetching || rentIsFetching;
  const isSuccess = buyIsSuccess || rentIsSuccess;

  const transactionData = rentIsSuccess && dataRent?.data?.items.length ? dataRent.data.items[0] : buyIsSuccess && dataBuy?.data?.items.length ? dataBuy.data.items[0] : {};
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
    {
      paymentImg
        ? (
          await putPaymentImg({
            idTransaction: transactionData.id,
            paymentImg: paymentImg
          })
        )
        : setIsPayemnt(true)
    }
  }

  const handleOnChangePaymentImg = async (event) => {
    const paymentEncoded = await imgConvert(event.target.files[0]);
    setPaymentImg(paymentEncoded);
  };

  const handleCancleTransaction = async () => {
    {
      dataRent?.data?.items?.length
        ? await putStatusRent({
          id: transactionData.id,
          statusTransaction: 0
        })
        : await putStatusBuy({
          id: transactionData.id,
          statusTransaction: 0
        })
    }
  }

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
                dataRent?.data?.items?.length ? "Penyewaan Unit" : "Pembelian Unit"
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
                dataRent?.data?.items?.length
                  ? `${dateToMonth(transactionData.dateRent)} - ${dateToMonth(transactionData.dateReturn)}`
                  : dateToMonth(transactionData.dateBuy)
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
                  dataRent?.data?.items?.length ? (
                    `Durasi sewa ${transactionData?.months} bulan`) : ""
                )}
              </Typography>
            </Box>


            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Typography sx={{ fontSize: "18px", color: "#23A647", fontWeight: "medium" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  dataRent?.data?.items?.length
                    ?
                    (`${formatRupiah(transactionData.priceRentUnit * transactionData.qtyTransaction * transactionData?.months)}`)
                    :
                    (`${formatRupiah(transactionData.priceBuyUnit * transactionData.qtyTransaction)}`)
                )}
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#23A647", fontWeight: "medium" }}>
                {isFetching ? (
                  <Skeleton variant="text" width={"200px"} sx={{ fontSize: "20px", color: "#193D71", fontWeight: "medium" }} />
                ) : (
                  dataRent?.data?.items?.length
                    ?
                    (`+ ${formatRupiah(transactionData.totalPriceTransaction - (transactionData.priceRentUnit * transactionData.qtyTransaction * transactionData?.months))}`)
                    : ""
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
                color='primaryDark' type='file' size='small' sx={{ width: "100%", p: "2px 0px", bgcolor: "white" }}
                error={isPayment}
                helperText={isPayment && "Upload Foto terlebih dahulu"}>
              </TextField>
              {paymentImg &&
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    onClick={() => setModalImg(true)}
                    color='primary'
                    sx={{ mb: "10px", width: "60px", height: "60px", flexDirection: "row", display: "flex", gap: "10px" }}>
                    <img src={paymentImg} alt="ini foto" style={{ width: "50px", height: "50px" }} />
                  </Button>
                  <Box sx={{ ...flexCenter }}>
                    <IconButton color='primaryDark' size="small" onClick={() => setPaymentImg('')}>
                      <CancelRounded />
                    </IconButton>
                  </Box>
                  <ModalPaymentConfirm
                    typeModal={"Bukti Pembayaran"}
                    img={paymentImg}
                    isOpen={modalImg}
                    onClose={() => setModalImg(false)}
                  />
                </Box>
              }
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
              <>
                <ButtonContained
                  onClick={() => setModalImg(true)}
                  text={"Lihat Bukti Pembayaran"}
                  primaryColor={"#193D71"}
                  secondColor={"#D9D630"}
                  hoverColor={"#F5E94C"}
                  width={"100%"}
                  height={"40px"}
                  fz={"14px"}
                />
                <ModalPaymentConfirm
                  typeModal={"Bukti Pembayaran"}
                  img={imgIsSuccess && dataImg.data[0].paymentConfirmationReceipt}
                  isOpen={modalImg}
                  onClose={() => setModalImg(false)}
                />
              </>
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
              {putBuyIsPending || putRentIsPending
                ?
                <ButtonContained
                  text={"Proses Pembatalan..."}
                  primaryColor={"#FFFFFF"}
                  secondColor={"#EC3535"}
                  hoverColor={"#C32828"}
                  width={"180px"}
                  height={"35px"}
                  fz={"12px"}
                />
                :
                <ButtonContained
                  onClick={handleCancleTransaction}
                  text={"Batalkan"}
                  primaryColor={"#FFFFFF"}
                  secondColor={"#EC3535"}
                  hoverColor={"#C32828"}
                  width={"180px"}
                  height={"35px"}
                  fz={"12px"}
                />
              }
            </Box>
          </Box>
        ) : null}
      </Box>
      {/* ))} */}
    </Box>
  )
}

export default InvoicePage
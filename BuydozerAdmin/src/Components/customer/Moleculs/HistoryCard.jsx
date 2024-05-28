import ButtonContained from '../Atoms/Button/ButtonContained'
import { flexCenter } from '@themes/commonStyles'
import { useNavigate } from 'react-router-dom'
import { Box, Divider, Skeleton, Typography } from '@mui/material'
import { dateToMonth, formatRupiah, formatIndoPhone, numToWord, imgConvert } from '@utils'

const statusConfig = [
  { content: "DIBATALKAN", color: "#EC3535", message: "Pesanan telah dibatalkan" },
  { content: "MENUNGGU PEMBAYARAN", color: "#D9D630", message: "Menunggu anda menyelesaikan proses pembayaran" },
  { content: "SUDAH DIBAYAR", color: "#28D156", message: "Proses pembayaran telah selesai" },
  { content: "SELESAI", color: "#193D71", message: "Pesanan telah selesai" },
]

const HistoryCard = ({ dataHistory, isSuccess, isLoading, isFetching }) => {
  const navigate = useNavigate()
  const data = dataHistory
  const statusIndex = data.statusTransaction;
  const status = statusConfig[statusIndex];
  const handleNavigateToInvoice = () => {
    navigate("/buydozer/invoice/" + data.transactionNum),
      window.scrollTo(0, 0)
  }

  return (
    <>
      <Box sx={{ ...flexCenter, width: "100%", height: "auto", boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.1)", borderRadius: "40px", padding: "20px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "28px", fontWeight: "medium", color: "#193D71" }}>
              {isFetching
                ? <Skeleton variant="text" animation="wave" width={"200px"} height={"60px"} />
                : data.isBuy ? "Pembelian" : "Penyewaan"
              }
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "end" }}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "#193D71" }}>
                {isFetching
                  ? <Skeleton variant="text" animation="wave" width={"200px"} height={"30px"} />
                  : data.transactionNum
                }
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: "medium", color: "#193D71" }}>
                {isFetching
                  ? <Skeleton variant="text" animation="wave" width={"200px"} height={"30px"} />
                  : data.isBuy ? dateToMonth(data.dateTransaction) : `${dateToMonth(data.dateRent)} - ${dateToMonth(data.dateReturn)}`
                }
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", m: "10px 0px" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>

              {isFetching
                ? <Skeleton variant="rounded" animation="wave" width={"150px"} height={"150px"} />
                : <img src={data.imgUnit} alt="ini poto" style={{ border: "solid black 1px", width: "150px", height: "150px" }} />
              }
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71" }}>
                  {isFetching
                    ? <Skeleton variant="text" animation="wave" width={"150px"} height={"20px"} />
                    : data.nameUnit
                  }
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "#193D71" }}>
                  {isFetching
                    ? <Skeleton variant="text" animation="wave" width={"150px"} height={"20px"} />
                    : data.typeUnit
                  }
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71" }}>
                  {isFetching
                    ? <Skeleton variant="text" animation="wave" width={"150px"} height={"20px"} />
                    : `${data.qtyTransaction} Unit` 
                  }
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "end" }}>
              {!data.isBuy
                ? <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71" }}>
                  {isFetching
                    ? <Skeleton variant="text" animation="wave" width={"150px"} height={"20px"} />
                    : `${data.months} Bulan`
                  }
                </Typography>
                : ""}
              <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71" }}>
                {isFetching
                  ? <Skeleton variant="text" animation="wave" width={"150px"} height={"20px"} />
                  : formatRupiah(data.totalPriceTransaction)
                }
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "medium", color: "#193D71" }}>
                {isFetching
                  ? <Skeleton variant="text" animation="wave" width={"150px"} height={"20px"} />
                  : numToWord(data.totalPriceTransaction)
                }
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", m: "10px 0px" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", gap: "10px" }}>
            <Box>
              {isFetching
                ? <Skeleton variant="text" animation="wave" width={"200px"} height={"70px"} />
                :
                data.isBuy 
                ? 
                <ButtonContained
                  onClick={handleNavigateToInvoice}
                  text={"Lihat Invoice"}
                  primaryColor={"#D9D630"}
                  secondColor={"#193D71"}
                  hoverColor={"#215093"}
                  width={"220px"}
                  height={"35px"}
                  fz={"16px"}
                />
                :
                <ButtonContained
                  onClick={handleNavigateToInvoice}
                  text={"Lihat Invoice"}
                  primaryColor={"#193D71"}
                  secondColor={"#D9D630"}
                  hoverColor={"#F5E94C"}
                  width={"220px"}
                  height={"35px"}
                  fz={"16px"}
                />
              }
            </Box>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              {isFetching
                ? <Skeleton variant="text" animation="wave" width={"200px"} height={"70px"} />
                : (
                  <>
                    <Typography sx={{ fontSize: "12px", fontWeight: "medium", color: "#193D71" }}>
                      {status.message}
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
                  </>
                )
              }
            </Box>

          </Box>


        </Box>
      </Box>
    </>
  )
}

export default HistoryCard
import { useEffect, useState } from 'react'
import Navbar from '@layouts/customer/Navbar/Navbar'
import Footer from '@layouts/customer/Footer/Footer'
import { Box, Divider, Tab, Typography } from '@mui/material'
import { flexCenter } from '@themes/commonStyles'
import useAuth from '@hooks/useAuth';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import HistoryCard from '@components/customer/Moleculs/HistoryCard'
import SearchInput from '@components/customer/Moleculs/SearchInput'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GET_TRANSACTION_ONGOING } from '@api/api'
import axios from 'axios'


const authData = localStorage.getItem('AuthData')
const auth = JSON.parse(authData)
const accessToken = auth.accessToken


const scrollableBoxStyles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "500px",
  flexDirection: "column",
  overflow: "auto",
  overflowY: "scroll",
  borderBottom: "2px solid #AABDD7",
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: "#2A6DD0",
    borderRadius: '5px',
    position: 'relative',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: "#FCFCFC",
  },
};


const TransactionPage = ({ }) => {
  const auth = useAuth()
  const name = auth.auth.userName 
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [tab, setTab] = useState("buyTransaction")
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    refetch()

  }, [authData, auth]);


  const { data: dataHistory, isLoading: historyIsLoading, isFetching: historyIsFetching, isSuccess: historyIsSuccess, errorHistory, refetch } = useQuery({
    queryKey: ["TransactionOngoing", {
      username: name,
      transactionNum: searchValue,
    }],
    queryFn: () => GET_TRANSACTION_ONGOING({
      username: name,
      transactionNum: searchValue,
    }),
  })

  let dataHistoryBuy = [];
  let dataHistoryRent = [];

  if (historyIsSuccess && dataHistory) {
    dataHistoryBuy = dataHistory?.data?.filter(item => item.isBuy === true && name === item.userName) || [];
    dataHistoryRent = dataHistory?.data?.filter(item => item.isBuy === false && name === item.userName) || [];
  }
  // const status = statusConfig[statusIndex];
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    setSearchValue("")
  };

  const handleSearchTransaction = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };


  useEffect(() => {
    refetch
  }, [searchValue, refetch])


  return (
    <>
      <Navbar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "auto",
        padding: "5% 10%",
        flexDirection: "column",
        bgcolor: "#FCFCFC"
      }}>
        <Box border={0} sx={{ ...flexCenter, width: "100%", m: "20px 20px" }}>
          <Typography sx={{ fontWeight: "medium", fontSize: "28px", letterSpacing: "10px" }}>
            TRANSAKSI ANDA
          </Typography>
        </Box>

        <Box border={0} sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <TabContext value={tab}>
            <Box sx={{ ...flexCenter, width: "100%" }}>
              <TabList sx={{ ...flexCenter, width: "100%" }} onChange={handleChangeTab} centered>
                <Tab sx={{ width: "50%" }} label="Pembelian" value="buyTransaction" />
                <Tab sx={{ width: "50%" }} label="Penyewaan" value="rentTransaction" />
              </TabList>
            </Box>

            <Box sx={{ width: "100%", height: "600px" }}>
              <TabPanel value="buyTransaction">
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                  <SearchInput
                    color={"#2A6DD0"}
                    bgColor={"#FFFFFF"}
                    searchValue={searchValue}
                    handleSearch={handleSearchTransaction}
                    placeholder={"Cari Nomor Transaksi"}
                  />
                  <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#2A6DD0", letterSpacing: "3px" }}>
                    {historyIsFetching ? "Memuat..." :
                      `Anda memiliki ${historyIsSuccess && dataHistoryBuy.length} Transaksi`
                    }
                  </Typography>
                </Box>
                <Divider sx={{ width: "100%", m: "10px 0px" }} />
                <Box sx={scrollableBoxStyles}>
                  {historyIsSuccess && dataHistoryBuy.length === 0 && (
                    <Typography sx={{ fontSize: "20px", fontWeight: "medium", color: "#AABDD7", mt: "50px" }}>
                      TRANSAKSI YANG ANDA CARI TIDAK DITEMUKAN
                    </Typography>
                  )}
                  {historyIsSuccess
                    ? (
                      dataHistoryBuy.map(data => (
                        <Box key={data.id} sx={{ ...flexCenter, width: "100%", padding: "20px 10px" }}>
                          <HistoryCard
                            dataHistory={data}
                            isSuccess={historyIsSuccess}
                            isFetching={historyIsFetching}
                            isLoading={historyIsLoading}
                          />
                        </Box>

                      ))
                    )
                    : ("")}
                </Box>
              </TabPanel>




              <TabPanel value="rentTransaction">
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                  <SearchInput
                    color={"#2A6DD0"}
                    bgColor={"#FFFFFF"}
                    searchValue={searchValue}
                    handleSearch={handleSearchTransaction}
                    placeholder={"Cari Nomor Transaksi"}
                  />
                  <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#2A6DD0", letterSpacing: "3px" }}>
                    {historyIsFetching ? "Memuat..." :
                      `Anda memiliki ${historyIsSuccess && dataHistoryRent.length} Transaksi`
                    }
                  </Typography>
                </Box>
                <Divider sx={{ width: "100%", m: "10px 0px" }} />
                <Box sx={scrollableBoxStyles}>
                  {historyIsSuccess && dataHistoryRent.length === 0 && (
                    <Typography sx={{ fontSize: "20px", fontWeight: "medium", color: "#AABDD7", mt: "50px" }}>
                      TRANSAKSI TIDAK DITEMUKAN
                    </Typography>
                  )}
                  {historyIsSuccess
                    ? (
                      dataHistoryRent.map(data => (
                        <Box key={data.id} sx={{ ...flexCenter, width: "100%", padding: "20px 10px" }}>
                          <HistoryCard
                            dataHistory={data}
                            isSuccess={historyIsSuccess}
                            isFetching={historyIsFetching}
                            isLoading={historyIsLoading}
                          />
                        </Box>

                      ))
                    )
                    : ("")}
                </Box>
              </TabPanel>
            </Box>

          </TabContext>

        </Box>


      </Box>
    </>
  )
}

export default TransactionPage
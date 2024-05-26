import { useQuery } from '@tanstack/react-query';
import { flexCenter } from '@themes/commonStyles'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, CircularProgress, Grid, Skeleton, Typography } from '@mui/material'
import {
  GET_UNIT,
  GET_USER,
  GET_UNIT_REMAINING,
  GET_TRANSACTION_BUY,
  GET_TRANSACTION_RENT,
  GET_TRANSACTION_REPORT,
  GET_USER_TRANSACTION_TYPE,
  GET_SUMMARY_TRANSACTION_STATUS,
} from '@api/api'
import { AgricultureRounded, GroupsRounded, PaidRounded, ShoppingCart, } from '@mui/icons-material';
import Chart from 'react-apexcharts'
import InfoCard from '@components/admin/Moleculs/InfoCard/InfoCard';
import tagLineBg from '@assets/admin/tagLineBg.png'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import DonutChart from '@components/admin/Moleculs/DonutChart/DonutChart';


const authData = localStorage.getItem('AuthData')
const auth = JSON.parse(authData)
const accessToken = auth.accessToken
const userName = auth.userName

const Dashboard = () => {
  const navigate = useNavigate()

  const { data: dataUnit = { data: [] }, isLoading: unitIsLoading, isFetching: unitIsFetching, isSuccess: unitIsSuccess, error: unitIsError, refetch: unitRefetch } = useQuery({
    queryKey: ["Unit", {
      nameUnit: "",
      sortBuy: true,
      pageNumber: 1,
      pageSize: 50
    }],
    queryFn: () => GET_UNIT({
      nameUnit: "",
      sortBuy: true,
      pageNumber: 1,
      pageSize: 50
    }),
  })

  const { data: dataUser, isLoading: userIsLoading, isFetching: userIsFetching, isSuccess: userIsSuccess, error: userIsError, refetch: userRefetch } = useQuery({
    queryKey: ["User", {
      userName: "",
      sortUserName: true,
      pageNumber: 1,
      pageSize: 1
    }],
    queryFn: () => GET_USER({
      userName: "",
      sortUserName: true,
      pageNumber: 1,
      pageSize: 1
    }),
  })
  console.log(userIsSuccess && dataUser);

  const { data: dataTransactionBuy = { data: [] }, isFetching: transaksiBuyIsFetching, isSuccess: transaksiBuyIsSuccess, refetch: transactionBuyRefetch } = useQuery({
    queryKey: ["TransactionBuy", {
      transactionNum: "%25TRX%25",
    }],
    queryFn: () => GET_TRANSACTION_BUY({
      transactionNum: "%25TRX%25",
    }),
  })

  const { data: dataTransactionRent = { data: [] }, isFetching: transaksiRentIsFetching, isSuccess: transaksiRentIsSuccess, refetch: transactionRentRefetch } = useQuery({
    queryKey: ["TransactionRent", {
      transactionNum: "%25TRX%25",
    }],
    queryFn: () => GET_TRANSACTION_RENT({
      transactionNum: "%25TRX%25",
    }),
  })

  const { data: dataTransactionReport = { data: [] }, isFetching: transaksiReportIsFetching, isSuccess: transaksiReportIsSuccess, refetch: transactionReportRefetch } = useQuery({
    queryKey: ["TransactionReport"],
    queryFn: GET_TRANSACTION_REPORT,
  });

  const { data: dataUnitRemaining = { data: [] }, isFetching: unitRemainingIsFetching, isSuccess: unitRemainingIsSuccess, refetch: unitRemainingRefetch } = useQuery({
    queryKey: ["UnitRemaining"],
    queryFn: GET_UNIT_REMAINING,
  });

  const { data: dataUserType = { data: [] }, isFetching: userTypeIsFetching, isSuccess: userTypeIsSuccess, refetch: userTypeRefetch } = useQuery({
    queryKey: ["UserTransactionType"],
    queryFn: GET_USER_TRANSACTION_TYPE,
  });

  const { data: dataSummaryStatus = { data: [] }, isFetching: summaryStatusIsFetching, isSuccess: summaryStatusIsSuccess, refetch: summaryStatusRefetch } = useQuery({
    queryKey: ["SummaryTransactionStatus"],
    queryFn: GET_SUMMARY_TRANSACTION_STATUS,
  });

  useEffect(() => {
    unitRefetch()
    userRefetch()
    userTypeRefetch()
    unitRemainingRefetch()
    transactionBuyRefetch()
    transactionRentRefetch()
    summaryStatusRefetch()

  }, [dataUnit, dataTransactionBuy, dataTransactionRent, dataTransactionReport, dataUnitRemaining, dataUserType, dataSummaryStatus])


  const infoCard = [
    { title: "Penyewaan", subTitle: "Unit", qty: transaksiRentIsSuccess && dataTransactionRent.data.totalCount, icon: <ShoppingCart sx={{ fontSize: "30px", color: "#193d71" }} /> },
    { title: "Pembelian", subTitle: "Unit", qty: transaksiBuyIsSuccess && dataTransactionBuy.data.totalCount, icon: <PaidRounded sx={{ fontSize: "30px", color: "#193d71" }} /> },
    { title: "Unit", subTitle: "Tipe", qty: unitIsSuccess && dataUnit.totalCount, icon: <AgricultureRounded sx={{ fontSize: "30px", color: "#193d71" }} /> },
    { title: "Customer", subTitle: "User", qty: userTypeIsSuccess && dataUserType.data[0].userCount, icon: <GroupsRounded sx={{ fontSize: "30px", color: "#193d71" }} /> },
  ]

  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const stateLine = {
    options: {
      chart: {
        id: "lineChart",
        type: "line"
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: dataTransactionReport.data.map(item => namaBulan[item.monthTransaction - 1])
      }
    },
    series: [
      {
        name: "Rent",
        data: dataTransactionReport.data.map(item => item.transaksiSewa),
        color: "#F3F304"
      },
      {
        name: "Buy",
        data: dataTransactionReport.data.map(item => item.transaksiBeli),
        color: "#193D71"
      },
    ]
  };

  const unitColor = ["#F3F304", "#2A6DD0", "#8BB9FF"];
  const statusColor = ["#193D71", "#D9D630", "#28D156", "#EC3535"];
  const userColor = ['#193D71', "#D9D630", '#2A6DD0',];

  const unitLabels = ["Unit Disewa", "Unit Dibeli", "Unit Free"]
  const userLabels = ["User Penyewa", "User Pembeli", "User Sewa dan Beli"]
  const statusLabels = ["Finish", "Unpaid", "Paid", "Rejected"]

  const unitSeries = [
    unitRemainingIsSuccess && dataUnitRemaining.data[0].unitRented,
    unitRemainingIsSuccess && dataUnitRemaining.data[0].unitBuyed,
    unitRemainingIsSuccess && dataUnitRemaining.data[0].unitFree,
  ];
  const userSeries = [
    userTypeIsSuccess && dataUserType.data[0].buyCount,
    userTypeIsSuccess && dataUserType.data[0].rentCount,
    userTypeIsSuccess && dataUserType.data[0].bothCount,
  ];
  const statusSeries = [
    summaryStatusIsSuccess && dataSummaryStatus.data[0].transactionFinish,
    summaryStatusIsSuccess && dataSummaryStatus.data[0].transactionOnGoing,
    summaryStatusIsSuccess && dataSummaryStatus.data[0].transactionPaid,
    summaryStatusIsSuccess && dataSummaryStatus.data[0].transactionRejected,
  ];


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
    }} >
      <Box sx={{ p: "30px", m: "30px 15px", bgcolor: "#F9FAFF", borderRadius: "20px" }} >
        <Grid container spacing={3}>
          {infoCard.map((item, index) => (
            unitIsFetching || transaksiBuyIsFetching || transaksiBuyIsFetching || userTypeIsFetching
              ?
              <Grid key={index} item xs={3} sx={{ ...flexCenter, mb: "10px" }}>
                <InfoCard
                  title={item.title}
                  subTitle={item.subTitle}
                  qty={0}
                  icon={item.icon} />
              </Grid>
              :
              <Grid key={index} item xs={3} sx={{ ...flexCenter, mb: "10px" }}>
                <InfoCard
                  title={item.title}
                  subTitle={item.subTitle}
                  qty={item.qty}
                  icon={item.icon} />
              </Grid>
          ))}

          {/* Start Line chart Transaksi */}
          <Grid item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "600px", width: "100%", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)", borderRadius: "40px", p: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "20px" }}>
                <Box sx={{ flexDirection: "column" }}>
                  <Typography sx={{ fontSize: "30px", color: "#193D71", fontWeight: "medium" }}>
                    Transaksi penjualan
                  </Typography>
                  <img src={tagLineBg} style={{ width: "200px", height: "8px", borderRadius: "10px", marginBottom: 10 }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", gap: "20px" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                    <Box sx={{ width: "30px", height: "30px", borderRadius: "10px", bgcolor: "#193D71", boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}>
                    </Box>
                    <Typography sx={{ fontSize: "14px", color: "#193D71", fontWeight: "medium" }}>
                      Buy
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                    <Box sx={{ width: "30px", height: "30px", borderRadius: "10px", bgcolor: "#F3F304", boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}>
                    </Box>
                    <Typography sx={{ fontSize: "14px", color: "#193D71", fontWeight: "medium" }}>
                      Rent
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box id="lineChart" sx={{ width: "100%", height: "100%" }}>
                <Chart
                  options={stateLine.options}
                  series={stateLine.series}
                  type={stateLine.options.chart.type}
                  width="100%"
                  height="100%"
                />
              </Box>
            </Box>
          </Grid>
          {/* End Line chart Transaksi */}

          {/* Start card buydozer */}
          <Grid item xs={4}>
            <Box sx={{ display: "flex", width: "100%", height: "100%", boxShadow: "3px 10px 10px rgba(0, 0, 0, 0.2)", borderRadius: "50px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Box sx={{ ...flexCenter, flexDirection: "column", width: "100%", height: "100%" }}>
                  <Box sx={{ ...flexCenter, flexDirection: "column" }}>
                    <img src={buydozerLogo} style={{ width: "200px", zIndex: 0, opacity: 0.3, }} />
                    <Typography sx={{ fontSize: "200%", color: "#193D71", fontWeight: "bold", zIndex: 1, mt: -13, letterSpacing: "10px" }}>BUYDOZER</Typography>
                    <Typography sx={{ fontSize: "150%", color: "#193D71", fontWeight: "bold", zIndex: 1, mt: "50px", textAlign: "center" }}>HEAVY UNIT HEAVY PROFIT</Typography>
                  </Box>
                </Box>
                <Box sx={{ ...flexCenter, width: "100%", height: "100%", backgroundImage: `url(${tagLineBg})`, borderRadius: "0 0 50px 50px" }}>
                  <Typography sx={{ fontSize: "24px", color: "#FFFFFF", fontWeight: "medium", textAlign: "center" }}>Menghadirkan solusi andal untuk pertambangan modern</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* DONUT CHART UNIT REPORT */}
          <Grid item xs={4} height={550}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", boxShadow: "3px 10px 10px rgba(0, 0, 0, 0.2)", borderRadius: "50px" }} >
              <Box sx={{ height: "100%", p: "30px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
                  <Typography sx={{ fontSize: "30px", color: "#193D71", fontWeight: "medium" }}>
                    Report Unit
                  </Typography>
                  <img src={tagLineBg} style={{ width: "200px", height: "8px", borderRadius: "10px", marginBottom: 10 }} />
                </Box>

                <Box id="donutChart" sx={{ display: "flex", justifyContent: "center", alignItems: "start", width: "100%", height: "auto" }}>
                  {unitRemainingIsFetching ? (
                    <CircularProgress size={50} sx={{
                      color: "#8BB9FF",
                    }} />
                  ) :
                    <DonutChart
                      name={"Unit"}
                      colors={unitColor}
                      series={unitSeries}
                      labels={unitLabels}
                    />
                  }
                </Box>

                <Box sx={{ ...flexCenter, flexDirection: "row", gap: 3 }}>
                  {unitLabels.map((label, index) => (
                    <Box key={index} sx={{ ...flexCenter, flexDirection: "row", gap: 1 }}>
                      <Box sx={{ bgcolor: unitColor[index], width: "30px", height: "30px", borderRadius: "10px" }} />
                      <Typography sx={{ fontSize: "14px", color: "#193D71", fontWeight: "medium" }}>
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>

              </Box>
            </Box>
          </Grid>
          {/* DONUT CHART UNIT REPORT */}

          {/* DONUT CHART USER REPORT */}
          <Grid item xs={4}>
            <Box sx={{ width: "100%", height: "100%", boxShadow: "3px 10px 10px rgba(0, 0, 0, 0.2)", borderRadius: "50px" }} >
              <Box sx={{ height: "100%", p: "30px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
                  <Typography sx={{ fontSize: "30px", color: "#193D71", fontWeight: "medium" }}>
                    Report Customer
                  </Typography>
                  <img src={tagLineBg} style={{ width: "200px", height: "8px", borderRadius: "10px", marginBottom: 10 }} />
                </Box>
                <Box id="donutChart" sx={{ display: "flex", justifyContent: "center", alignItems: "start", width: "100%", height: "auto" }}>
                  {userTypeIsFetching ? (
                    <CircularProgress size={50} sx={{
                      color: "#8BB9FF",
                    }} />
                  ) :
                    <DonutChart
                      name={"User"}
                      colors={userColor}
                      series={userSeries}
                      labels={userLabels}
                    />
                  }
                </Box>
                <Box sx={{ ...flexCenter, flexDirection: "row", gap: 3 }}>
                  {userLabels.map((label, index) => (
                    <Box key={index} sx={{ ...flexCenter, flexDirection: "row", gap: 1 }}>
                      <Box sx={{ bgcolor: userColor[index], width: "40px", height: "30px", borderRadius: "10px" }} />
                      <Typography sx={{ fontSize: "14px", color: "#193D71", fontWeight: "medium" }}>
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* DONUT CHART UNIT REPORT */}

          {/* DONUT CHART TRANSACTION STATUS REPORT */}
          <Grid item xs={4}>
            <Box sx={{ width: "100%", height: "100%", boxShadow: "3px 10px 10px rgba(0, 0, 0, 0.2)", borderRadius: "50px" }} >
              <Box sx={{ height: "100%", p: "30px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", mb: "20px" }}>
                  <Typography sx={{ fontSize: "30px", color: "#193D71", fontWeight: "medium" }}>
                    Report Unit
                  </Typography>
                  <img src={tagLineBg} style={{ width: "200px", height: "8px", borderRadius: "10px", marginBottom: 10 }} />
                </Box>
                <Box id="donutChart" sx={{ display: "flex", justifyContent: "center", alignItems: "start", width: "100%", height: "auto" }}>
                  {summaryStatusIsFetching ? (
                    <CircularProgress size={50} sx={{
                      color: "#8BB9FF",
                    }} />
                  ) :
                    <DonutChart
                      name={"Trx"}
                      colors={statusColor}
                      series={statusSeries}
                      labels={statusLabels}
                    />
                  }
                </Box>
                <Box sx={{ ...flexCenter, flexDirection: "row", gap: 2 }}>
                  {statusLabels.map((label, index) => (
                    <Box key={index} sx={{ ...flexCenter, flexDirection: "row", gap: 1 }}>
                      <Box sx={{ bgcolor: statusColor[index], width: "30px", height: "30px", borderRadius: "10px" }} />
                      <Typography sx={{ fontSize: "14px", color: "#193D71", fontWeight: "medium" }}>
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* DONUT CHART TRANSACTION STATUS REPORT */}

          <Grid item xs={12} height={100}></Grid>

          {/* End card buydozer */}
        </Grid>
      </Box>
    </Grid >
  )
}

export default Dashboard
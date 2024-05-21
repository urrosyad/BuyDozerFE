import React, { useEffect, useState } from 'react'
import { Box, Card, CircularProgress, Container, Grid, Skeleton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import theme from '@themes/theme';
import Chart from 'react-apexcharts'
import buydozerLogo from '@assets/customer/buydozerLogo.png'
import tagLineBg from '@assets/admin/tagLineBg.png'
import { flexCenter } from '@themes/commonStyles'
import InfoCard from '@components/admin/Moleculs/InfoCard/InfoCard';
import { AgricultureRounded, GroupsRounded, PaidRounded, ShoppingCart, } from '@mui/icons-material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { GET_UNIT, GET_USER, GET_TRANSACTION_ONGOING, GET_TRANSACTION_BUY, GET_TRANSACTION_RENT, GET_TRANSACTION_REPORT } from '@api/api'
import { color, positions } from '@mui/system';
import axios from 'axios';

const authData = localStorage.getItem('AuthData')
const auth = JSON.parse(authData)
const accessToken = auth.accessToken
const userName = auth.userName

const Dashboard = () => {
  const navigate = useNavigate()
  // const [transactionChart, setTransactionChart] = useState(0)

  const { data: dataUnit, isLoading: unitIsLoading, isFetching: unitIsFetching, isSuccess: unitIsSuccess, error: unitIsError, refetch: unitRefetch } = useQuery({
    queryKey: ["Unit", {
      nameUnit: "",
      sortBuy: true,
      pageNumber: 1,
      pageSize: 1
    }],
    queryFn: () => GET_UNIT({
      nameUnit: "",
      sortBuy: true,
      pageNumber: 1,
      pageSize: 1
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

  const { data: dataTransactionBuy, isFetching: transaksiBuyIsFetching, isSuccess: transaksiBuyIsSuccess, refetch: transactionBuyRefetch } = useQuery({
    queryKey: ["TransactionBuy", {
      transactionNum: "%25TRX%25",
    }],
    queryFn: () => GET_TRANSACTION_BUY({
      transactionNum: "%25TRX%25",
    }),
  })

  const { data: dataTransactionRent, isFetching: transaksiRentIsFetching, isSuccess: transaksiRentIsSuccess, refetch: transactionRentRefetch } = useQuery({
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


  // const { data: dataTransactionReport, isFetching: transaksiReportIsFetching, isSuccess: transaksiReportIsSuccess, refetch: transactionReportRefetch } = useQuery({
  //   queryKey: ["TransactionReport"],
  //   queryFn: GET_TRANSACTION_REPORT(),
  // })

  // const dataTransactionReport = GET_TRANSACTION_REPORT();

  useEffect(() => {
    // transactionReportRefetch();
    // console.log("ini : ", transaksiReportIsSuccess && dataTransactionReport.map(item => item.data));
    unitRefetch();
    userRefetch();
    transactionBuyRefetch();
    transactionRentRefetch();

  }, [unitRefetch, userRefetch, transactionBuyRefetch, transactionRentRefetch])

  // handle open collapse decs uniit
  const handleCollapseToggle = (rowId) => {
    setOpenDesc(openDesc === rowId ? null : rowId);
  };

  const infoCard = [
    { title: "Penyewaan", subTitle: "Unit", qty: transaksiRentIsSuccess && dataTransactionRent.data.totalCount, icon: <ShoppingCart sx={{ fontSize: "30px", color: "#193d71" }} /> },
    { title: "Pembelian", subTitle: "Unit", qty: transaksiBuyIsSuccess && dataTransactionBuy.data.totalCount, icon: <PaidRounded sx={{ fontSize: "30px", color: "#193d71" }} /> },
    { title: "Unit", subTitle: "Tipe", qty: unitIsSuccess && dataUnit.totalCount, icon: <AgricultureRounded sx={{ fontSize: "30px", color: "#193d71" }} /> },
    { title: "Customer", subTitle: "User", qty: userIsSuccess && dataUser.totalCount, icon: <GroupsRounded sx={{ fontSize: "30px", color: "#193d71" }} /> },
  ]

  // const transactionChart = [
  //   { name: 'Januari', series1: 0, series2: 200 },
  //   { name: 'Februari', series1: 0, series2: 230 },
  //   { name: 'Maret', series1: 250, series2: 210 },
  //   { name: 'April', series1: 200, series2: 360 },
  //   { name: 'Mei', series1: 230, series2: 230 },
  //   { name: 'Juni', series1: 410, series2: 150 },
  //   { name: 'Juli', series1: 300, series2: 220 },
  //   { name: 'Agustus', series1: 320, series2: 210 },
  //   { name: 'September', series1: 250, series2: 200 },
  //   { name: 'Oktober', series1: 280, series2: 270 },
  //   { name: 'November', series1: 300, series2: 300 },
  //   { name: 'Desember', series1: 400, series2: 320 },
  // ];

  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];


  const stateLine = {
    options: {
      chart: {
        id: "basic-bar",
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
        name: "Sewa",
        data: dataTransactionReport.data.map(item => item.transaksiSewa),
        color: "#F3F304"
      },
      {
        name: "Beli",
        data: dataTransactionReport.data.map(item => item.transaksiBeli),
        color: "#193D71"
      },
    ]
  };

  const statePie = {
    series: dataTransactionReport.data.map(item => item.transaksi),
    options: {
      chart: {
        width: '100%',
        type: 'pie',
      },
      labels: dataTransactionReport.data.map(item => namaBulan[item.monthTransaction - 1]),
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name, val.toFixed(1) + '%']
        }
      },
      legend: {
        positions: 'bottom'
      }
    },

  };
  const stateDonut = {
    series: dataTransactionReport.data.map(item => item.transaksi),
    options: {
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: dataTransactionReport.data.map(item => namaBulan[item.monthTransaction - 1]),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    dataLabels: {
      dropShadow: {
        blur: 3,
        opacity: 0.8
      }
    },

  };


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
            unitIsFetching || userIsFetching
              ? <Skeleton key={index} variant='text' sx={{ width: "200px", height: "100px" }} />
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
          <Grid  item xs={8}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "600px", width: "100%", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)", borderRadius: "40px", p: "10px" }}>
              <Box  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p:"20px" }}>
                <Box>
                  <Typography sx={{ fontSize: "28px", color: "#193D71", fontWeight: "medium" }}>
                    Transaksi penjualan
                  </Typography>
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
              <Chart
                options={stateLine.options}
                series={stateLine.series}
                type={stateLine.options.chart.type}
                width="100%"
                height="85%"
              />
            </Box>
          </Grid>
          {/* End Line chart Transaksi */}
          {/* Start card buydozer */}
          <Grid item xs={4}>
            <Box sx={{ ...flexCenter, width: "100%", height: "100%", boxShadow: "3px 10px 10px rgba(0, 0, 0, 0.2)", borderRadius: "50px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "100%", height: "100%", backgroundImage: `url(${buydozerLogo})` }}>

                </Box>
                <Box sx={{ width: "100%", height: "100%", backgroundImage: `url(${tagLineBg})` }}>

                </Box>
              </Box>
            </Box>
          </Grid>
          {/* End card buydozer */}
        </Grid>
      </Box>
    </Grid >
  )
}

export default Dashboard
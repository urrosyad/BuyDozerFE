import { Box } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = ({ colors, series, labels, name }) => {
  const chartOptions = {
    chart: {
      id: "donutChart",
      type: 'donut',
    },
    colors: colors,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: name,
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#193D71',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
          size: 50,
          customScale: 1,
          stroke: {
            width: 5,
          },
        },
      }
    },
    labels: labels,
    legend: {
      show: false  // Menyembunyikan legend
    }
  };

  return (
    <Box height={"auto"}>
      <Chart
        options={chartOptions}
        series={series}
        type="donut"
        width="380"
      />
    </Box>
  );
};

export default DonutChart;

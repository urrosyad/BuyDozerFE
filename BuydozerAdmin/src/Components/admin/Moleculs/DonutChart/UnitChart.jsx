import React from 'react';
import DonutChart from './DonutChart';

export const dataUnitRemaining = {
  data: [
    {
      unitBuyed: 39,
      unitFree: 158,
      unitRented: 13,
    }
  ]
};

const unitColor = ['#193D71', "#D9D630", '#2A6DD0'];
const unitLabels = ["Unit Disewa", "Unit Dibeli", "Unit Free"];
const unitSeries = [
  dataUnitRemaining.data[0].unitRented,
  dataUnitRemaining.data[0].unitBuyed,
  dataUnitRemaining.data[0].unitFree,
];

const ExamplePage = () => {
  return (
    <div>
      <h1>Example Donut Chart</h1>
      <DonutChart 
        colors={unitColor}
        series={unitSeries}
        labels={unitLabels}
      />
    </div>
  );
};

export default ExamplePage;

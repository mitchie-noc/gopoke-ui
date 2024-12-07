import React from "react";
import Chart from "react-apexcharts";
import calculateStat from "../Util/Utils";

export default function StatRadar({ statLables, statBase, statValues }) {
  const series1Data = statBase.map((stat) =>
    calculateStat(stat, 31, 252, 100, 1.1)
  );

  const maxValue = Math.max(...series1Data); // Calculate the maximum value in series1Data

  const x = {
    options: {
      labels: statLables,
      yaxis: {
        show: false,
        min: 0,
        max: maxValue,
      },
      dataLabels: {
        enabled: true,
      },
    },
    series: [
      {
        name: "series-1",
        data: statValues,
      },
    ],
  };

  return (
    <Chart
      options={x.options}
      series={x.series}
      type="radar"
      height={400}
      width={400}
    />
  );
}

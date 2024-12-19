import React from "react";
import Chart from "react-apexcharts";
import calculateStat from "../Util/Utils";

export default function StatRadar({
  stats,
  pokemonStatTraining,
  pokemonLevel,
}) {
  const statLables = stats.map((stat) =>
    stat.Name.replace("special-", "Sp.")
      .replace("defense", "def")
      .replace("attack", "att")
  );

  const statValues = stats.map((stat) => {
    const training = pokemonStatTraining.find((t) => t.name === stat.Name);
    const iv = training ? training.iv : 0;
    const ev = training ? training.ev : 0;
    const nature = training ? training.nature : 0;
    const isHP = stat.Name.toLowerCase() === "hp";
    return calculateStat(stat.Base, iv, ev, pokemonLevel, nature, isHP);
  });

  const series1Data = stats.map((stat) => {
    const levelScale = pokemonLevel + 2;
    const level = levelScale > 100 ? 100 : levelScale;
    const isHP = stat.Name.toLowerCase() === "hp";
    return calculateStat(stat.Base, 31, 252, level, 1.1, isHP);
  });

  const maxValue = Math.max(...series1Data);

  const chartProps = {
    options: {
      labels: statLables,
      yaxis: {
        show: false,
        min: 0,
        max: maxValue,
        tickAmount: 3,
        labels: {
          style: {
            fontSize: "20px",
            fontWeight: "bold",
          },
        },
      },
      xaxis: {
        categories: statLables,
        labels: {
          style: {
            fontSize: "11px",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          colors: ["#008FFB"],
        },
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
    <div className="">
      <Chart
        options={chartProps.options}
        series={chartProps.series}
        type="radar"
        height={380}
        width={320}
      />
    </div>
  );
}

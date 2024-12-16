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
    const iv = training ? training.iv : 0; // Default to 0 if not found
    const ev = training ? training.ev : 0; // Default to 0 if not found
    const nature = training ? training.nature : 0; // Default to 0 if not found
    const isHP = stat.Name.toLowerCase() === "hp"; // Check if it's HP
    return calculateStat(stat.Base, iv, ev, pokemonLevel, nature, isHP);
  });

  const series1Data = stats.map((stat) => {
    const levelScale = pokemonLevel + 2;
    const level = levelScale > 100 ? 100 : levelScale;
    const isHP = stat.Name.toLowerCase() === "hp"; // Check if it's HP
    return calculateStat(stat.Base, 31, 252, level, 1.1, isHP);
  });

  const maxValue = Math.max(...series1Data); // Calculate the maximum value in series1Data

  const x = {
    options: {
      labels: statLables,
      yaxis: {
        show: false,
        min: 0,
        max: maxValue,
        tickAmount: 3,
        labels: {
          style: {
            fontSize: "20px", // Increase the font size for axis labels
            fontWeight: "bold", // Optional: Make the font weight bold
          },
        },
      },
      xaxis: {
        categories: statLables, // Axis labels for the radar chart
        labels: {
          style: {
            fontSize: "11px", // Increase font size
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px", // Increase the font size of the values inside the radar chart
          fontWeight: "bold", // Optionally, change the font weight
          colors: ["#008FFB"], // Adjust text color if needed
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
        options={x.options}
        series={x.series}
        type="radar"
        height={390}
        width={320}
      />
    </div>
  );
}

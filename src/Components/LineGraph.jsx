import React, { useState, useEffect } from "react";
import "chartjs-adapter-date-fns";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../LineGraph.css";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip
);

export default function LineGraph() {
  const [graphData, setGraphData] = useState([]);
  const data = [
    {
      x: 10,
      y: 20,
    },
    {
      x: 15,
      y: 10,
    },
    {
      x: 12,
      y: 4,
    },
  ];

  const createMockData = () => {
    let data = [];
    let value = 50;
    for (var i = 0; i < 366; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
      data.push({ x: date, y: value });
    }
    setGraphData(data);
  };

  useEffect(() => {
    createMockData();
  }, []);

  return (
    <div className="linegraph">
      <Line
        data={{
          datasets: [
            {
              type: "line",
              data: graphData,
              backgroundColor: "black",
              borderColor: "#5AC53B",
              borderWidth: 2,
              pointBorderColor: "rgba(0, 0, 0, 0)",
              pointBackgroundColor: "rgba(0, 0, 0, 0)",
              pointHoverBackgroundColor: "#5AC53B",
              pointHoverBorderColor: "#000000",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 6,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          tooltip: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              type: "time",
              time: {
                format: "MM/DD/YY",
                tooltipFormat: "",
              },
              ticks: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}

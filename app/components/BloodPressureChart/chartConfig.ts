import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export function BloodPressureChartConfig(history: Array<{
  month: string;
  year: number;
  blood_pressure: {
    systolic: { value: number };
    diastolic: { value: number };
  };
}>) {
  const labels = history.map((h) => `${h.month.slice(0, 3)}, ${h.year}`);
  const systolicData = history.map((h) => h.blood_pressure.systolic.value);
  const diastolicData = history.map((h) => h.blood_pressure.diastolic.value);

  const data = {
    labels,
    datasets: [
      {
        label: "Systolic",
        data: systolicData,
        borderColor: "#e17be3",
        backgroundColor: "rgba(225, 123, 227, 0.15)",
        pointBackgroundColor: "#e17be3",
        pointBorderColor: "#e17be3",
        tension: 0.5,
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: "y",
      },
      {
        label: "Diastolic",
        data: diastolicData,
        borderColor: "#7b7be3",
        backgroundColor: "rgba(123, 123, 227, 0.15)",
        pointBackgroundColor: "#7b7be3",
        pointBorderColor: "#7b7be3",
        tension: 0.5,
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: "y",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          color: "#7b8794",
          font: { size: 13 },
        },
        grid: {
          color: "#c4c4c4ff",
        },
      },
      x: {
        ticks: {
          color: "#7b8794",
          font: { size: 13 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return { data, options };
}

import {
  BarElement,
  CategoryScale,
  ChartDataset,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { COLORS } from "scripts/constants";
import { convertToDisplay } from "scripts/helpers";
import "./BarChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface IBarChartProps {
  width?: number | string;
  height?: number;
  data: {
    label?: string[] | undefined;
    datasets: ChartDataset<"bar", (number | [number, number] | null)[]>[];
  };
  options?: any;
  stacked?: boolean;
  type?: string;
}

const BarChart = (props: IBarChartProps) => {
  const {
    height = "300px",
    width = "100%",
    data,
    options,
    stacked = true,
    type,
  } = props;

  return (
    <div className="bri-bar-chart" style={{ width, height }}>
      <Bar
        {...{ data, type }}
        options={{
          indexAxis: "x",
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (context: any) => {
                  const { label }: any = context?.[0];
                  return label;
                },
                label: function (context: any) {
                  const {
                    dataset,
                    parsed: { y },
                  }: any = context;

                  return dataset?.label + ": " + convertToDisplay(y, "number");
                },
                ...(options?.plugins?.tooltip?.callbacks ?? {}),
              },
              titleAlign: "left",
              displayColors: false,
              backgroundColor: "#000c",
              titleColor: "#fff",
              titleFont: { weight: "normal", size: 12, lineHeight: "16px" },
              bodyColor: "#fff",
              bodyFont: { size: 10, lineHeight: "12px" },
              borderColor: "#000c",
              yAlign: "bottom",
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            x: {
              beginAtZero: true,
              stacked,
              grid: {
                display: false,
              },
              title: {
                display: false,
              },
              ticks: {
                font: {
                  size: 16,
                  style: "normal",
                  weight: 400,
                  lineHeight: "24px",
                },
                color: COLORS.gray[500],
                padding: 0,
              },
              ...(options?.x ?? {}),
            },
            y: {
              beginAtZero: true,
              stacked,
              title: {
                display: false,
              },
              ticks: {
                font: {
                  size: 16,
                  style: "normal",
                  weight: 400,
                  lineHeight: "24px",
                },
                color: COLORS.gray[500],
              },
              grid: {
                color: COLORS.gray[200],
                drawTicks: false,
              },
              ...(options?.y ?? {}),
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;

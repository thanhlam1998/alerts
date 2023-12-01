import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { COLORS } from "scripts/constants";
import { convertToDisplay } from "scripts/helpers";
import "./LineChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface LineChartProps {
  width?: number | string;
  height?: number;
  title?: string;
  data?: any;
  loading?: boolean;
  showLegend?: boolean;
  customToolTip?: any;
  options?: any;
  download?: boolean;
  parentElement?: any;
  type?: string;
}

const LineChart = (props: LineChartProps) => {
  const { height = "300px", width = "100%", data, options, type } = props;

  return (
    <div className="bri-line-chart" style={{ width, height }}>
      <Line
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
              title: {
                display: false,
              },
              ticks: {
                font: {
                  size: 12,
                  style: "normal",
                  weight: 400,
                  lineHeight: "24px",
                },
                color: COLORS.gray[500],
                padding: 0,
              },
              grid: {
                display: true,
                color: COLORS.gray[200],
              },
              border: { dash: [4, 4] },
              ...(options?.x ?? {}),
            },
            y: {
              beginAtZero: true,
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
                display: true,
                color: COLORS.gray[200],
              },
              border: { dash: [4, 4] },
              ...(options?.y ?? {}),
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;

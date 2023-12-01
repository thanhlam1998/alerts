import ChartLegend from "components/ChartLegend";
import LineChart from "components/LineChart";
import Select from "components/Select";
import SwitchButton from "components/SwitchButton";
import WrapperSection from "components/WrapperSection";
import {
  IDashboardAlertTrend,
  IDashboardAlertTrendSummary,
} from "interfaces/dashboard";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  COLORS,
  DASHBOARD_ALERT_TREND_BREAKDOWN_OPTIONS,
  DASHBOARD_ALERT_TREND_CALCULATION_TYPE_OPTIONS,
  DASHBOARD_ALERT_TREND_TIME_RANGE_OPTIONS,
  DEFAULT_CURRENCY,
  DashboardAlertTrendBreakdownEnum,
  DashboardAlertTrendCalculationTypeEnum,
  NUMBER_DECIMAL_DIGITS,
} from "scripts/constants";
import {
  CHART_COLORS,
  convertToDisplay,
  emptyFunction,
  formatMoney,
} from "scripts/helpers";
import "./AlertTrend.scss";
import { IAlertTrendContainerQueryParams } from "./AlertTrendContainer";

interface IAlertTrendViewProps {
  queryParams: IAlertTrendContainerQueryParams;
  setQueryParams: (queryParams: IAlertTrendContainerQueryParams) => void;

  isGettingAlertTrend: boolean;
  alertTrendData: IDashboardAlertTrendSummary[];
  currency?: string;
}

const AlertTrendView = ({
  queryParams,
  setQueryParams = emptyFunction,

  isGettingAlertTrend = false,
  alertTrendData,
}: IAlertTrendViewProps) => {
  const { t } = useTranslation();

  const currency =
    queryParams.breakdown === DashboardAlertTrendBreakdownEnum.TOTAL_AMOUNT
      ? DEFAULT_CURRENCY
      : undefined;

  const chartData = useMemo(() => {
    const datasets: any = [];

    const allItemNames = [
      ...new Set(
        (alertTrendData ?? []).flatMap((obj: IDashboardAlertTrendSummary) =>
          obj?.data?.map((item: IDashboardAlertTrend) => item?.name)
        )
      ),
    ].sort();

    allItemNames.forEach((name: string, index: number) => {
      const obj: any = {
        label: name,
        data: [],
        backgroundColor: CHART_COLORS[index],
        borderColor: CHART_COLORS[index],
        borderWidth: 1,
        pointStyle: true,
        hoverPointStyle: "circle",
      };

      alertTrendData.forEach((dateObj: IDashboardAlertTrendSummary) => {
        const dataValue = dateObj.data.find(
          (item: IDashboardAlertTrend) => item.name === name
        );

        let value: any = dataValue ? dataValue.value : 0;

        if (
          queryParams.breakdown ===
          DashboardAlertTrendBreakdownEnum.TOTAL_AMOUNT
        ) {
          value = value.toFixed(NUMBER_DECIMAL_DIGITS);
        }

        obj.data.push(value);
      });

      if (obj?.data?.length > 1) {
        obj.pointStyle = false;
      }

      datasets.push(obj);
    });

    return {
      labels:
        alertTrendData?.map(
          (item: IDashboardAlertTrendSummary) => item.timeRange
        ) ?? [],
      datasets,
    };
  }, [alertTrendData]);

  return (
    <WrapperSection
      title={t("Alert Trend")}
      className="alerts-dashboard__alert-trend alert-trend p-4"
      loading={isGettingAlertTrend}
      rightHeaderContent={
        <div className="flex items-center justify-end gap-2">
          <Select
            options={DASHBOARD_ALERT_TREND_BREAKDOWN_OPTIONS}
            value={queryParams.breakdown}
            onChange={(value: DashboardAlertTrendBreakdownEnum) =>
              setQueryParams({ ...queryParams, breakdown: value })
            }
          />
          <Select
            options={DASHBOARD_ALERT_TREND_CALCULATION_TYPE_OPTIONS}
            value={queryParams.calculationType}
            onChange={(value: DashboardAlertTrendCalculationTypeEnum) =>
              setQueryParams({ ...queryParams, calculationType: value })
            }
          />
          <SwitchButton
            items={DASHBOARD_ALERT_TREND_TIME_RANGE_OPTIONS}
            active={queryParams.timeRange}
            onChange={(item: any) => {
              setQueryParams({ ...queryParams, timeRange: item.value });
            }}
          />
        </div>
      }
    >
      <ChartLegend
        className="mb-4"
        data={chartData?.datasets?.map((it: any) => ({
          color: it?.backgroundColor,
          name: it?.label,
        }))}
      />
      <LineChart
        data={chartData}
        options={{
          y: {
            title: {
              display: true,
              text: DASHBOARD_ALERT_TREND_BREAKDOWN_OPTIONS?.find(
                (item: any) => item.value === queryParams.breakdown
              )?.label,
              font: {
                size: 16,
                style: "normal",
                weight: 400,
                lineHeight: "24px",
              },
              color: COLORS.gray[500],
            },
          },
          plugins: {
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

                  return (
                    dataset?.label +
                    ": " +
                    (currency ? formatMoney(y, currency) : convertToDisplay(y))
                  );
                },
              },
            },
          },
        }}
      />
    </WrapperSection>
  );
};

export default AlertTrendView;

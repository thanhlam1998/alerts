import ChartLegend from "components/ChartLegend";
import LineChart from "components/LineChart";
import Select from "components/Select";
import SwitchButton from "components/SwitchButton";
import WrapperSection from "components/WrapperSection";
import {
  IDashboardCaseTrend,
  IDashboardCaseTrendSummary,
} from "interfaces/dashboard";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  COLORS,
  DASHBOARD_CASE_TREND_BREAKDOWN_OPTIONS,
  DASHBOARD_CASE_TREND_CALCULATION_TYPE_OPTIONS,
  DASHBOARD_CASE_TREND_TIME_RANGE_OPTIONS,
  DEFAULT_CURRENCY,
  DashboardCaseTrendBreakdownEnum,
  DashboardCaseTrendCalculationTypeEnum,
  NUMBER_DECIMAL_DIGITS,
} from "scripts/constants";
import {
  CHART_COLORS,
  convertToDisplay,
  emptyFunction,
  formatMoney,
} from "scripts/helpers";
import "./CaseTrend.scss";
import { ICaseTrendContainerQueryParams } from "./CaseTrendContainer";

interface ICaseTrendViewProps {
  queryParams: ICaseTrendContainerQueryParams;
  setQueryParams: (queryParams: ICaseTrendContainerQueryParams) => void;

  isGettingCaseTrend: boolean;
  caseTrendData: IDashboardCaseTrendSummary[];
}

const CaseTrendView = ({
  queryParams,
  setQueryParams = emptyFunction,

  isGettingCaseTrend = false,
  caseTrendData,
}: ICaseTrendViewProps) => {
  const { t } = useTranslation();

  const currency =
    queryParams.breakdown === DashboardCaseTrendBreakdownEnum.TOTAL_AMOUNT
      ? DEFAULT_CURRENCY
      : undefined;

  const chartData = useMemo(() => {
    const datasets: any = [];

    const allItemNames = [
      ...new Set(
        (caseTrendData ?? []).flatMap((obj: IDashboardCaseTrendSummary) =>
          obj?.data?.map((item: IDashboardCaseTrend) => item?.name)
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

      caseTrendData.forEach((dateObj: IDashboardCaseTrendSummary) => {
        const dataValue = dateObj.data.find(
          (item: IDashboardCaseTrend) => item.name === name
        );

        let value: any = dataValue ? dataValue.value : 0;

        if (
          queryParams.breakdown === DashboardCaseTrendBreakdownEnum.TOTAL_AMOUNT
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
        caseTrendData?.map(
          (item: IDashboardCaseTrendSummary) => item.timeRange
        ) ?? [],
      datasets,
    };
  }, [caseTrendData]);

  return (
    <WrapperSection
      title={t("Case Trend")}
      className="cases-dashboard__case-trend case-trend p-4"
      loading={isGettingCaseTrend}
      rightHeaderContent={
        <div className="flex items-center justify-end gap-2">
          <Select
            options={DASHBOARD_CASE_TREND_BREAKDOWN_OPTIONS}
            value={queryParams.breakdown}
            onChange={(value: DashboardCaseTrendBreakdownEnum) =>
              setQueryParams({ ...queryParams, breakdown: value })
            }
          />
          <Select
            options={DASHBOARD_CASE_TREND_CALCULATION_TYPE_OPTIONS}
            value={queryParams.calculationType}
            onChange={(value: DashboardCaseTrendCalculationTypeEnum) =>
              setQueryParams({ ...queryParams, calculationType: value })
            }
          />
          <SwitchButton
            items={DASHBOARD_CASE_TREND_TIME_RANGE_OPTIONS}
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
              text: DASHBOARD_CASE_TREND_BREAKDOWN_OPTIONS?.find(
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

export default CaseTrendView;

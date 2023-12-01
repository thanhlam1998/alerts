import BarChart from "components/BarChart";
import ChartLegend from "components/ChartLegend";
import Select from "components/Select";
import SwitchButton from "components/SwitchButton";
import WrapperSection from "components/WrapperSection";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import {
  IAlertTransactionSummary,
  IAlertTransactionSummaryItem,
} from "interfaces/alertsQueue";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ALERT_TRANSACTION_SUMMARY_BREAKDOWN_OPTIONS,
  ALERT_TRANSACTION_SUMMARY_CALCULATION_TYPE_OPTIONS,
  ALERT_TRANSACTION_SUMMARY_TIME_RANGE_OPTIONS,
  AlertTransactionSummaryBreakdownEnum,
  AlertTransactionSummaryCalculationTypeEnum,
  COLORS,
  DEFAULT_CURRENCY,
  MAX_BAR_THICKNESS_PER_VIEW_TYPE,
  NUMBER_DECIMAL_DIGITS
} from "scripts/constants";
import {
  CHART_COLORS,
  convertToDisplay,
  emptyFunction,
  formatMoney,
} from "scripts/helpers";
import { ISummaryOfTransactionsQueryParamsState } from "./SummaryOfTransactionsContainer";

interface ISummaryOfTransactionsProps {
  isGettingSummaryOfTransactions: boolean;
  summaryOfTransactions: IAlertTransactionSummary[];
  queryParams: ISummaryOfTransactionsQueryParamsState;
  setQueryParams: (queryParams: ISummaryOfTransactionsQueryParamsState) => void;
}

const SummaryOfTransactionsView = ({
  isGettingSummaryOfTransactions,
  summaryOfTransactions = [],

  queryParams,
  setQueryParams = emptyFunction,
}: ISummaryOfTransactionsProps) => {
  const { t } = useTranslation();
  const onChangeFilter = useOnChangeFilter();
  const QUERY_DATA = useSearchParams();

  const currency =
    queryParams.summaryBreakdown ===
    AlertTransactionSummaryBreakdownEnum.TOTAL_AMOUNT
      ? DEFAULT_CURRENCY
      : undefined;

  const chartData = useMemo(() => {
    const datasets: any = [];

    const allItemNames = [
      ...new Set(
        (summaryOfTransactions ?? []).flatMap((obj: IAlertTransactionSummary) =>
          obj.data.map((item: IAlertTransactionSummaryItem) => item.name)
        )
      ),
    ];

    allItemNames.forEach((name: string, index: number) => {
      const obj: any = {
        label: name,
        data: [],
        backgroundColor: CHART_COLORS[index],
        borderColor: CHART_COLORS[index],
        maxBarThickness:
          MAX_BAR_THICKNESS_PER_VIEW_TYPE[queryParams.summaryTimeRange],
        borderRadius: 4,
      };

      summaryOfTransactions.forEach((dateObj: IAlertTransactionSummary) => {
        const dataValue = dateObj.data.find(
          (item: IAlertTransactionSummaryItem) => item.name === name
        );

        let value: any = dataValue ? dataValue.value : 0;

        if (
          queryParams.summaryBreakdown ===
          AlertTransactionSummaryBreakdownEnum.TOTAL_AMOUNT
        ) {
          value = value.toFixed(NUMBER_DECIMAL_DIGITS);
        }

        obj.data.push(value);
      });

      datasets.push(obj);
    });

    return {
      labels:
        summaryOfTransactions?.map(
          (item: IAlertTransactionSummary) => item.timeRange
        ) ?? [],
      datasets,
    };
  }, [summaryOfTransactions]);

  return (
    <WrapperSection
      title={t("Summary of Transactions")}
      className="alert-details__summary-of-transactions !p-4"
      loading={isGettingSummaryOfTransactions}
      rightHeaderContent={
        <div className="flex items-center justify-end gap-2">
          <Select
            disabled={isGettingSummaryOfTransactions}
            value={queryParams.summaryCalculationType}
            onChange={(value: AlertTransactionSummaryCalculationTypeEnum) =>
              setQueryParams({
                ...queryParams,
                summaryCalculationType: value,
              })
            }
            className="w-full flex"
            options={ALERT_TRANSACTION_SUMMARY_CALCULATION_TYPE_OPTIONS}
          />
          <Select
            disabled={isGettingSummaryOfTransactions}
            value={queryParams.summaryBreakdown}
            onChange={(value: AlertTransactionSummaryBreakdownEnum) =>
              setQueryParams({
                ...queryParams,
                summaryBreakdown: value,
              })
            }
            className="w-full flex"
            options={ALERT_TRANSACTION_SUMMARY_BREAKDOWN_OPTIONS}
          />
          <SwitchButton
            items={ALERT_TRANSACTION_SUMMARY_TIME_RANGE_OPTIONS}
            active={queryParams.summaryTimeRange}
            onChange={({ value }: any) =>
              setQueryParams({
                ...queryParams,
                summaryTimeRange: value,
              })
            }
            disabled={isGettingSummaryOfTransactions}
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
      <BarChart
        data={chartData}
        options={{
          y: {
            title: {
              display: true,
              text: ALERT_TRANSACTION_SUMMARY_BREAKDOWN_OPTIONS?.find(
                (item: any) => item.value === queryParams.summaryBreakdown
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

export default SummaryOfTransactionsView;

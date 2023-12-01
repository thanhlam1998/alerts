import { IDashboardAlertSummary } from "interfaces/dashboard";
import { useTranslation } from "react-i18next";
import { DASHBOARD_TAB_VALUES } from "scripts/constants";
import { emptyFunction, numFormatter } from "scripts/helpers";
import DashboardHeader from "../common/DashboardHeader";
import DashboardSummary from "../common/DashboardSummary";
import DashboardWrapper from "../common/DashboardWrapper";
import AlertReasons from "./components/AlertReasons";
import AlertTrend from "./components/AlertTrend";
import { IRangePickerProps } from "components/RangePicker/RangePicker";

interface IAlertsDashboardViewProps extends IRangePickerProps {
  isGettingAlertsSummary: boolean;
  alertsSummaryData: IDashboardAlertSummary;
}

const AlertsDashboardView = ({
  isGettingAlertsSummary,
  alertsSummaryData,
  timeRangeValue,
  onChangeTimeRange = emptyFunction,
}: IAlertsDashboardViewProps) => {
  const { t } = useTranslation();

  return (
    <DashboardWrapper>
      <DashboardHeader
        title={t("Dashboard")}
        dashboardTabSelected={DASHBOARD_TAB_VALUES.ALERTS}
        {...{ timeRangeValue, onChangeTimeRange }}
      />
      <DashboardSummary
        title={t("Alerts Summary")}
        loading={isGettingAlertsSummary}
        items={[
          {
            label: t("Total Open Alerts"),
            value: numFormatter(alertsSummaryData?.totalOpenAlerts ?? 0),
          },
          {
            label: t("Total CIFs Involved"),
            value: numFormatter(alertsSummaryData?.totalCIFInvolved ?? 0),
          },
          {
            label: t("Total Transaction Amount Involved"),
            value: numFormatter(
              alertsSummaryData?.totalTransactionAmount?.amount ?? 0
            ),
          },
        ]}
      />
      <AlertTrend />
      <AlertReasons />
    </DashboardWrapper>
  );
};

export default AlertsDashboardView;

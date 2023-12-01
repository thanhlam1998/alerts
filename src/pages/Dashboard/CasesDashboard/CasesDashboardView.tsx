import { IRangePickerProps } from "components/RangePicker/RangePicker";
import { IDashboardCaseSummary } from "interfaces/dashboard";
import { useTranslation } from "react-i18next";
import { DASHBOARD_TAB_VALUES } from "scripts/constants";
import { convertToDisplay, emptyFunction, numFormatter } from "scripts/helpers";
import DashboardHeader from "../common/DashboardHeader";
import DashboardSummary from "../common/DashboardSummary";
import DashboardWrapper from "../common/DashboardWrapper";
import CaseCategories from "./components/CaseCategories";
import CaseTrend from "./components/CaseTrend";

interface ICasesDashboardViewProps extends IRangePickerProps {
  isGettingCasesSummary: boolean;
  casesSummaryData: IDashboardCaseSummary;
}

const CasesDashboardView = ({
  isGettingCasesSummary,
  casesSummaryData,

  timeRangeValue,
  onChangeTimeRange = emptyFunction,
}: ICasesDashboardViewProps) => {
  const { t } = useTranslation();

  return (
    <DashboardWrapper>
      <DashboardHeader
        title={t("Dashboard")}
        dashboardTabSelected={DASHBOARD_TAB_VALUES.CASES}
        {...{ timeRangeValue, onChangeTimeRange }}
      />
      <DashboardSummary
        title={t("Cases Summary")}
        loading={isGettingCasesSummary}
        items={[
          {
            label: t("Total Approved Cases"),
            value: `${convertToDisplay(
              casesSummaryData?.totalApprovedCases ?? 0
            )}/${convertToDisplay(casesSummaryData?.totalCases ?? 0)}`,
          },
          {
            label: t("Total CIFs Involved in Approved Case"),
            value: numFormatter(casesSummaryData?.totalCIFInvolved ?? 0),
          },
          {
            label: t("Total Transaction Amount Involved in Approved Case"),
            value: numFormatter(
              casesSummaryData?.totalTransactionAmount?.amount ?? 0
            ),
          },
        ]}
      />
      <CaseTrend />
      <CaseCategories />
    </DashboardWrapper>
  );
};

export default CasesDashboardView;

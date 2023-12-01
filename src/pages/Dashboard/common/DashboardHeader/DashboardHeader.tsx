import Button from "components/Button/Button";
import RangePicker from "components/RangePicker";
import { IRangePickerProps } from "components/RangePicker/RangePicker";
import SwitchButton from "components/SwitchButton";
import WrapperSection from "components/WrapperSection";
import useSearchParams from "hooks/useSearchParams";
import { ValueOf } from "interfaces/common";
import { isEmpty } from "lodash";
import queryString from "query-string";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_TAB_OPTIONS, DASHBOARD_TAB_VALUES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";

interface IDashboardHeaderProps extends IRangePickerProps {
  dashboardTabSelected: ValueOf<typeof DASHBOARD_TAB_VALUES>;
  title: string | React.ReactNode;
}

const DashboardHeader = ({
  dashboardTabSelected,
  title = "",
  timeRangeValue,
  onChangeTimeRange = emptyFunction,
}: IDashboardHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const QUERY_DATA = useSearchParams();
  
  return (
    <WrapperSection
      title={
        <div className="flex items-center gap-4">
          <span>{title}</span>
          <SwitchButton
            items={DASHBOARD_TAB_OPTIONS(t)}
            active={dashboardTabSelected}
            onChange={(item: any) => {
              const tabItemUrl = `/dashboard/${item.value}${
                !isEmpty(QUERY_DATA?.from) && !isEmpty(QUERY_DATA?.to)
                  ? `?${queryString.stringify({
                      from: QUERY_DATA.from,
                      to: QUERY_DATA.to,
                    })}`
                  : ""
              }`;

              navigate(tabItemUrl);
            }}
          />
        </div>
      }
      headerClassName="!mb-0 pl-2"
      className="dashboard__header"
      rightHeaderContent={
        <div className="flex items-center justify-end gap-2">
          <RangePicker {...{ timeRangeValue, onChangeTimeRange }} />
        </div>
      }
    />
  );
};

export default memo(DashboardHeader);

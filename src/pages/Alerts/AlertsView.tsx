import Input from "components/Input";
import PageWrapper from "components/PageWrapper";
import Select from "components/Select";
import WrapperSection from "components/WrapperSection";
import Home from "components/svgs/Home";
import Search from "components/svgs/Search";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { IAlertQueueItem } from "interfaces/alertsQueue";
import { IBranch } from "interfaces/common";
import { isEmpty } from "lodash";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ALERTS_QUEUE_QUERY_PARAM_NAMES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import AlertsQueueTable from "./components/AlertsQueueTable";

interface IAlertsViewProps {
  loading: boolean;
  totalItems: number;
  alertsQueueData: IAlertQueueItem[];
  setSortBy: (sortBy: any) => void;
  sortBy: any;
  onPageChange: (data: any) => void;
  pageNumber: number;
  pageSize: number;

  isGettingBranches: boolean;
  branchesData?: IBranch[];
  branches?: string;
}

const AlertsView: FC<IAlertsViewProps> = ({
  loading,
  totalItems,
  alertsQueueData,
  setSortBy = emptyFunction,
  sortBy,
  onPageChange = emptyFunction,
  pageSize,
  pageNumber,

  isGettingBranches,
  branchesData,
  branches,
}) => {
  const { t } = useTranslation();
  const onChangeFilter = useOnChangeFilter();
  const QUERY_DATA = useSearchParams();

  const [searchText, setSearchText] = useState(
    QUERY_DATA?.[ALERTS_QUEUE_QUERY_PARAM_NAMES?.KEYWORD] ?? ""
  );

  const onSearch = () => {
    if (searchText?.length > 0 && searchText?.length < 3) return;

    const newQueryParams = {
      ...QUERY_DATA,
      [ALERTS_QUEUE_QUERY_PARAM_NAMES.KEYWORD]: searchText,
      ...(QUERY_DATA?.[ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]
        ? {
            [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]: DEFAULT_PAGE_INDEX,
            [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: DEFAULT_PAGE_SIZE,
          }
        : {}),
    };

    if (isEmpty(newQueryParams?.[ALERTS_QUEUE_QUERY_PARAM_NAMES.KEYWORD])) {
      delete newQueryParams[ALERTS_QUEUE_QUERY_PARAM_NAMES.KEYWORD];
    }

    onChangeFilter(newQueryParams);
  };

  const onChangeKeyword = (e: any) => {
    setSearchText(e?.target?.value);
  };

  return (
    <PageWrapper
      className="alerts-queue"
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "#",
          title: t("Alerts Queue"),
        },
      ]}
    >
      <WrapperSection
        title={t("Alerts Queue")}
        headerClassName="!mb-0 pl-2"
        className="mb-4"
      />
      <WrapperSection
        title={t("Alerts Queue")}
        className="!p-4"
        rightHeaderContent={
          <div className="flex items-center justify-end gap-2">
            <Input
              className="w-[320px]"
              placeholder={t("Search by Customer Name")}
              suffix={<Search className="w-[14px] h-[14px]" />}
              value={searchText}
              onChange={onChangeKeyword}
              onPressEnter={onSearch}
            />
            <Select
              options={
                (branchesData ?? [])?.map((branchItem: IBranch) => {
                  return {
                    label: branchItem?.name,
                    value: branchItem?.id,
                  };
                }) as any[]
              }
              showSearch
              disabled={isGettingBranches}
              loading={isGettingBranches}
              placeholder={t("Branches")}
              placement="bottomRight"
              value={branches}
              onChange={(itemSelected: any) => {
                onChangeFilter({
                  ...QUERY_DATA,
                  [ALERTS_QUEUE_QUERY_PARAM_NAMES.BRANCHES]: itemSelected,
                  [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]:
                    DEFAULT_PAGE_INDEX,
                  [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: DEFAULT_PAGE_SIZE,
                });
              }}
              allowClear
              onClear={() => {
                const newQueryParams = {
                  ...QUERY_DATA,
                  [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]:
                    DEFAULT_PAGE_INDEX,
                  [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: DEFAULT_PAGE_SIZE,
                };

                if (
                  newQueryParams.hasOwnProperty(
                    ALERTS_QUEUE_QUERY_PARAM_NAMES.BRANCHES
                  )
                ) {
                  delete newQueryParams[
                    ALERTS_QUEUE_QUERY_PARAM_NAMES.BRANCHES
                  ];
                }

                onChangeFilter(newQueryParams);
              }}
            />
          </div>
        }
        {...{ loading }}
      >
        <AlertsQueueTable
          {...{
            data: alertsQueueData,
            onSortChange: setSortBy,
            paginationOptions: {
              pageSize,
              pageNumber,
              totalItems,
              onChange: onPageChange,
              className: "!p-0 !pt-4",
            },
            sortBy,
          }}
        />
      </WrapperSection>
    </PageWrapper>
  );
};

export default AlertsView;

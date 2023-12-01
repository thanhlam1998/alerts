import { ColumnsType } from "antd/es/table";
import Button from "components/Button";
import DropdownTree from "components/DropdownFilter/DropdownTree";
import RangePicker from "components/RangePicker";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import { IAlertItemByCIF } from "interfaces/alertsQueue";
import { ICaseCategory } from "interfaces/case";
import moment from "moment";
import { IAlertCategoriesData } from "pages/AlertDetails/AlertDetailsView";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ALERT_DATE_TIME_FORMAT,
  ALERT_DETAILS_QUERY_PARAM_NAMES,
} from "scripts/constants";
import { convertToDisplay, emptyFunction, formatMoney, getTableColumnSortOrder, getTableSort, mapSortColumnParams, renderRiskScore } from "scripts/helpers";
import "./OpenAlerts.scss";
import { IOpenAlertsQueryParamsState } from "./OpenAlertsContainer";
import AssignToCaseModal from "./components/AssignToCaseModal";
import CreateNewCaseModal from "./components/CreateNewCaseModal";
import { isArray } from "lodash";
import InfoIcon from "components/svgs/InfoIcon";
import { Tooltip } from "antd";
import AssignedCasesModal from "components/AssignedCasesModal";
import { ISortColumn } from "interfaces/common";

export interface IOpenAlertsCommonProps {
  isGettingOpenAlerts: boolean;
  openAlertsData: {
    total: number;
    alerts: IAlertItemByCIF[];
  };
  isClosingAlerts: boolean;
  onCloseAlertsButtonClick: () => void;
  alertIdsSelected?: string[];
  setAlertIdsSelected?: (alertIds: string[]) => void;
}

interface IOpenAlertsProps
  extends IOpenAlertsCommonProps,
  IAlertCategoriesData {
  onAlertRowClick: (alert: IAlertItemByCIF) => void;

  queryParams: IOpenAlertsQueryParamsState;
  setQueryParams: (queryParams: IOpenAlertsQueryParamsState) => void;
  onChangeTimeRange: ({ from, to }: ITimeRangeValue) => void;

  onSortChange: (sortBy: any) => void;
  sortBy: ISortColumn[];
}

const OpenAlertsView = ({
  openAlertsData,
  isGettingOpenAlerts,

  onAlertRowClick = emptyFunction,

  isClosingAlerts,
  onCloseAlertsButtonClick = emptyFunction,
  alertIdsSelected = [],
  setAlertIdsSelected = emptyFunction,

  isGettingAlertCategories,
  alertCategoriesData = [],

  queryParams,
  setQueryParams = emptyFunction,
  onChangeTimeRange = emptyFunction,

  onSortChange = emptyFunction,
  sortBy,
}: IOpenAlertsProps) => {
  const { t } = useTranslation();

  const [isCreateNewCaseModalOpen, setIsCreateNewCaseModalOpen] =
    useState(false);
  const [isAssignToCaseModalOpen, setIsAssignToCaseModalOpen] = useState(false);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const [isAssignedCaseModalOpen, setIsAssignedCaseModalOpen] = useState(false);

  const onPageChange = (pageIndex: number, pageSize: number) => {
    setQueryParams({
      ...queryParams,
      openPageNumber: pageIndex,
      openPageSize: pageSize,
    });
  };

  const onTableChange = (_pagination: any, _filters: any, sorter: any) => {
    const newSortList = !isArray(sorter) ? [sorter] : sorter;
    const mappedSortParams = mapSortColumnParams(newSortList, sortBy);
    return onSortChange(mappedSortParams);
  };

  const columns: ColumnsType<IAlertItemByCIF> = [
    {
      title: t("Alert ID"),
      dataIndex: "alertId",
      key: "alertId",
      render: (alertId: string, record: IAlertItemByCIF) => {
        const caseIds = record?.caseIds ?? [];

        return (
          <div className="flex items-center gap-1">
            <span className="sm_body_b2_reg text-gray800">
              {alertId}
            </span>
            {caseIds.length > 0 && (
              <Tooltip
                title={`${convertToDisplay(caseIds?.length)} Case${caseIds.length > 1 ? "s" : ""}`}>
                <InfoIcon
                  width={14}
                  height={14}
                  onClick={(event: any) => {
                    event.stopPropagation();
                    setSelectedCaseIds(caseIds);
                    setIsAssignedCaseModalOpen(true)
                  }}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: t("Time Range"),
      dataIndex: "timestamp",
      key: "timestamp",
      width: "8%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "timestamp"),
      render: (value) => {
        return moment(new Date(value * 1000)).format(ALERT_DATE_TIME_FORMAT);
      },
    },
    {
      title: t("Category"),
      dataIndex: "category",
      key: "category",
      width: "12%",
      render: (_, record: IAlertItemByCIF) => {
        return (
          <span className="sm_body_b2_reg">
            {record?.category?.name ?? null}
          </span>
        );
      },
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
    },
    /*
    {
      title: t("Risk Score"),
      key: "riskScore",
      dataIndex: "riskScore",
      width: "10%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "riskScore"),
      render: (riskScore: number) => {
        return renderRiskScore(riskScore);
      },
    },
    */
    {
      title: t("Transaction Involved"),
      dataIndex: "transactionCount",
      key: "transactionCount",
      width: "10%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "transactionCount"),
    },
    {
      title: t("Amount Involved"),
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      width: "15%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "transactionAmount"),
      render: (_: any, row: IAlertItemByCIF) =>
        formatMoney(
          row?.transactionAmount?.amount,
          row?.transactionAmount?.currency
        ),
      className: "text-right",
    },
    {
      title: t("CIFs Involved"),
      key: "transactionCIFPairs",
      dataIndex: "transactionCIFPairs",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "transactionCIFPairs"),
      width: "10%",
    },
  ];

  const rowSelection = {
    selectedRowKeys: alertIdsSelected,
    onChange: (selectedRowKeys: string[]) =>
      setAlertIdsSelected(selectedRowKeys),
    getCheckboxProps: () => ({
      disabled: isClosingAlerts,
    }),
  };

  const hasSelected = alertIdsSelected.length > 0;

  return (
    <>
      <WrapperSection
        title={t("Open Alerts")}
        className="alert-details__open-alerts open-alerts p-4"
        headerClassName="!mb-6"
        loading={isGettingOpenAlerts}
        rightHeaderContent={
          <div className="flex items-center justify-end gap-2">
            <RangePicker
              {...{
                onChangeTimeRange,
                timeRangeValue: {
                  from: queryParams?.from,
                  to: queryParams?.to,
                },
              }}
            />
            <DropdownTree
              loading={isGettingAlertCategories}
              items={
                [
                  {
                    label: t("Categories"),
                    value: "ALL",
                    children: alertCategoriesData?.map(
                      (alertCategory: ICaseCategory) => {
                        return {
                          label: alertCategory?.name,
                          value: alertCategory?.id,
                          imageUrl: null,
                        };
                      }
                    ) as any[],
                  },
                ] ?? []
              }
              isInFilterSection
              dropdownPanelPosition={`bottom`}
              filterBy={ALERT_DETAILS_QUERY_PARAM_NAMES.OPEN_ALERT_CATEGORIES}
              onApply={(itemsSelected) => {
                setQueryParams({
                  ...queryParams,
                  openAlertCategories: itemsSelected,
                });
              }}
              selectedItems={queryParams.openAlertCategories}
            />
            <Button
              theme="red"
              size="middle"
              type="default"
              disabled={isGettingOpenAlerts || !hasSelected || isClosingAlerts}
              loading={isClosingAlerts}
              onClick={onCloseAlertsButtonClick}
            >
              {t("Close Alert(s)")}
            </Button>
            <Button
              theme="standard"
              size="middle"
              type="default"
              disabled={isGettingOpenAlerts || !hasSelected}
              onClick={() =>
                alertIdsSelected?.length > 0 && setIsAssignToCaseModalOpen(true)
              }
            >
              {t("Assign To Case")}
            </Button>
            <Button
              theme="standard"
              size="middle"
              type="primary"
              disabled={isGettingOpenAlerts || !hasSelected}
              onClick={() =>
                alertIdsSelected?.length > 0 &&
                setIsCreateNewCaseModalOpen(true)
              }
            >
              {t("Create New Case")}
            </Button>
          </div>
        }
      >
        <Table
          className="open-alerts__list no-radius"
          rowClassName="cursor-pointer"
          data={(openAlertsData?.alerts ?? [])?.map(
            (it: IAlertItemByCIF) => ({
              ...it,
              key: `${it?.alertId}`,
            })
          )}
          onRow={(record: IAlertItemByCIF) => {
            return {
              onClick: () => {
                onAlertRowClick(record);
              },
            };
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          {...{
            columns,
            paginationOptions: {
              className: "open-alerts__pagination p-0 mt-6",
              pageNumber: queryParams.openPageNumber,
              pageSize: queryParams.openPageSize,
              totalItems: openAlertsData?.total,
              onChange: onPageChange,
            },
          }}
          onChange={onTableChange}
        />
      </WrapperSection>

      <CreateNewCaseModal
        visible={isCreateNewCaseModalOpen}
        closeModal={() => setIsCreateNewCaseModalOpen(false)}
        resetAlertIdsSelected={() => setAlertIdsSelected([])}
        {...{ alertIdsSelected }}
      />

      <AssignToCaseModal
        visible={isAssignToCaseModalOpen}
        closeModal={() => setIsAssignToCaseModalOpen(false)}
        resetAlertIdsSelected={() => setAlertIdsSelected([])}
        {...{ alertIdsSelected }}
      />

      <AssignedCasesModal
        visible={isAssignedCaseModalOpen}
        closeModal={() => {
          setIsAssignedCaseModalOpen(false);
          setSelectedCaseIds([]);
        }}
        caseIds={selectedCaseIds}
      />
    </>
  );
};

export default memo(OpenAlertsView);

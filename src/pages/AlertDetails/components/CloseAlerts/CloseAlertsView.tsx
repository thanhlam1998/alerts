import { Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import AssignedCasesModal from "components/AssignedCasesModal";
import Button from "components/Button";
import DropdownTree from "components/DropdownFilter/DropdownTree";
import RangePicker, {
  ITimeRangeValue,
} from "components/RangePicker/RangePicker";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import InfoIcon from "components/svgs/InfoIcon";
import { IAlertItemByCIF } from "interfaces/alertsQueue";
import { ICaseCategory } from "interfaces/case";
import { ISortColumn } from "interfaces/common";
import { isArray } from "lodash";
import moment from "moment";
import { IAlertCategoriesData } from "pages/AlertDetails/AlertDetailsView";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ALERT_DATE_TIME_FORMAT,
  ALERT_DETAILS_QUERY_PARAM_NAMES,
} from "scripts/constants";
import {
  convertToDisplay,
  emptyFunction,
  formatMoney,
  getTableColumnSortOrder,
  mapSortColumnParams
} from "scripts/helpers";
import "./CloseAlerts.scss";
import { IClosedAlertsQueryParamsState } from "./CloseAlertsContainer";

interface ICloseAlertsProps extends IAlertCategoriesData {
  isGettingClosedAlerts: boolean;
  closeAlertsData: {
    total: number;
    alerts: IAlertItemByCIF[];
  };

  onAlertRowClick: (alert: IAlertItemByCIF) => void;

  isReOpeningAlerts: boolean;
  onReOpenAlertsButtonClick: () => void;
  alertIdsSelected?: string[];
  setAlertIdsSelected?: (alertIds: string[]) => void;

  queryParams: IClosedAlertsQueryParamsState;
  setQueryParams: (queryParams: IClosedAlertsQueryParamsState) => void;
  onChangeTimeRange: ({ from, to }: ITimeRangeValue) => void;

  onSortChange: (sortBy: any) => void;
  sortBy: ISortColumn[];
}

const CloseAlerts = ({
  closeAlertsData,
  isGettingClosedAlerts = false,

  onAlertRowClick = emptyFunction,

  isReOpeningAlerts = false,
  onReOpenAlertsButtonClick = emptyFunction,
  alertIdsSelected = [],
  setAlertIdsSelected = emptyFunction,

  isGettingAlertCategories,
  alertCategoriesData = [],

  queryParams,
  setQueryParams = emptyFunction,
  onChangeTimeRange = emptyFunction,

  onSortChange = emptyFunction,
  sortBy,
}: ICloseAlertsProps) => {
  const { t } = useTranslation();

  const onPageChange = (pageIndex: number, pageSize: number) => {
    setQueryParams({
      ...queryParams,
      closedPageNumber: pageIndex,
      closedPageSize: pageSize,
    });
  };

  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const [isAssignedCaseModalOpen, setIsAssignedCaseModalOpen] = useState(false);

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
            <span className="sm_body_b2_reg text-gray800">{alertId}</span>
            {caseIds.length > 0 && (
              <Tooltip
                title={`${convertToDisplay(caseIds?.length)} Case${
                  caseIds.length > 1 ? "s" : ""
                }`}
              >
                <InfoIcon
                  width={14}
                  height={14}
                  onClick={(event: any) => {
                    event.stopPropagation();
                    setSelectedCaseIds(caseIds);
                    setIsAssignedCaseModalOpen(true);
                  }}
                />
              </Tooltip>
            )}
            {/* 
            TODO: OPTION 2 - Show cases label
            {caseIds.length > 0 && (
              <Button
                onClick={(event: any) => {
                  event.stopPropagation();
                }}
                size="small"
              >{`${convertToDisplay(caseIds?.length)} Case${caseIds.length > 1 ? "s" : ""}`}</Button>
            )} */}
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
      width: "10%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "transactionCIFPairs"),
    },
  ];

  const rowSelection = {
    selectedRowKeys: alertIdsSelected,
    onChange: (selectedRowKeys: string[]) =>
      setAlertIdsSelected(selectedRowKeys),
    getCheckboxProps: () => ({
      disabled: isReOpeningAlerts,
    }),
  };

  const hasSelected = alertIdsSelected.length > 0;

  return (
    <>
      <WrapperSection
        title={t("Closed Alerts")}
        className="alert-details__close-alerts close-alerts p-4"
        headerClassName="!mb-6"
        loading={isGettingClosedAlerts}
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
              dropdownPanelPosition={`top`}
              filterBy={ALERT_DETAILS_QUERY_PARAM_NAMES.CLOSED_ALERT_CATEGORIES}
              onApply={(itemsSelected) => {
                setQueryParams({
                  ...queryParams,
                  closedAlertCategories: itemsSelected,
                });
              }}
              selectedItems={queryParams.closedAlertCategories}
            />
            <Button
              theme="standard"
              size="middle"
              type="primary"
              disabled={
                isGettingClosedAlerts || !hasSelected || isReOpeningAlerts
              }
              loading={isReOpeningAlerts}
              onClick={onReOpenAlertsButtonClick}
            >
              {t("Reopen Alerts")}
            </Button>
          </div>
        }
      >
        <Table
          className="close-alerts__list no-radius"
          rowClassName="cursor-pointer"
          data={(closeAlertsData?.alerts ?? [])?.map((it: IAlertItemByCIF) => ({
            ...it,
            key: it?.alertId,
          }))}
          onRow={(record: IAlertItemByCIF) => {
            return {
              onClick: () => onAlertRowClick(record),
            };
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          {...{
            columns,
            paginationOptions: {
              className: "close-alerts__pagination p-0 mt-6",
              pageNumber: queryParams.closedPageNumber,
              pageSize: queryParams.closedPageSize,
              totalItems: closeAlertsData?.total,
              onChange: onPageChange,
            },
          }}
          onChange={onTableChange}
        />
      </WrapperSection>
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

export default CloseAlerts;

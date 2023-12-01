import { ColumnsType } from "antd/es/table";
import Button from "components/Button";
import DropdownTree from "components/DropdownFilter/DropdownTree";
import RangePicker, {
  ITimeRangeValue,
} from "components/RangePicker/RangePicker";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import Plus from "components/svgs/Plus";
import {
  CaseDetailActionEnum,
  CaseDetailActionPrivilegeMap,
  IAlertByCase,
  IAlertListByCaseResult,
  ICaseCategory,
} from "interfaces/case";
import { isArray, isEmpty, isNumber } from "lodash";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CASES_DETAILS_QUERY_PARAM_NAMES,
  CASE_DATE_TIME_FORMAT,
} from "scripts/constants";
import {
  convertToDisplay,
  emptyFunction,
  formatMoney,
  getTableColumnSortOrder,
  mapSortColumnParams,
  renderRiskScore,
} from "scripts/helpers";
import { ICaseUnassignedAlertsQueryParamsState } from "./UnassignedAlertsContainer";
import ConfirmModal from "./components/ConfirmModal";
import { IGetAlertCategoriesProps } from "interfaces/common";
import AlertTransactionDetailsModal from "components/AlertTransactionDetailsModal";

interface IUnassignedAlertsViewProps extends IGetAlertCategoriesProps {
  isGettingUnassignedAlerts?: boolean;
  unassignedAlertsData?: IAlertListByCaseResult;

  queryParams: ICaseUnassignedAlertsQueryParamsState;
  setQueryParams: (params: ICaseUnassignedAlertsQueryParamsState) => void;
  onChangeTimeRange: ({ from, to }: ITimeRangeValue) => void;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const UnassignedAlertsView = ({
  isGettingAlertCategories,
  alertCategoriesData,

  isGettingUnassignedAlerts,
  unassignedAlertsData,

  queryParams,
  setQueryParams = emptyFunction,
  onChangeTimeRange = emptyFunction,
  privilegeMap = {},
}: IUnassignedAlertsViewProps) => {
  const { t } = useTranslation();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [alertSelected, setAlertSelected] = useState<any>({});
  const [alertTransactionDetailsOpen, setAlertTransactionDetailsOpen] =
    useState<boolean>(false);

  const onPageChange = (pageNumber: number, pageSize: number) => {
    setQueryParams({
      ...queryParams,
      pageNumber,
      pageSize,
    });
  };

  const onTableChange = (_pagination: any, _filters: any, sorter: any) => {
    const newSortList = !isArray(sorter) ? [sorter] : sorter;
    const mappedSortParams = mapSortColumnParams(newSortList, queryParams?.sort ?? []);

    return setQueryParams({
      ...queryParams,
      sort: mappedSortParams,
    });
  };

  const columns: ColumnsType<IAlertByCase> = [
    {
      title: t("Alert ID"),
      dataIndex: "alertId",
      key: "alertId",
    },
    {
      title: t("Time Range"),
      dataIndex: "alertDateTime",
      key: "alertDateTime",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(queryParams?.sort ?? [], "alertDateTime"),
      render: (value) => {
        if (!isNumber(value)) return null;

        return moment(new Date(value * 1000)).format(CASE_DATE_TIME_FORMAT);
      },
      width: "100px",
    },
    {
      title: t("Category"),
      dataIndex: "category",
      key: "category",
      render: (_, record: IAlertByCase) => {
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
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(queryParams?.sort ?? [], "riskScore"),
      render: (riskScore: number) => {
        return renderRiskScore(riskScore);
      },
      width: "120px",
    },
    */
    {
      title: t("Transaction Involved"),
      dataIndex: "totalTransactions",
      key: "totalTransactions",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(queryParams?.sort ?? [], "totalTransactions"),
      render: (totalTransactions: number) =>
        convertToDisplay(totalTransactions),
    },
    {
      title: t("Amount Involved"),
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(queryParams?.sort ?? [], "totalTransactionAmount"),
      render: (_: any, row: IAlertByCase) =>
        formatMoney(
          row?.totalTransactionAmount?.amount,
          row?.totalTransactionAmount?.currency
        ),
      className: "text-right",
    },
    {
      title: t("CIFs Involved"),
      dataIndex: "totalTransactionCIFs",
      key: "totalTransactionCIFs",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(queryParams?.sort ?? [], "totalTransactionCIFs"),
      render: (totalTransactionCIFs: number) =>
        convertToDisplay(totalTransactionCIFs),
    },
  ];

  if (privilegeMap[CaseDetailActionEnum.ADD_ALERT_TO_CASE]) {
    columns.push({
      title: "",
      width: "56px",
      render: (_, record: IAlertByCase) => {
        return (
          <Button
            theme="standard"
            type="primary"
            size="small"
            square
            icon={<Plus width={12} height={12} className="!mr-0" />}
            onClick={(e: any) => {
              e.stopPropagation();
              setAlertSelected(record);
              setIsConfirmModalOpen(true);
            }}
          />
        )
      }
    }
    )
  }

  return (
    <WrapperSection
      title={t("Unassigned Alerts")}
      className="case-details__unassigned-alerts unassigned-alerts p-4"
      headerClassName="!mb-6"
      loading={isGettingUnassignedAlerts}
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
            items={[
              {
                label: t("Categories"),
                value: "ALL",
                children: alertCategoriesData?.map(
                  (caseCategory: ICaseCategory) => {
                    return {
                      label: caseCategory?.name,
                      value: caseCategory?.id,
                      imageUrl: null,
                    };
                  }
                ) as any[],
              },
            ]}
            isInFilterSection
            dropdownPanelPosition={`bottom`}
            filterBy={CASES_DETAILS_QUERY_PARAM_NAMES.RELATED_ALERTS_CATEGORIES}
            onApply={(itemsSelected: string[]) => {
              setQueryParams({
                ...queryParams,
                categories: itemsSelected,
              });
            }}
            selectedItems={queryParams?.categories}
          />
        </div>
      }
    >
      <Table
        className="unassigned-alerts__list no-radius"
        rowClassName="cursor-pointer"
        data={(unassignedAlertsData?.alerts ?? [])?.map(
          (it: IAlertByCase, index: number) => ({
            ...it,
            key: index,
          })
        )}
        onRow={(record: any) => {
          return {
            onClick: () => {
              setAlertSelected(record);
              setAlertTransactionDetailsOpen(true);
            },
          };
        }}
        {...{
          columns,
          onChange: onTableChange,
          paginationOptions: {
            className: "unassigned-alerts__pagination p-0 mt-4",
            pageNumber: queryParams?.pageNumber,
            pageSize: queryParams?.pageSize,
            totalItems: unassignedAlertsData?.total,
            onChange: onPageChange,
          },
        }}
      />
      <ConfirmModal
        visible={isConfirmModalOpen}
        closeModal={() => {
          setAlertSelected({});
          setIsConfirmModalOpen(false);
        }}
        alertId={alertSelected?.alertId}
      />
      {!isEmpty(alertSelected) && (
        <AlertTransactionDetailsModal
          {...{
            visible: alertTransactionDetailsOpen,
            closeModal: () => {
              setAlertSelected(null);
              setAlertTransactionDetailsOpen(false);
            },
            alertSelected,
            alertDetails: alertSelected,
            type: "Alert",
          }}
        />
      )}
    </WrapperSection>
  );
};

export default UnassignedAlertsView;

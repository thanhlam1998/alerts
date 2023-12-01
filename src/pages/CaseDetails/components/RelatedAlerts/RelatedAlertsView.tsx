import { ColumnsType } from "antd/es/table";
import AlertTransactionDetailsModal from "components/AlertTransactionDetailsModal";
import Button from "components/Button";
import DropdownTree from "components/DropdownFilter/DropdownTree";
import RangePicker, {
  ITimeRangeValue,
} from "components/RangePicker/RangePicker";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import Delete from "components/svgs/Delete";
import {
  CaseDetailActionEnum,
  CaseDetailActionPrivilegeMap,
  IAlertByCase,
  IAlertListByCaseResult,
  ICaseCategory,
} from "interfaces/case";
import { IGetAlertCategoriesProps } from "interfaces/common";
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
  mapSortColumnParams
} from "scripts/helpers";
import { ICaseRelatedAlertsQueryParamsState } from "./RelatedAlertsContainer";
import DeleteRelatedAlertModal from "./components/DeleteRelatedAlertModal";

interface IRelatedAlertsViewProps extends IGetAlertCategoriesProps {
  isGettingRelatedAlerts?: boolean;
  relatedAlertsData?: IAlertListByCaseResult;

  queryParams: ICaseRelatedAlertsQueryParamsState;
  setQueryParams: (params: ICaseRelatedAlertsQueryParamsState) => void;
  onChangeTimeRange: ({ from, to }: ITimeRangeValue) => void;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const RelatedAlertsView = ({
  isGettingAlertCategories,
  alertCategoriesData,

  isGettingRelatedAlerts,
  relatedAlertsData,

  queryParams,
  setQueryParams = emptyFunction,
  onChangeTimeRange = emptyFunction,
  privilegeMap = {},
}: IRelatedAlertsViewProps) => {
  const { t } = useTranslation();

  const [alertSelected, setAlertSelected] = useState<any>(null);
  const [alertTransactionDetailsOpen, setAlertTransactionDetailsOpen] =
    useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const onPageChange = (pageNumber: number, pageSize: number) => {
    setQueryParams({
      ...queryParams,
      pageNumber,
      pageSize,
    });
  };

  const onTableChange = (_pagination: any, _filters: any, sorter: any) => {
    const newSortList = !isArray(sorter) ? [sorter] : sorter;
    const mappedSortParams = mapSortColumnParams(
      newSortList,
      queryParams?.sort ?? []
    );

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
      sortOrder: getTableColumnSortOrder(
        queryParams?.sort ?? [],
        "alertDateTime"
      ),
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
      sortOrder: getTableColumnSortOrder(
        queryParams?.sort ?? [],
        "totalTransactions"
      ),
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
      sortOrder: getTableColumnSortOrder(
        queryParams?.sort ?? [],
        "totalTransactionAmount"
      ),
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
      sortOrder: getTableColumnSortOrder(
        queryParams?.sort ?? [],
        "totalTransactionCIFs"
      ),
      render: (totalTransactionCIFs: number) =>
        convertToDisplay(totalTransactionCIFs),
    },
  ];

  if (privilegeMap[CaseDetailActionEnum.REMOVE_ALERT_FROM_CASE]) {
    columns.push({
      title: "",
      width: "56px",
      render: (_: any, record: IAlertByCase) => {
        return (
          <Button
            theme="red"
            type="default"
            size="small"
            square
            icon={<Delete width={12} height={12} className="!mr-0" />}
            onClick={(e: any) => {
              e.stopPropagation();
              setAlertSelected(record);
              setIsConfirmModalOpen(true);
            }}
          />
        );
      },
    });
  }

  return (
    <WrapperSection
      title={t("Related Alerts")}
      className="case-details__related-alerts related-alerts p-4"
      headerClassName="!mb-6"
      loading={isGettingRelatedAlerts}
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
                  (category: ICaseCategory) => {
                    return {
                      label: category?.name,
                      value: category?.id,
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
        className="related-alerts__list no-radius"
        rowClassName="cursor-pointer"
        data={(relatedAlertsData?.alerts ?? [])?.map(
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
            className: "related-alerts__pagination p-0 mt-4",
            pageNumber: queryParams?.pageNumber,
            pageSize: queryParams?.pageSize,
            totalItems: relatedAlertsData?.total,
            onChange: onPageChange,
          },
        }}
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
      <DeleteRelatedAlertModal
        alertId={alertSelected?.alertId}
        visible={isConfirmModalOpen}
        closeModal={() => {
          setAlertSelected(null);
          setIsConfirmModalOpen(false);
        }}
      />
    </WrapperSection>
  );
};

export default RelatedAlertsView;

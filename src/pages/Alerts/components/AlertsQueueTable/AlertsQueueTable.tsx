import moment from "moment";
import Table from "components/Table";
import { ALERT_DATE_TIME_FORMAT, LEFT_MENU_KEY } from "scripts/constants";
import { ColumnsType } from "antd/es/table";
import { emptyFunction, formatMoney, getTableColumnSortOrder, mapSortColumnParams } from "scripts/helpers";
import { IAlertQueueItem } from "interfaces/alertsQueue";
import { IPaginationProps } from "components/Table/Table";
import { isArray } from "lodash";
import { ISortColumn } from "interfaces/common";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IAlertsQueueTableProps {
  data?: IAlertQueueItem[];
  paginationOptions?: IPaginationProps;
  onSortChange: (sortBy: any) => void;
  sortBy: ISortColumn[];
}

const AlertsQueueTable = ({
  data = [],
  paginationOptions,
  onSortChange = emptyFunction,
  sortBy,
}: IAlertsQueueTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns: ColumnsType<IAlertQueueItem> = [
    {
      title: t("CIF"),
      dataIndex: "cif",
      key: "cif",
      width: "6%",
      render: (_: number, record: IAlertQueueItem) => {
        return (
          <Link
            className="text-blue500 hover:text-blue600"
            to={`/${LEFT_MENU_KEY.ALERTS}/${record?.cif}`}
          >
            {record?.cif}
          </Link>
        );
      },
    },
    {
      title: t("Name"),
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: t("Branch"),
      dataIndex: "branchName",
      key: "branchName",
      width: "20%",
    },
    {
      title: t("Last Alert"),
      dataIndex: "lastAlertDateTime",
      key: "lastAlertDateTime",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "lastAlertDateTime"),
      render: (lastAlertDateTime: number | null) => {
        return !!lastAlertDateTime
          ? moment(lastAlertDateTime * 1000).format(ALERT_DATE_TIME_FORMAT)
          : "";
      },
      // width: "120px",
    },
    /*
    {
      title: t("Priority"),
      dataIndex: "customerPriority",
      key: "customerPriority",
      width: "10%",
      render: (priority: IAlertPriority) => {
        const priorityName = ALERT_PRIORITY_OPTIONS(t)?.find(
          (item: any) => item?.value === priority
        )?.name;

        return (
          <Tag
            color={getAlertPriorityColor(priority as ALERT_PRIORITIES)}
            label={upperFirst(priorityName)}
          />
        );
      },
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "customerPriority"),
    },
    {
      title: t("Risk Score"),
      key: "aggregatedRiskScore",
      dataIndex: "aggregatedRiskScore",
      width: "12%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "aggregatedRiskScore"),
      render: (aggregatedRiskScore: number) => {
        return renderRiskScore(aggregatedRiskScore);
      },
    },
    */
    {
      title: t("Total Alerts"),
      dataIndex: "totalOpenAlerts",
      key: "totalOpenAlerts",
      width: "10%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "totalOpenAlerts"),
    },
    {
      title: t("Alert Amount"),
      dataIndex: "totalTransactionAmountAmount",
      key: "totalTransactionAmountAmount",
      width: "12%",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "totalTransactionAmount"),
      render: (_: number, row: IAlertQueueItem) =>
        formatMoney(
          row?.totalTransactionAmount?.amount,
          row?.totalTransactionAmount?.currency
        ),
      className: "text-right",
    },
  ];

  const onChange = (_pagination: any, _filters: any, sorter: any) => {
    const newSortList = !isArray(sorter) ? [sorter] : sorter;
    const mappedSortParams = mapSortColumnParams(newSortList, sortBy);
    return onSortChange(mappedSortParams);
  };

  return (
    <Table
      className="alerts-queue__list no-radius"
      rowClassName="cursor-pointer"
      data={(data || [])?.map((it: IAlertQueueItem, index: number) => ({
        ...it,
        key: index,
        totalTransactionAmountAmount: it?.totalTransactionAmount?.amount ?? 0,
      }))}
      onRow={(record: IAlertQueueItem) => {
        return {
          onClick: () => navigate(`/${LEFT_MENU_KEY.ALERTS}/${record?.cif}`),
        };
      }}
      {...{ paginationOptions, columns, onChange }}
    />
  );
};

export default AlertsQueueTable;

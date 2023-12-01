import moment from "moment";
import queryString from "query-string";
import Select from "components/Select";
import TableV2 from "components/TableV2";
import Tag from "components/Tag";
import usePagination from "hooks/usePagination";
import { ColumnsType } from "antd/es/table";
import { convertToDisplay, sorterByField } from "scripts/helpers";
import { IAlertQueueItem } from "interfaces/alertsQueue";
import { Trans, useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAlertsQueueTableProps {
  data?: IAlertQueueItem[];
}

const AlertsQueueTable = ({ data = [] }: IAlertsQueueTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { page, pageSize } = usePagination();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const parsedQuery = queryString.parse(location.search);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const { fraudTaggingFilter, statusFilter, priorityFilter } = useMemo(() => {
    return data.reduce(
      (acc, curr: any) => {
        curr?.fraudTagging && acc.fraudTaggingFilter.add(curr.fraudTagging);
        curr?.status && acc.statusFilter.add(curr.status);
        curr?.priority && acc.priorityFilter.add(curr.priority);
        return acc;
      },
      {
        fraudTaggingFilter: new Set(),
        statusFilter: new Set(),
        priorityFilter: new Set(),
      }
    );
  }, [data]);

  const columns: ColumnsType<any> = [
    {
      title: t("Rule Name"),
      dataIndex: "ruleName",
      key: "ruleName",
      width: 100,
      sorter: sorterByField("ruleName"),
    },
    {
      title: t("Registration Date"),
      dataIndex: "registrationDate",
      key: "registrationDate",
      render(value) {
        return <div>{moment(value).format("MMMM DD YYYY, hh:mm A")}</div>;
      },
      width: 100,
      sorter: sorterByField("registrationDate"),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render(value) {
        return <Tag label={value} />;
      },
      sorter: sorterByField("status"),
      width: 100,
    },
    {
      title: t("Mission"),
      dataIndex: "mission",
      key: "mission",
      sorter: sorterByField("mission"),
    },
    {
      title: t("Priority"),
      dataIndex: "priority",
      key: "priority",
      sorter: sorterByField("priority"),
      render(value) {
        return <Tag label={value} />;
      },
      width: 100,
    },
    {
      title: t("Notes"),
      dataIndex: "notes",
      key: "notes",
      width: 300,
      sorter: sorterByField("notes"),
    },
    {
      title: t("Fraud Tagging"),
      dataIndex: "fraudTagging",
      key: "fraudTagging",
      render(value) {
        return (
          <Select
            placeholder={t("Please select")}
            options={Array.from(fraudTaggingFilter).map((item: any) => ({ label: item, value: item }))}
            defaultValue={value}
            showSearch
            onChange={() => {
              // TODO: Call API to update status
            }}
          />
        );
      },
      sorter: sorterByField("fraudTagging"),
    },
    {
      title: t("Reg Channel"),
      dataIndex: "regChannel",
      key: "regChannel",
      sorter: sorterByField("regChannel"),
    },
    {
      title: t("First Name"),
      dataIndex: "firstName",
      key: "firstName",
      sorter: sorterByField("firstName"),
    },
    {
      title: t("Last Name"),
      dataIndex: "lastName",
      key: "lastName",
      sorter: sorterByField("lastName"),
    },
  ];

  return (
    <TableV2
      className="alerts-queue__list no-radius"
      rowSelection={rowSelection}
      dataSource={data}
      columns={columns}
      scroll={{ x: 1500 }}
      rowKey={"_id"}
      pagination={{
        onChange: (page_number: any, page_size = 10) => {
          const query = queryString.stringify({ ...parsedQuery, page_number, page_size });
          navigate({
            pathname: location.pathname,
            search: query,
          });
        },
        current: page,
        pageSize,
        showSizeChanger: true,
        total: data.length, // TODO: Change this if using pagination api
        showTotal: (total) =>
          total > 1 ? (
            <Trans defaults={`Total {{value}} items`} values={{ value: convertToDisplay(total) }} />
          ) : (
            <Trans defaults={`Total {{value}} item`} values={{ value: convertToDisplay(total) }} />
          ),
      }}
    />
  );
};

export default AlertsQueueTable;

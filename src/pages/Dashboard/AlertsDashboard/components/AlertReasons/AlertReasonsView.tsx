import { ColumnsType } from "antd/es/table";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import { IDashboardAlertReason } from "interfaces/dashboard";
import { useTranslation } from "react-i18next";
import { convertToDisplay, formatMoney } from "scripts/helpers";
import "./AlertReasons.scss";

const AlertReasonsView = ({
  isGettingAlertReasons,
  alertReasonsData,
}: {
  alertReasonsData: IDashboardAlertReason[];
  isGettingAlertReasons: boolean;
}) => {
  const { t } = useTranslation();

  const columns: ColumnsType<any> = [
    {
      title: t("Reason Name"),
      dataIndex: "reasonName",
      key: "reasonName",
      width: "25%",
    },
    {
      title: t("# of Alerts"),
      dataIndex: "numberOfAlerts",
      key: "numberOfAlerts",
      sorter: (a: IDashboardAlertReason, b: IDashboardAlertReason) =>
        (a.numberOfAlerts ?? 0) - (b.numberOfAlerts ?? 0),
      width: "25%",
      render: (_: number, record: IDashboardAlertReason) =>
        convertToDisplay(record?.numberOfAlerts),
    },
    {
      title: t("# of CIFs"),
      dataIndex: "numberOfCIFs",
      key: "numberOfCIFs",
      sorter: (a: IDashboardAlertReason, b: IDashboardAlertReason) =>
        (a.numberOfCIFs ?? 0) - (b.numberOfCIFs ?? 0),
      width: "25%",
      render: (_: number, record: IDashboardAlertReason) =>
        convertToDisplay(record?.numberOfCIFs),
    },
    {
      title: t("Total Transaction Amount"),
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      sorter: (a: IDashboardAlertReason, b: IDashboardAlertReason) =>
        (a.totalTransactionAmount?.amount ?? 0) -
        (b.totalTransactionAmount?.amount ?? 0),
      render: (_: number, record: IDashboardAlertReason) =>
        formatMoney(
          record?.totalTransactionAmount?.amount,
          record?.totalTransactionAmount?.currency
        ),
      className: "text-right",
      width: "25%",
    },
  ];

  return (
    <WrapperSection
      title={t("Alert Reasons")}
      className="alerts-dashboard__alert-reasons alert-reasons !p-4"
      loading={isGettingAlertReasons}
    >
      <Table
        className="alert-reasons__list no-radius"
        data={alertReasonsData?.map(
          (it: IDashboardAlertReason, index: number) => ({
            ...it,
            key: index,
          })
        )}
        {...{ columns, showPagination: false }}
      />
    </WrapperSection>
  );
};

export default AlertReasonsView;

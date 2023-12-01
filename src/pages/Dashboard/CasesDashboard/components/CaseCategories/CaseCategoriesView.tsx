import { ColumnsType } from "antd/es/table";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import { IDashboardCaseCategory } from "interfaces/dashboard";
import { useTranslation } from "react-i18next";
import {
  convertToDisplay,
  formatMoney
} from "scripts/helpers";
import "./CaseCategories.scss";

const CaseCategoriesView = ({
  isGettingCaseCategories,
  caseCategoriesData,
}: {
  isGettingCaseCategories: boolean;
  caseCategoriesData: IDashboardCaseCategory[];
}) => {
  const { t } = useTranslation();

  const columns: ColumnsType<any> = [
    {
      title: t("Case Category Name"),
      dataIndex: "categoryName",
      key: "categoryName",
      width: "20%",
    },
    {
      title: t("# of Cases"),
      dataIndex: "numberOfCases",
      key: "numberOfCases",
      sorter: (a: IDashboardCaseCategory, b: IDashboardCaseCategory) =>
        (a.numberOfCases ?? 0) - (b.numberOfCases ?? 0),
      render: (_: number, record: IDashboardCaseCategory) =>
        convertToDisplay(record?.numberOfCases),
      width: "20%",
    },
    {
      title: t("# of Main Subject"),
      dataIndex: "numberOfMainSubjects",
      key: "numberOfMainSubjects",
      sorter: (a: IDashboardCaseCategory, b: IDashboardCaseCategory) =>
        (a.numberOfMainSubjects ?? 0) - (b.numberOfMainSubjects ?? 0),
      render: (_: number, record: IDashboardCaseCategory) =>
        convertToDisplay(record?.numberOfMainSubjects),
      width: "20%",
    },
    {
      title: t("# of Incidental Subject"),
      dataIndex: "numberOfIncidentalSubjects",
      key: "numberOfIncidentalSubjects",
      sorter: (a: IDashboardCaseCategory, b: IDashboardCaseCategory) =>
        (a.numberOfIncidentalSubjects ?? 0) -
        (b.numberOfIncidentalSubjects ?? 0),
      render: (_: number, record: IDashboardCaseCategory) =>
        convertToDisplay(record?.numberOfIncidentalSubjects),
      width: "20%",
    },
    {
      title: t("Total Transaction Amount"),
      dataIndex: "totalTransactionAmount",
      key: "totalTransactionAmount",
      sorter: (a: IDashboardCaseCategory, b: IDashboardCaseCategory) =>
        (a.totalTransactionAmount?.amount ?? 0) -
        (b.totalTransactionAmount?.amount ?? 0),
      render: (_: number, record: IDashboardCaseCategory) =>
        formatMoney(
          record?.totalTransactionAmount?.amount,
          record?.totalTransactionAmount?.currency
        ),
      className: "text-right",
      width: "20%",
    },
  ];

  return (
    <WrapperSection
      title={t("Case Categories")}
      className="cases-dashboard__case-categories case-categories !p-4"
      loading={isGettingCaseCategories}
    >
      <Table
        className="case-categories__list no-radius"
        data={caseCategoriesData?.map(
          (it: IDashboardCaseCategory, index: number) => ({
            ...it,
            key: index,
          })
        )}
        {...{ columns, showPagination: false }}
      />
    </WrapperSection>
  );
};

export default CaseCategoriesView;

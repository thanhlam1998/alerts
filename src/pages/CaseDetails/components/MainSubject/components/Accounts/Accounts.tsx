import { ColumnsType } from "antd/es/table";
import BoxContent from "components/BoxContent";
import Table from "components/Table";
import { ICaseMainSubject, ICaseSubjectAccount } from "interfaces/case";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CASE_DATE_TIME_FORMAT } from "scripts/constants";

interface IAccountsProps {
  mainSubjectData?: ICaseMainSubject;
}

const Accounts = ({ mainSubjectData }: IAccountsProps) => {
  const { t } = useTranslation();

  const columns: ColumnsType<ICaseSubjectAccount> = [
    {
      title: t("Account #"),
      dataIndex: "accountNumber",
      key: "accountNumber",
      sorter: (a: ICaseSubjectAccount, b: ICaseSubjectAccount) =>
        a.accountNumber.localeCompare(b.accountNumber),
    },
    {
      title: t("Account Name"),
      dataIndex: "accountName",
      key: "accountName",
      sorter: (a: ICaseSubjectAccount, b: ICaseSubjectAccount) =>
        a.accountName.localeCompare(b.accountName),
    },
    {
      title: t("Branch"),
      dataIndex: "branchName",
      key: "branchName",
      sorter: (a: ICaseSubjectAccount, b: ICaseSubjectAccount) =>
        a.branchName.localeCompare(b.branchName),
    },
    {
      title: t("Open Date"),
      dataIndex: "openDateTime",
      key: "openDateTime",
      sorter: (a: ICaseSubjectAccount, b: ICaseSubjectAccount) =>
        (a.openDateTime ?? 0) - (b.openDateTime ?? 0),
      render: (openDateTime: number | null) => {
        return openDateTime
          ? moment(openDateTime * 1000).format(CASE_DATE_TIME_FORMAT)
          : null;
      },
    },
  ];

  return (
    <BoxContent title={t("Accounts")} theme="gray">
      <Table
        className="accounts__list no-radius"
        data={(mainSubjectData?.accounts || [])?.map(
          (it: ICaseSubjectAccount) => ({
            ...it,
            key: it?.accountNumber,
          })
        )}
        {...{ columns, showPagination: false }}
      />
    </BoxContent>
  );
};

export default Accounts;

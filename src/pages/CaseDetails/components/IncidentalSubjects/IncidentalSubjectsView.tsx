import { ColumnsType } from "antd/es/table";
import Button from "components/Button";
import Input from "components/Input";
import Select from "components/Select";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import Delete from "components/svgs/Delete";
import Search from "components/svgs/Search";
import {
  CaseDetailActionEnum,
  CaseDetailActionPrivilegeMap,
  ICaseIncidentalSubject,
  ICaseIncidentalSubjectResult,
} from "interfaces/case";
import { IBranch } from "interfaces/common";
import { isArray } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  convertToDisplay,
  emptyFunction,
  formatMoney,
  getTableColumnSortOrder,
  mapSortColumnParams
} from "scripts/helpers";
import { ICaseIncidentalSubjectsQueryParamsState } from "./IncidentalSubjectsContainer";
import DeleteIncidentalSubjectModal from "./components/DeleteIncidentalSubjectModal";
import IncidentalSubjectDetailsModal from "./components/IncidentalSubjectDetailsModal";

interface IIncidentalSubjectsViewProps {
  isGettingIncidentalSubjects?: boolean;
  incidentalSubjectsData?: ICaseIncidentalSubjectResult;
  queryParams: ICaseIncidentalSubjectsQueryParamsState;
  setQueryParams: (params: ICaseIncidentalSubjectsQueryParamsState) => void;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const IncidentalSubjectsView = ({
  isGettingIncidentalSubjects,
  incidentalSubjectsData,
  queryParams,
  setQueryParams = emptyFunction,
  privilegeMap = {},
}: IIncidentalSubjectsViewProps) => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState(
    queryParams?.searchKeyword ?? ""
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [caseSelected, setCaseSelected] =
    useState<ICaseIncidentalSubject | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onChangeKeyword = (e: any) => {
    setSearchText(e?.target?.value);
  };

  const onSearch = () => {
    if (searchText?.length > 0 && searchText?.length < 3) return;

    setQueryParams({
      ...queryParams,
      searchKeyword: searchText,
    });
  };

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

  const columns: ColumnsType<ICaseIncidentalSubject> = [
    {
      title: t("CIF"),
      dataIndex: "cif",
      key: "cif",
    },
    {
      title: t("Customer Name"),
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: t("Account #"),
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: t("Branch/Bank"),
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: t("Transactions Involved"),
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
      render: (totalTransactions: number) => {
        return convertToDisplay(totalTransactions);
      },
      width: "15%",
    },
    {
      title: t("Involved Transactions Amount"),
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
      render: (_: number, row: ICaseIncidentalSubject) =>
        formatMoney(
          row?.totalTransactionAmount?.amount,
          row?.totalTransactionAmount?.currency
        ),
      className: "text-right",
      width: "20%",
    },
  ];

  if (
    privilegeMap[CaseDetailActionEnum.REMOVE_SUBJECT_FROM_INCIDENTAL_SUBJECT]
  ) {
    columns.push({
      title: "",
      width: "56px",
      render: (_: number, record: ICaseIncidentalSubject) => {
        return (
          <Button
            theme="red"
            type="default"
            size="small"
            square
            icon={<Delete width={12} height={12} className="!mr-0" />}
            onClick={(e: any) => {
              e.stopPropagation();
              setIsDeleteModalOpen(true);
              setCaseSelected(record);
            }}
          />
        );
      },
    });
  }

  return (
    <WrapperSection
      title={t("Incidental Subjects")}
      className="case-details__incidental-subjects incidental-subjects p-4"
      headerClassName="!mb-6"
      loading={isGettingIncidentalSubjects}
      rightHeaderContent={
        <div className="flex items-center justify-end gap-2">
          <Input
            className="w-[320px]"
            placeholder={t("Search by Customer Name or Account #")}
            suffix={<Search className="w-[14px] h-[14px]" />}
            value={searchText}
            onChange={onChangeKeyword}
            onPressEnter={onSearch}
            disabled={isGettingIncidentalSubjects}
          />
          <Select
            options={
              (incidentalSubjectsData?.branches ?? [])?.map(
                (branchItem: IBranch) => {
                  return {
                    label: branchItem?.name,
                    value: branchItem?.id,
                  };
                }
              ) as any[]
            }
            showSearch
            disabled={isGettingIncidentalSubjects}
            loading={isGettingIncidentalSubjects}
            placeholder={t("Branches")}
            placement="bottomRight"
            onChange={(itemSelected: any) => {
              if (itemSelected !== undefined) {
                setQueryParams({
                  ...queryParams,
                  branchIds: [itemSelected === "Unknown" ? "" : itemSelected],
                });
              } else {
                setQueryParams({
                  ...queryParams,
                  branchIds: [],
                });
              }
            }}
            allowClear
          />
        </div>
      }
    >
      <Table
        className="incidental-subjects__list no-radius"
        rowClassName="cursor-pointer"
        data={(incidentalSubjectsData?.subjects ?? [])?.map(
          (it: ICaseIncidentalSubject, index: number) => ({
            ...it,
            key: index,
            totalInvolvedTransactionsAmount:
              it?.totalTransactionAmount?.amount ?? 0,
          })
        )}
        onRow={(record: ICaseIncidentalSubject) => {
          return {
            onClick: () => {
              setIsDetailsModalOpen(true);
              setCaseSelected(record);
            },
          };
        }}
        {...{
          columns,
          onChange: onTableChange,
          paginationOptions: {
            className: "incidental-subjects__pagination p-0 mt-4",
            pageNumber: queryParams?.pageNumber,
            pageSize: queryParams?.pageSize,
            totalItems: incidentalSubjectsData?.total,
            onChange: onPageChange,
          },
        }}
      />
      <IncidentalSubjectDetailsModal
        visible={isDetailsModalOpen}
        closeModal={() => {
          setIsDetailsModalOpen(false);
          setCaseSelected(null);
        }}
        {...{ caseSelected }}
      />
      <DeleteIncidentalSubjectModal
        visible={isDeleteModalOpen}
        closeModal={() => {
          setIsDeleteModalOpen(false);
          setCaseSelected(null);
        }}
        idType={caseSelected?.idType}
        cif={caseSelected?.cif}
      />
    </WrapperSection>
  );
};

export default IncidentalSubjectsView;

import { ColumnsType } from "antd/es/table";
import Button from "components/Button";
import Input from "components/Input";
import Select from "components/Select";
import Table from "components/Table";
import WrapperSection from "components/WrapperSection";
import Plus from "components/svgs/Plus";
import Search from "components/svgs/Search";
import {
  CaseDetailActionEnum,
  CaseDetailActionPrivilegeMap,
  ICaseIncidentalSubject,
  ICaseRemovedSubject,
  ICaseRemovedSubjectResult,
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
import IncidentalSubjectDetailsModal from "../IncidentalSubjects/components/IncidentalSubjectDetailsModal";
import { ICaseRemovedSubjectsQueryParamsState } from "./RemovedSubjectsContainer";
import ConfirmModal from "./components/ConfirmModal";

interface IRemovedSubjectsViewProps {
  isGettingRemovedSubjects?: boolean;
  removedSubjectsData?: ICaseRemovedSubjectResult;
  queryParams: ICaseRemovedSubjectsQueryParamsState;
  setQueryParams: (params: ICaseRemovedSubjectsQueryParamsState) => void;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const RemovedSubjectsView = ({
  isGettingRemovedSubjects,
  removedSubjectsData,
  queryParams,
  setQueryParams = emptyFunction,
  privilegeMap = {},
}: IRemovedSubjectsViewProps) => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState(
    queryParams?.searchKeyword ?? ""
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<ICaseIncidentalSubject | null>(
    null
  );
  const [subjectSelected, setSubjectSelected] =
    useState<ICaseRemovedSubject | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  if (privilegeMap[CaseDetailActionEnum.ADD_SUBJECT_TO_INCIDENTAL_SUBJECT]) {
    columns.push({
      title: "",
      width: "56px",
      render: (_: number, record: ICaseIncidentalSubject) => {
        return (
          <Button
            theme="standard"
            type="primary"
            size="small"
            square
            icon={<Plus width={12} height={12} className="!mr-0" />}
            onClick={(e: any) => {
              e.stopPropagation();
              setSubjectSelected(record);
              setIsConfirmModalOpen(true);
            }}
          />
        );
      },
    });
  }

  return (
    <>
      <WrapperSection
        title={t("Removed Subjects")}
        className="case-details__removed-subjects removed-subjects p-4"
        headerClassName="!mb-6"
        loading={isGettingRemovedSubjects}
        rightHeaderContent={
          <div className="flex items-center justify-end gap-2">
            <Input
              className="w-[320px]"
              placeholder={t("Search by Customer Name or Account #")}
              suffix={<Search className="w-[14px] h-[14px]" />}
              value={searchText}
              onChange={onChangeKeyword}
              onPressEnter={onSearch}
            />
            <Select
              options={
                (removedSubjectsData?.branches ?? [])?.map(
                  (branchItem: IBranch) => {
                    return {
                      label: branchItem?.name,
                      value: branchItem?.id,
                    };
                  }
                ) as any[]
              }
              showSearch
              disabled={isGettingRemovedSubjects}
              loading={isGettingRemovedSubjects}
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
          className="removed-subjects__list no-radius"
          rowClassName="cursor-pointer"
          data={(removedSubjectsData?.subjects ?? [])?.map(
            (it: ICaseRemovedSubject, index: number) => ({
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
                setRowSelected(record);
              },
            };
          }}
          {...{
            columns,
            onChange: onTableChange,
            paginationOptions: {
              className: "removed-subjects__pagination p-0 mt-4",
              pageNumber: queryParams?.pageNumber,
              pageSize: queryParams?.pageSize,
              totalItems: removedSubjectsData?.total,
              onChange: onPageChange,
            },
          }}
        />
      </WrapperSection>
      <IncidentalSubjectDetailsModal
        visible={isDetailsModalOpen}
        closeModal={() => {
          setIsDetailsModalOpen(false);
          setRowSelected(null);
        }}
        {...{ caseSelected: rowSelected }}
      />
      <ConfirmModal
        visible={isConfirmModalOpen}
        cif={subjectSelected?.cif}
        idType={subjectSelected?.idType}
        closeModal={() => {
          setSubjectSelected(null);
          setIsConfirmModalOpen(false);
        }}
      />
    </>
  );
};

export default RemovedSubjectsView;

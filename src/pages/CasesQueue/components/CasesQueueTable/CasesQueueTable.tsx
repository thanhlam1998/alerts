import { ColumnsType } from "antd/es/table";
import { SortableCaseQueueItemColumns } from "apis/cases";
import Button from "components/Button/Button";
import CaseCategoriesModal from "components/CaseCategoriesModal/CaseCategoriesModal";
import Table from "components/Table";
import { IPaginationProps } from "components/Table/Table";
import Tag from "components/Tag";
import {
  ICaseCategory,
  ICaseQueueItem,
  ICaseQueueItemMainSubject,
} from "interfaces/case";
import { ISortColumn } from "interfaces/common";
import { isArray, isEmpty, upperFirst } from "lodash";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  CASE_APPROVAL_STATUS_ENUM,
  CASE_APPROVAL_STATUS_OPTIONS,
  CASE_DATE_TIME_FORMAT,
  CASE_PRIORITIES,
  CASE_PRIORITY_OPTIONS,
  LEFT_MENU_KEY,
} from "scripts/constants";
import {
  convertToDisplay,
  emptyFunction,
  getAlertPriorityColor,
  getCaseApprovalStatus,
  getTableColumnSortOrder,
  mapSortColumnParams,
  renderRiskScore
} from "scripts/helpers";

interface ICasesQueueTableProps {
  data?: ICaseQueueItem[];
  paginationOptions?: IPaginationProps;
  onSortChange: (sortBy: any) => void;
  sortBy: ISortColumn<SortableCaseQueueItemColumns>[];
  isOpenCasesQueueTab: boolean;
}

const CasesQueueTable = ({
  data = [],
  paginationOptions,
  onSortChange = emptyFunction,
  sortBy,
  isOpenCasesQueueTab,
}: ICasesQueueTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isCaseCategoriesModalOpen, setIsCaseCategoriesModalOpen] =
    useState(false);
  const [caseCategories, setCaseCategories] = useState<ICaseCategory[]>([]);

  const onChange = (_pagination: any, _filters: any, sorter: any) => {
    const newSortList = !isArray(sorter) ? [sorter] : sorter;
    const mappedSortParams = mapSortColumnParams(newSortList, sortBy);
    return onSortChange(mappedSortParams);
  };

  const columns: ColumnsType<ICaseQueueItem> = [
    {
      title: t("Case #"),
      dataIndex: "caseId",
      key: "caseId",
      render: (_: number, record: ICaseQueueItem) => {
        return (
          <Link
            className="text-blue500 hover:text-blue600"
            to={`/${LEFT_MENU_KEY.CASES}/${record?.caseId}`}
          >
            {record?.caseId}
          </Link>
        );
      },
    },
    {
      title: t("Created Date"),
      dataIndex: "createdDateTime",
      key: "createdDateTime",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "createdDateTime"),
      render: (createdDateTime: number | null) => {
        return !!createdDateTime
          ? moment(createdDateTime * 1000).format(CASE_DATE_TIME_FORMAT)
          : "";
      },
    },
    {
      title: t("Main Subject"),
      dataIndex: "mainSubject",
      key: "mainSubject",
      render: (mainSubject: ICaseQueueItemMainSubject | null) => {
        return !isEmpty(mainSubject)
          ? `${mainSubject.customerName} (${mainSubject?.cif})`
          : "";
      },
    },
    {
      title: t("Priority"),
      dataIndex: "priority",
      key: "priority",
      render: (priority: CASE_PRIORITIES | null) => {
        if (isEmpty(priority)) return "";

        const priorityName = CASE_PRIORITY_OPTIONS(t)?.find(
          (item: any) => item?.value === priority
        )?.name;

        return (
          <Tag
            color={getAlertPriorityColor(priority as CASE_PRIORITIES)}
            label={upperFirst(priorityName)}
          />
        );
      },
    },
    {
      title: t("Categories"),
      dataIndex: "categories",
      key: "categories",
      render: (categories: ICaseCategory[]) => {
        if (isEmpty(categories)) return "";

        return (
          <div className="flex items-center gap-2">
            <span className="sm_body_b2_reg text-gray800">
              {categories?.[0]?.name}
            </span>
            {categories?.length > 1 && (
              <Button
                onClick={(event: any) => {
                  event.stopPropagation();
                  setCaseCategories(categories);
                  setIsCaseCategoriesModalOpen(true);
                }}
                size="small"
              >{`+${convertToDisplay(categories?.length - 1)}`}</Button>
            )}
          </div>
        );
      },
    },
    {
      title: t("Alerts"),
      dataIndex: "totalAlerts",
      key: "totalAlerts",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "totalAlerts"),
      render: (totalAlerts: number) => {
        return convertToDisplay(totalAlerts);
      },
    },
    {
      title: t("Incidental Subject"),
      dataIndex: "totalIncidentalSubjects",
      key: "totalIncidentalSubjects",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "totalIncidentalSubjects"),
      render: (totalIncidentalSubjects: number) => {
        return convertToDisplay(totalIncidentalSubjects);
      },
    },
    {
      title: t("Transactions"),
      dataIndex: "totalTransactions",
      key: "totalTransactions",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "totalTransactions"),
      render: (totalTransactions: number) => {
        return convertToDisplay(totalTransactions);
      },
    },
    {
      title: t("Risk Score"),
      key: "aggregatedRiskScore",
      dataIndex: "aggregatedRiskScore",
      sorter: {
        compare: emptyFunction,
        multiple: 1,
      },
      sortOrder: getTableColumnSortOrder(sortBy, "aggregatedRiskScore"),
      render: (aggregatedRiskScore: number) => {
        return renderRiskScore(aggregatedRiskScore);
      },
    },
    ...(isOpenCasesQueueTab
      ? [
          {
            title: t("Approval Status"),
            dataIndex: "approvalStatus",
            key: "approvalStatus",
            render: (approvalStatus: CASE_APPROVAL_STATUS_ENUM | null) => {
              if (isEmpty(approvalStatus)) return "";

              const approvalStatusName = CASE_APPROVAL_STATUS_OPTIONS?.find(
                (item: any) => item?.value === approvalStatus
              )?.label;

              return (
                <Tag
                  color={getCaseApprovalStatus(
                    approvalStatus as CASE_APPROVAL_STATUS_ENUM
                  )}
                  label={approvalStatusName}
                />
              );
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <Table
        className="cases-queue__list no-radius"
        rowClassName="cursor-pointer"
        data={(data || [])?.map((it: ICaseQueueItem) => ({
          ...it,
          key: it?.caseId,
        }))}
        onRow={(record: ICaseQueueItem) => {
          return {
            onClick: () =>
              navigate(`/${LEFT_MENU_KEY.CASES}/${record?.caseId}`),
          };
        }}
        {...{ paginationOptions, columns, onChange }}
      />
      <CaseCategoriesModal
        visible={isCaseCategoriesModalOpen}
        closeModal={() => {
          setIsCaseCategoriesModalOpen(false);
          setCaseCategories([]);
        }}
        categories={caseCategories}
      />
    </>
  );
};

export default CasesQueueTable;

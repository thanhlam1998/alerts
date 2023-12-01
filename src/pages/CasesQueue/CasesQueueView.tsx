import DropdownTree from "components/DropdownFilter/DropdownTree";
import Input from "components/Input/Input";
import PageWrapper from "components/PageWrapper";
import SwitchButton from "components/SwitchButton";
import WrapperSection from "components/WrapperSection";
import Home from "components/svgs/Home";
import Search from "components/svgs/Search";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { ICaseCategory, ICaseQueueResult } from "interfaces/case";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateEffect } from "react-use";
import {
  CASES_QUEUE_QUERY_PARAM_NAMES,
  CASE_APPROVAL_STATUS_OPTIONS,
  CASE_PRIORITY_OPTIONS,
  CASE_STATUS_FOR_TAB_ENUM,
  CASE_STATUS_FOR_TAB_OPTIONS,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import CasesQueueTable from "./components/CasesQueueTable";
import { ISortColumn } from "interfaces/common";
import { SortableCaseQueueItemColumns } from "apis/cases";

interface ICasesQueueViewProps {
  isGettingCaseCategories?: boolean;
  caseCategoriesData?: ICaseCategory[];

  prioritiesSelected?: string[];
  categoriesSelected?: string[];
  approvalStatusesSelected?: string[];

  isGettingCasesQueue?: boolean;
  casesQueueData?: ICaseQueueResult;

  setSortBy: (sortBy: any) => void;
  sortBy: ISortColumn<SortableCaseQueueItemColumns>[];
  onPageChange: (data: any) => void;
  pageNumber: number;
  pageSize: number;
  isOpenCasesQueueTab: boolean;
}

const DEFAULT_PAGE_NUMBER_SIZE = {
  [CASES_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]: DEFAULT_PAGE_INDEX,
  [CASES_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: DEFAULT_PAGE_SIZE,
};

const CasesQueueView = ({
  prioritiesSelected = [],
  categoriesSelected = [],
  approvalStatusesSelected = [],

  isGettingCaseCategories,
  caseCategoriesData = [],

  isGettingCasesQueue = false,
  casesQueueData,

  setSortBy = emptyFunction,
  sortBy,
  onPageChange = emptyFunction,
  pageNumber,
  pageSize,
  isOpenCasesQueueTab,
}: ICasesQueueViewProps) => {
  const { t } = useTranslation();
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const [searchText, setSearchText] = useState(
    QUERY_DATA?.[CASES_QUEUE_QUERY_PARAM_NAMES?.KEYWORD] ?? ""
  );
  const [tabSelected, setTabSelected] = useState(
    QUERY_DATA?.[CASES_QUEUE_QUERY_PARAM_NAMES?.STATUS] ??
      CASE_STATUS_FOR_TAB_ENUM.OPEN
  );

  useUpdateEffect(() => {
    onChangeFilter({
      ...DEFAULT_PAGE_NUMBER_SIZE,
      [CASES_QUEUE_QUERY_PARAM_NAMES.STATUS]: tabSelected,
    });
  }, [tabSelected]);

  const onChangeKeyword = (e: any) => {
    setSearchText(e?.target?.value);
  };

  const onSearch = () => {
    if (searchText?.length > 0 && searchText?.length < 3) return;

    const newQueryParams = {
      ...QUERY_DATA,
      ...DEFAULT_PAGE_NUMBER_SIZE,
      [CASES_QUEUE_QUERY_PARAM_NAMES.KEYWORD]: searchText,
    };

    if (isEmpty(newQueryParams?.[CASES_QUEUE_QUERY_PARAM_NAMES.KEYWORD])) {
      delete newQueryParams[CASES_QUEUE_QUERY_PARAM_NAMES.KEYWORD];
    }

    onChangeFilter(newQueryParams);
  };

  return (
    <PageWrapper
      className="cases-queue"
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "#",
          title: t("Cases Queue"),
        },
      ]}
    >
      <WrapperSection
        title={t("Cases Queue")}
        headerClassName="!mb-0 pl-2 cases-queue__header"
        className="mb-4"
      />
      <WrapperSection
        title={
          <SwitchButton
            items={CASE_STATUS_FOR_TAB_OPTIONS}
            active={tabSelected}
            onChange={(item: any) => {
              setTabSelected(item?.value);
            }}
          />
        }
        className="!p-4 cases-queue__table"
        loading={isGettingCasesQueue}
        rightHeaderContent={
          <div className="flex items-center justify-end gap-2">
            <Input
              className="w-[320px]"
              placeholder={t("Search by Case # or Main Subject")}
              suffix={<Search className="w-[14px] h-[14px]" />}
              value={searchText}
              onChange={onChangeKeyword}
              onPressEnter={onSearch}
            />
            <DropdownTree
              loading={false}
              items={
                [
                  {
                    label: t("Priorities"),
                    value: "ALL",
                    children: CASE_PRIORITY_OPTIONS(t)?.map(
                      (item: { name: string; value: string }) => {
                        return {
                          label: item?.name,
                          value: item?.value,
                          imageUrl: null,
                        };
                      }
                    ) as any[],
                  },
                ] ?? []
              }
              isInFilterSection
              dropdownPanelPosition={`bottom`}
              filterBy={CASES_QUEUE_QUERY_PARAM_NAMES.PRIORITIES}
              onApply={(itemsSelected: any) => {
                onChangeFilter({
                  ...QUERY_DATA,
                  ...DEFAULT_PAGE_NUMBER_SIZE,
                  [CASES_QUEUE_QUERY_PARAM_NAMES.PRIORITIES]: itemsSelected,
                });
              }}
              selectedItems={prioritiesSelected}
            />
            <DropdownTree
              loading={isGettingCaseCategories}
              items={
                [
                  {
                    label: t("Categories"),
                    value: "ALL",
                    children: caseCategoriesData?.map((item: ICaseCategory) => {
                      return {
                        label: item?.name,
                        value: item?.id,
                        imageUrl: null,
                      };
                    }) as any[],
                  },
                ] ?? []
              }
              isInFilterSection
              dropdownPanelPosition={`bottom`}
              filterBy={CASES_QUEUE_QUERY_PARAM_NAMES.CATEGORIES}
              onApply={(itemsSelected: any) => {
                onChangeFilter({
                  ...QUERY_DATA,
                  ...DEFAULT_PAGE_NUMBER_SIZE,
                  [CASES_QUEUE_QUERY_PARAM_NAMES.CATEGORIES]: itemsSelected,
                });
              }}
              selectedItems={categoriesSelected}
            />
            <DropdownTree
              loading={false}
              items={
                [
                  {
                    label: t("Approval Statuses"),
                    value: "ALL",
                    children: CASE_APPROVAL_STATUS_OPTIONS?.map(
                      (item: { label: string; value: string }) => {
                        return {
                          label: item?.label,
                          value: item?.value,
                          imageUrl: null,
                        };
                      }
                    ) as any[],
                  },
                ] ?? []
              }
              isInFilterSection
              dropdownPanelPosition={`bottom`}
              filterBy={CASES_QUEUE_QUERY_PARAM_NAMES.APPROVAL_STATUSES}
              onApply={(itemsSelected: any) => {
                onChangeFilter({
                  ...QUERY_DATA,
                  ...DEFAULT_PAGE_NUMBER_SIZE,
                  [CASES_QUEUE_QUERY_PARAM_NAMES.APPROVAL_STATUSES]:
                    itemsSelected,
                });
              }}
              selectedItems={approvalStatusesSelected}
            />
          </div>
        }
      >
        <CasesQueueTable
          {...{
            data: casesQueueData?.cases,
            onSortChange: setSortBy,
            paginationOptions: {
              pageSize,
              pageNumber,
              totalItems: casesQueueData?.total ?? 0,
              onChange: onPageChange,
              className: "!p-0 !pt-4",
            },
            sortBy,
            isOpenCasesQueueTab,
          }}
        />
      </WrapperSection>
    </PageWrapper>
  );
};

export default CasesQueueView;

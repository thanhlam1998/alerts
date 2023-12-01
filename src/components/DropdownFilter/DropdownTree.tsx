import { SyncOutlined } from "@ant-design/icons";
import Button from "components/Button";
import FilterIcon from "components/svgs/FilterIcon";
import useOnClickOutside from "hooks/useClickOutside";
import { ValueOf } from "interfaces/common";
import { cloneDeep, compact, flattenDeep, isEmpty, random } from "lodash";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ALERTS_QUEUE_QUERY_PARAM_NAMES,
  ALERT_DETAILS_QUERY_PARAM_NAMES,
  CASES_DETAILS_QUERY_PARAM_NAMES,
  CASES_QUEUE_QUERY_PARAM_NAMES,
  CASE_APPROVAL_STATUS_ENUM,
} from "scripts/constants";
import { trimSpaces } from "scripts/helpers";
import "./DropdownFilter.scss";
import DropdownOption, { STATUSES_DROPDOWN } from "./DropdownOption";

export interface Item {
  label: string | any;
  value: string;
  status?: string;
  children?: { label: any; value: string }[];
}

interface DropdownFilterProps {
  filterBy:
    | ValueOf<typeof ALERTS_QUEUE_QUERY_PARAM_NAMES>
    | ValueOf<typeof CASES_QUEUE_QUERY_PARAM_NAMES>
    | ValueOf<typeof ALERT_DETAILS_QUERY_PARAM_NAMES>
    | ValueOf<typeof CASES_DETAILS_QUERY_PARAM_NAMES>
    | CASE_APPROVAL_STATUS_ENUM;
  items?: Item[];
  value?: string[];
  onApply: (values: string[]) => void;
  className?: string;
  selectedItems?: string[] | undefined;
  dropdownPanelPosition?: "bottom" | "top";
  disabled?: boolean;
  loading?: boolean;
  isInFilterSection?: boolean;
}

const DropdownTree = ({
  className = "",
  filterBy,
  items = [],
  onApply,
  selectedItems = [],
  dropdownPanelPosition = "bottom",
  loading = false,
  disabled = false,
  isInFilterSection = false,
}: DropdownFilterProps) => {
  const wrapperRef = useRef(null);
  const { t } = useTranslation();

  const [optionList, setOptionList] = useState(cloneDeep(items) as any);
  const [values, setValues] = useState<string[]>(selectedItems);
  const [visible, setVisible] = useState(false);

  const LABELS_BY_TYPE: any = {
    [ALERTS_QUEUE_QUERY_PARAM_NAMES.BRANCHES]: t("Branches"),
    [CASES_DETAILS_QUERY_PARAM_NAMES.INCIDENTAL_SUBJECTS_BRANCHES]:
      t("Branches"),
    [CASES_DETAILS_QUERY_PARAM_NAMES.REMOVED_SUBJECTS_BRANCHES]: t("Branches"),

    [ALERT_DETAILS_QUERY_PARAM_NAMES.OPEN_ALERT_CATEGORIES]: t("Categories"),
    [ALERT_DETAILS_QUERY_PARAM_NAMES.CLOSED_ALERT_CATEGORIES]: t("Categories"),

    [CASES_QUEUE_QUERY_PARAM_NAMES.PRIORITIES]: t("Priorities"),
    [CASES_QUEUE_QUERY_PARAM_NAMES.CATEGORIES]: t("Categories"),
    [CASES_QUEUE_QUERY_PARAM_NAMES.APPROVAL_STATUSES]: t("Approval Statuses"),

    nodeView: t("Node View"),
  };

  const onChangeStatus = (itemValue: any, listChild: any, status: any) => {
    const currentList = cloneDeep(optionList);
    const currentOption = currentList.find(
      (it: any) => it?.value === itemValue
    );
    if (currentOption) {
      currentOption.status = status;
      currentOption.children = listChild;
    }
    setOptionList(currentList);
  };

  const onClear = () => {
    setOptionList(transformItems(items, []));
    setValues([]);
  };

  const checker = (arr: any, target: any) => {
    if (isEmpty(target)) {
      return false;
    } else {
      return target.some((v: any) => arr.includes(v));
    }
  };

  const getSelectedValues = (listOption: any) => {
    const selectedValues = cloneDeep(listOption);
    const list = selectedValues?.map((ele: any) => {
      if (ele?.children && ele?.children?.length > 0) {
        if (ele?.status === STATUSES_DROPDOWN.checked) {
          return getSelectedValues(ele?.children);
        } else if (ele?.status === STATUSES_DROPDOWN.indeterminate) {
          return getSelectedValues(ele?.children);
        } else {
          return null;
        }
      } else {
        if (ele?.status === STATUSES_DROPDOWN.checked) {
          return ele?.value;
        } else {
          return null;
        }
      }
    });
    return compact(flattenDeep(list));
  };

  useEffect(() => {
    const values = cloneDeep(optionList);
    setValues(getSelectedValues(values) as string[]);
  }, [optionList]);

  const checkArrContainsAll = (arr: any, target: any) =>
    arr?.every((v: any) => target?.includes(v));

  const transformItems = (list: any, selectedArr: string[]) => {
    const listChanged = list?.map((it: any) => {
      if (!isEmpty(it?.children)) {
        transformItems(it?.children, selectedArr);
        const listValues = cloneDeep(it?.children)?.map((el: any) => el?.value);
        const listChildren = cloneDeep(it?.children);
        if (checker(listValues, selectedArr)) {
          if (checkArrContainsAll(listValues, selectedArr)) {
            it.status = STATUSES_DROPDOWN.checked;
          } else {
            it.status = STATUSES_DROPDOWN.indeterminate;
          }
        } else {
          if (
            listChildren?.some(
              (ele: any) => ele?.status !== STATUSES_DROPDOWN.unchecked
            )
          ) {
            it.status = STATUSES_DROPDOWN.indeterminate;
          } else {
            it.status = STATUSES_DROPDOWN.unchecked;
          }
        }
      } else {
        if (selectedArr?.includes(it?.value)) {
          it.status = STATUSES_DROPDOWN.checked;
        } else {
          it.status = STATUSES_DROPDOWN.unchecked;
        }
      }
      return it;
    });
    return listChanged;
  };

  const transformItemCheckAll = (list: any, selectedArr: string[]) => {
    const listAfterTransform = cloneDeep(transformItems(list, selectedArr));
    const listChange = listAfterTransform?.map((it: any) => {
      if (!isEmpty(it?.children)) {
        if (
          it?.children?.every(
            (el: any) => el?.status === STATUSES_DROPDOWN.checked
          )
        ) {
          it.status = STATUSES_DROPDOWN.checked;
        } else {
          transformItemCheckAll(it?.children, selectedArr);
        }
      }
      return it;
    });

    return listChange;
  };

  useEffect(() => {
    setOptionList(transformItemCheckAll(items, selectedItems));
  }, [visible]);

  useOnClickOutside(wrapperRef, () => setVisible(false));

  const isActive = visible || (!isEmpty(selectedItems) && !isInFilterSection);
  let preIcon;
  if (loading) {
    disabled = true;
    preIcon = <SyncOutlined spin />;
  }

  return (
    <div className={`sm-dropdown-filter ${className}`} ref={wrapperRef}>
      <div
        className={`space-x-3 btn-filter-custom rounded-[4px] border cursor-pointer h-8 flex items-center sm_body_b2_reg border-solid
          ${
            isActive
              ? "bg-blue50 border-blue200 text-blue500"
              : "bg-gray50 border-gray200 text-gray800"
          }
           ${
             disabled
               ? "disabled cursor-not-allowed bg-[#f2f3f4] text-gray400 bg-gray50 border-gray200"
               : ""
           }
      `}
        onClick={() => !disabled && setVisible(!visible)}
      >
        {preIcon && <span className="pl-[16px]">{preIcon}</span>}
        <span
          className={`${loading ? "" : "pl-4"} py-[6px] sm_body_b2_reg flex-1`}
        >
          {LABELS_BY_TYPE[filterBy] ? LABELS_BY_TYPE[filterBy] : filterBy}
        </span>
        <span
          className={`px-2 py-[6px] flex items-center h-8 border border-transparent border-solid border-l-[1px] ${
            isActive ? "border-l-blue200" : "border-l-gray200"
          }
          ${disabled ? "border-l-gray200" : ""}
          `}
        >
          <FilterIcon
            className={`w-4 h-4 ${
              !isEmpty(selectedItems) || visible
                ? "text-blue500 border-blue500"
                : "text-black/25 border-black/25"
            }
            ${disabled ? "bg-[#f2f3f4] text-gray300 border-gray200" : ""}
            `}
          />
        </span>
      </div>
      <div
        id={`dropdown-panel-${filterBy}`}
        className={trimSpaces(`filter-panel bg-white border border-gray200 rounded-xl flex flex-col
      absolute right-0 sm_body_b2_reg ${visible ? "" : "hidden"} ${
          dropdownPanelPosition === "bottom" ? "top-[36px]" : "bottom-[42px]"
        } `)}
      >
        <div className="filter-panel-body">
          {optionList?.map((it: any, index: number) => (
            <DropdownOption
              key={`${JSON.stringify(it)}+${random(111, 9999)}+${index}`}
              item={it}
              changeStatus={onChangeStatus}
              status={it?.status}
            />
          ))}
        </div>
        <div className="divider" />
        <div className="button-group mt-auto p-2">
          <Button
            type="link"
            theme="red"
            size="small"
            onClick={() => onClear()}
          >
            {t("Clear")}
          </Button>
          <Button
            type="primary"
            theme="standard"
            size="small"
            onClick={() => {
              onApply(values);
              setVisible(false);
            }}
          >
            {t("Apply")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(DropdownTree);

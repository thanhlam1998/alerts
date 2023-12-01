import FilterIcon from "components/svgs/FilterIcon";
import useOnClickOutside from "hooks/useClickOutside";
import { includes, isEmpty } from "lodash";
import { memo, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { containsAll, trimSpaces } from "scripts/helpers";
import "./DropdownFilter.scss";
import Button from "components/Button";
import { Checkbox } from "antd";

export interface Item {
  label: string | ReactNode;
  value: string;
  children?: { label: string; value: string }[];
}
interface DropdownFilterProps {
  filterBy: "statuses" | "exceptions";
  items?: Item[];
  value?: string[];
  onApply: (values: string[]) => void;
  className?: string;
  selectedValues: string[] | undefined;
  dropdownPanelPosition?: "bottom" | "top";
  disabled?: boolean;
}

const DropdownFilter = ({
  className = "",
  filterBy,
  items = [],
  onApply,
  selectedValues = [],
  dropdownPanelPosition = "bottom",
  disabled = false,
}: DropdownFilterProps) => {
  const [indeterminate, setIndeterminate] = useState(false);
  const [values, setValues] = useState<string[]>(selectedValues);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();

  const LABELS_BY_TYPE = {
    statuses: t("Status"),
    exceptions: t("Exceptions type"),
  };

  const onChangeCheck = (e: any, value: string) => {
    if (e?.target?.checked) {
      const list = [...values, value];
      setValues(list);
    } else {
      const list = values?.filter((el: string) => el !== value);
      setValues(list);
    }
  };
  
  useEffect(() => {
    const allItemsValue = getAllItemsValue();

    setIndeterminate(
      values?.length > 0 && values?.length < allItemsValue?.length
    );
    setIsCheckAll(
      allItemsValue?.length > 0 &&
        values?.length > 0 &&
        allItemsValue?.length === values?.length
    );
  }, [values]);

  useEffect(() => {
    setValues(selectedValues);
  }, [visible]);

  const getAllItemsValue = () => {
    const allItemsValue: any = [];

    items?.forEach((item: Item) => {
      if (item?.children && item?.children?.length > 0) {
        item?.children?.forEach((child: Item) => {
          allItemsValue?.push(child?.value);
        });
      } else {
        allItemsValue?.push(item?.value);
      }
    });

    return allItemsValue;
  };

  const handleCheckAllOptions = (e: any) => {
    const allItemsValue = getAllItemsValue();
    setValues(e?.target?.checked ? allItemsValue : []);
  };

  useOnClickOutside(wrapperRef, () => setVisible(false));

  const handleSelectAllOfChildrenOptions = (parentOption?: Item, e?: any) => {
    if (e?.target?.checked) {
      const childrenValues: any =
        parentOption?.children?.map((el: Item) => el?.value) ?? [];
      setValues([...new Set([...values, ...childrenValues])]);
    } else {
      setValues(
        values?.filter(
          (val: any) =>
            ![
              ...(parentOption?.children?.map((el: Item) => el?.value) ?? []),
            ]?.includes(val)
        )
      );
    }
  };

  const isActive = visible || !isEmpty(selectedValues);

  return (
    <div className={`${className} sm-dropdown-filter`} ref={wrapperRef}>
      <div
        className={` space-x-3 btn-filter-custom rounded-[4px] border cursor-pointer h-8 flex items-center sm_body_b2_reg border-solid
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
        <span className="pl-4 py-[6px] sm_body_b2_reg">
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
              isActive
                ? "text-blue500 border-blue500"
                : "text-[#00000040] border-[#00000040]"
            }
            ${disabled ? "bg-[#f2f3f4] text-gray300 border-gray200" : ""}
            `}
          />
        </span>
      </div>
      <div
        id={`dropdown-panel-${filterBy}`}
        className={trimSpaces(`filter-panel bg-white border border-gray200 rounded-xl p-4 flex flex-col
      absolute sm_body_b2_reg ${visible ? "" : "hidden"} ${
          dropdownPanelPosition === "bottom" ? "top-[36px]" : "bottom-[42px]"
        } `)}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={handleCheckAllOptions}
          checked={isCheckAll}
        >
          <span className="sm_body_b2_semi capitalize">{filterBy}</span>
        </Checkbox>
        <div className="mt-4 pl-4 flex flex-col space-x-0 space-y-3">
          {items?.map((el: Item) => {
            if (el?.children && el?.children?.length > 0) {
              const allChildrenOptions = el?.children?.map(
                (it: any) => it?.value
              );
              const isParentOptionChecked =
                includes(values, el.value) ||
                containsAll(allChildrenOptions, values);
              const allChildrenOptionsSelected = values?.filter((val?: any) =>
                allChildrenOptions?.includes(val)
              );

              return (
                <div className="" key={el?.value}>
                  <Checkbox
                    indeterminate={
                      allChildrenOptionsSelected?.length > 0 &&
                      allChildrenOptionsSelected?.length <
                        allChildrenOptions?.length
                    }
                    onChange={(e?: any) =>
                      handleSelectAllOfChildrenOptions(el, e)
                    }
                    checked={isParentOptionChecked}
                  >
                    <span className="sm_body_b2_reg">{el?.label}</span>
                  </Checkbox>
                  <div className="pl-6 flex flex-col mt-2">
                    {el?.children?.map((item: Item) => {
                      return (
                        <Checkbox
                          className="pl-0 ml-0 mb-2 last:mb-0"
                          key={item?.value}
                          onChange={(e: any) => onChangeCheck(e, item?.value)}
                          checked={includes(values, item.value)}
                        >
                          <span className="sm_body_b2_reg">{item?.label}</span>
                        </Checkbox>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Checkbox
                key={el?.value}
                onChange={(e: any) => onChangeCheck(e, el?.value)}
                checked={includes(values, el.value)}
              >
                <span className="sm_body_b2_reg">{el?.label}</span>
              </Checkbox>
            );
          })}
        </div>
        <div className="divider" />
        <div className="button-group mt-auto">
          <Button
            type="link"
            theme="red"
            size="small"
            onClick={() => setValues([])}
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

export default memo(DropdownFilter);

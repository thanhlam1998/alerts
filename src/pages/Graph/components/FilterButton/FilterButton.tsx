import { Divider } from "antd";
import Button from "components/Button/Button";
import CheckBox from "components/CheckboxButton";
import FilterButton from "components/FilterButton/FilterButton";
import FilterIcon from "components/svgs/FilterIcon";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./FilterButton.scss";
import useOnClickOutside from "hooks/useClickOutside";

interface FilterDropdownProps {
  dropdownData: {
    key: any;
    label: string;
  }[];
  values: string[];
  title: string;
  onApply: (values: string[]) => void;
  className?: string;
  dropdownWidth?: string | number;
  dropdownContainerClass?: string;
  dropdownContentClass?: string;
}

const FilterDropdown = ({
  dropdownData,
  values = [],
  title,
  onApply,
  className = "",
  dropdownWidth = "100%",
  dropdownContainerClass = "",
  dropdownContentClass = "",
}: FilterDropdownProps) => {
  const { t } = useTranslation();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [filterValues, setFilterValues]: any = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isShowDropdown) setFilterValues([...values]);
  }, [isShowDropdown]);

  useOnClickOutside(wrapperRef, () => {
    setIsShowDropdown(false);
  });

  const onCheck = (status: boolean, key: string) => {
    if (!status) setFilterValues(filterValues?.filter((it: any) => it !== key));
    else {
      filterValues?.push(key);
      setFilterValues([...filterValues]);
    }
  };

  return (
    <div className={`bri-filter-button ${className}`} ref={wrapperRef}>
      <FilterButton
        title={title}
        // className={`${filterValues?.length && "active"}`}
        theme="with-icon"
        onClick={() => setIsShowDropdown(!isShowDropdown)}
        icon={<FilterIcon className={values?.length > 0 ? "text-blue500" : ""} />}
      />

      {isShowDropdown && (
        <div
          className={`absolute z-10 bg-white bri-filter-button-dropdown-list ${dropdownContainerClass}`}
          style={{ width: dropdownWidth }}
        >
          <div className={`p-4 pb-0 ${dropdownContentClass}`}>
            {dropdownData?.map((it, index: number) => (
              <CheckBox
                onChange={(status) => onCheck(status, it.key)}
                size="sm"
                className="mb-2"
                key={index}
                checked={filterValues?.includes(it?.key)}
                label={it?.label}
              />
            ))}
          </div>

          <Divider style={{ margin: 0 }} />
          <div className="flex flex-row justify-end p-2">
            <Button
              onClick={() => {
                setIsShowDropdown(false);
                onApply([]);
              }}
              className="mr-2"
              type="text"
              theme="red"
              size="small"
            >
              {t("Clear")}
            </Button>
            <Button
              onClick={() => {
                setIsShowDropdown(false);
                onApply(filterValues);
              }}
              type="primary"
              theme="standard"
              size="small"
            >
              {t("Apply")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

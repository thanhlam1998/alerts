import ArrowDown from "components/svgs/ChevronDown";
import Check from "components/svgs/Check";
import LoadingIcon from "./LoadingIcon";
import React from "react";
import { APP_PREFIX } from "scripts/constants";
import { emptyFunction, isValidUrl, trimSpaces } from "../../scripts/helpers";
import { LabeledValue } from "antd/lib/select";
import { ConfigProvider, Select as AntdSelect } from "antd";
import enAntd from "antd/lib/locale/en_US";
import "./Select.scss";

const componentName = "select";
const componentClassNamePrefix = `${APP_PREFIX}-${componentName}`;

const { Option } = AntdSelect;
interface OptionType {
  icon?: string | React.ReactNode;
  label: any;
  value: string | number;
  disabled?: boolean;
}

type SelectValue =
  | string
  | string[]
  | number
  | number[]
  | LabeledValue
  | LabeledValue[];

export interface SelectProps {
  /**
   * ClassName of select
   */
  className?: string;
  /**
   * Full width select or not
   */
  block?: boolean;
  /**
   * Whether disable or not
   */
  disabled?: boolean;
  /**
   * Indicate loading state
   */
  loading?: boolean;
  /**
   * Whether use multiple mode or not
   */
  multiple?: boolean;
  /**
   * Control open state of dropdown
   */
  open?: boolean;
  /**
   * Select options
   */
  options?: OptionType[];
  /**
   * Placeholder of select
   */
  placeholder?: React.ReactNode;
  /**
   * The position where the selection box pops up
   */
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  /**
   * Size of select input
   */
  size?: "middle" | "large" | "extra-large";
  /**
   * Current selected option
   */
  value?: SelectValue;
  /**
   * Initial selected option
   */
  defaultValue?: SelectValue;
  /**
   * Whether select is searchable
   */
  showSearch?: boolean;
  /**
   * The custom suffix icon
   */
  suffixIcon?: React.ReactNode;
  /**
   * ClassName of the dropdown
   */
  dropdownClassName?: string;
  /**
   * Called when select an option or input value change
   */
  onChange?: any;
  /**
   * Config popup height
   */
  listHeight?: number;
  /**
   * Placeholder content when there is no value
   */
  notFoundContent?: React.ReactNode;
  /**
   * Whether show arrow icon
   */
  showArrow?: boolean;
  /**
   * Parent Node which the selector should be rendered to. Default to body
   * This used to fix position change when scrolling if it happen
   */
  getPopupContainer?: (props: any) => HTMLElement;
  /**
   * Locale object
   */
  locale?: any;
  allowClear?: boolean;
  onClear?: (va: any) => void;
}
const Select = ({
  className = "",
  block = false,
  size = "middle",
  placeholder = "",
  options = [],
  showSearch = false,
  placement = "bottomLeft",
  loading = false,
  suffixIcon = <ArrowDown />,
  dropdownClassName = "",
  onChange = emptyFunction,
  multiple = false,
  locale,
  disabled,
  ...rest
}: SelectProps) => {
  const isExtraLarge = size === "extra-large";

  return (
    <ConfigProvider locale={locale ?? enAntd}>
      <AntdSelect
        {...{
          className: trimSpaces(
            `${APP_PREFIX} ${componentClassNamePrefix} ${
              block ? `${componentClassNamePrefix}__block` : ""
            } ${isExtraLarge ? "ant-select-xl" : ""} ${className}`
          ),
          placeholder,
          suffixIcon: !loading ? (
            suffixIcon
          ) : (
            <LoadingIcon className="animate-spin mr-2 h-[10px] w-[10px]" />
          ),
          loading,
          size: isExtraLarge ? "large" : size,
          mode: multiple ? "multiple" : undefined,
          placement,
          showSearch,
          optionFilterProp: "children",
          filterOption: (input: any, option: any) => {
            // Because in the Option children, we have 2 span tags. children[1] => span.console-select__item-label
            return (
              option?.children?.[1]?.props?.children
                ?.toLowerCase()
                ?.indexOf(input?.toLowerCase()) >= 0
            );
          },
          // getPopupContainer: (trigger) => trigger.parentNode,
          popupClassName: trimSpaces(
            `${APP_PREFIX} ${componentClassNamePrefix}__dropdown ${dropdownClassName}`
          ),
          menuItemSelectedIcon: <Check />,
          onChange,
          dropdownStyle: { width: "100%" },
          disabled,
          ...rest,
        }}
      >
        {options?.map((option: OptionType, index: number) => {
          return (
            <Option
              key={index}
              {...{ value: option.value, disabled: option.disabled }}
              className={trimSpaces(
                `${componentClassNamePrefix}__item ${
                  option?.icon ? "has-icon" : ""
                }`
              )}
            >
              {option?.icon && (
                <span className={`${componentClassNamePrefix}__item-icon`}>
                  {typeof option?.icon === "string" &&
                  isValidUrl(option?.icon) ? (
                    <img src={option?.icon} />
                  ) : (
                    option.icon
                  )}
                </span>
              )}
              <span className={`${componentClassNamePrefix}__item-label`}>
                {option.label}
              </span>
            </Option>
          );
        })}
      </AntdSelect>
    </ConfigProvider>
  );
};

Select.defaultProps = {};

export default Select;

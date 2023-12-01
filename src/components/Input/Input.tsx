import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import React, { ReactNode } from "react";
import { emptyFunction, trimSpaces } from "scripts/helpers";
import "./Input.scss";

interface InputProps extends AntdInputProps {
  wrapperClassName?: string;
  className?: string;
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  allowClear?: boolean | any;
  bordered?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  status?: "error" | "warning";
  prefix?: ReactNode;
  size?: "large" | "middle" | "small";
  suffix?: ReactNode;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export enum INPUT_STATUSES {
  error = "error",
  warning = "warning",
}

export enum INPUT_SIZES {
  large = "large",
  middle = "middle",
  small = "small",
}

const Input = ({
  wrapperClassName = "",
  className = "",
  addonAfter = null, // The label text displayed after (on the right side of) the input field
  addonBefore = null, // The label text displayed before (on the left side of) the input field
  allowClear = false, // If allow to remove input content with clear icon
  bordered = true, // Whether has border style
  defaultValue = "", // The initial input content
  disabled = false, //Whether the input is disabled
  id = "", //The ID for input
  maxLength, //The max length
  status, //Set validation status
  prefix = null, //The prefix icon for the Input
  size = INPUT_SIZES.middle,
  suffix = null, //The suffix icon for the Input
  type = "text", //The type of input
  value, //	The input content value
  placeholder = "",
  onChange = emptyFunction, //	Callback when user input
  onPressEnter = emptyFunction, // The callback function that is triggered when Enter key is pressed
  ...rest
}: InputProps) => {
  const renderAntdClassName = () => {
    const antdClassName = `${className} ${
      addonAfter && addonBefore
        ? "addons-on-both"
        : addonAfter
        ? "addon-after"
        : addonBefore
        ? "addon-before"
        : ""
    } ${(addonAfter || addonBefore) && disabled ? "ant-input-group-wrapper-disabled" : ""} ${
      (addonAfter || addonBefore) && (prefix || suffix) ? "addon-fix" : ""
    }`;

    return trimSpaces(antdClassName);
  };

  return (
    <div className={`bri-input ${wrapperClassName}`}>
      <AntdInput
        {...{
          addonAfter,
          addonBefore,
          allowClear,
          bordered,
          defaultValue,
          disabled,
          id,
          maxLength,
          status,
          prefix,
          size,
          suffix,
          type,
          value,
          placeholder,
          onChange,
          onPressEnter,
          className: renderAntdClassName(),
          ...rest,
        }}
      />
    </div>
  );
};

export default Input;

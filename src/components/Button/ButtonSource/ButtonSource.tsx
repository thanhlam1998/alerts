import React from "react";
import "./ButtonSource.scss";
import { Button as AntdButton } from "antd";
import { emptyFunction, trimSpaces } from "scripts/helpers";

export const BUTTON_SOURCE_TYPES = {
  default: "default",
  outline: "outline",
} as const;

export const BUTTON_SOURCE_SIZES = {
  default: "default",
  large: "large",
} as const;

interface ButtonSourceProps {
  className?: string;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "default" | "outline";
  block?: boolean;
  size?: "default" | "large";
  disabled?: boolean;
  allowHover?: boolean;
}

const ButtonSource = ({
  className = "",
  onClick = emptyFunction,
  title,
  subTitle,
  iconLeft,
  iconRight,
  type = BUTTON_SOURCE_TYPES.default,
  block = false,
  size = BUTTON_SOURCE_SIZES.default,
  disabled = false,
  allowHover = true, // Allow hover, focus state
}: ButtonSourceProps) => {
  return (
    <AntdButton
      {...{
        className: trimSpaces(
          trimSpaces(
            `console-source-button console-source-button-type-${type} console-source-button-size-${size} ${
              allowHover ? "allow-hover" : "not-allow-hover"
            } ${subTitle ? "has-sub-title" : ""} ${className}`
          )
        ),
        onClick,
        block,
        disabled,
      }}
    >
      <div className="console-source-button__wrapper">
        <div className="console-source-button__left">
          {iconLeft && (
            <div className="console-source-button__left-icon">{iconLeft}</div>
          )}
          <div className="console-source-button__left-content">
            <span className="title">{title}</span>
            {subTitle && <span className="sub-title">{subTitle}</span>}
          </div>
        </div>
        {iconRight && (
          <div className="console-source-button__right">{iconRight}</div>
        )}
      </div>
    </AntdButton>
  );
};

export default ButtonSource;

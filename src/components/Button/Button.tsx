import { Button as AntdButton } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";
import { APP_PREFIX } from "../../scripts/constants";
import { emptyFunction, trimSpaces } from "../../scripts/helpers";
import "./Button.scss";

const componentClassNamePrefix = `bri-button`;

export interface ButtonProps {
  /**
   * The class name of the button
   */
  className?: string;
  /**
   * The theme color of the button. The standard theme uses blue color to the primary color
   */
  theme?: "standard" | "red" | "green";
  /**
   * The type of the button. Can be set to
   */
  type?: "default" | "primary" | "dashed" | "link" | "text";
  /**
   * Set the size of button
   */
  size?: SizeType | "extra-large";
  /**
   * Option to fit button width to its parent width
   */
  block?: boolean;
  /**
   * Disabled state of button
   */
  disabled?: boolean;
  /**
   * Disabled state of button
   */
  href?: string;
  /**
   * Set the original html type of button
   */
  htmlType?: ButtonHTMLType;
  /**
   * 	Set the icon component of button
   */
  icon?: React.ReactNode;
  /**
   * 	Set the loading status of button
   */
  loading?: boolean;
  /**
   * 	Set the square to true if you want a square button
   */
  square?: boolean;
  /**
   * 	Same as target attribute of a, works when href is specified
   */
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
  children?: React.ReactNode;
  /**
   * 	Set the handler to handle click event
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  autoFocus?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
}

const Button = (props: ButtonProps) => {
  const {
    className = "",
    theme = "standard",
    type = "default",
    size = "middle",
    block = false,
    disabled = false,
    href,
    htmlType = "button",
    icon,
    loading = false,
    square = false,
    target,
    children,
    onClick = emptyFunction,
    ...rest
  } = props;

  const isExtraSize = size === "extra-large";

  return (
    <AntdButton
      {...{
        ...rest,
        block,
        disabled,
        href,
        htmlType,
        icon,
        loading,
        size: isExtraSize ? "large" : size,
        ...(href && target ? { target } : {}),
        type,
        children,
        className: trimSpaces(
          `${componentClassNamePrefix} ${componentClassNamePrefix}-theme-${theme} ${componentClassNamePrefix}__type-${type} ${componentClassNamePrefix}__size-${size} ${className} ${
            square ? `${componentClassNamePrefix}__square` : ""
          } ${loading ? `${componentClassNamePrefix}__loading` : ""} ${
            icon ? `${componentClassNamePrefix}__has-icon` : ""
          }`,
        ),
        onClick,
        "data-size": size,
      }}
    />
  );
};

Button.defaultProps = {
  className: undefined,
  theme: "standard",
  type: "default",
  size: "middle",
  block: false,
  disabled: false,
  href: undefined,
  htmlType: "button",
  icon: undefined,
  loading: false,
  square: false,
  target: undefined,
  onClick: emptyFunction,
};

export default Button;

import React from "react";
import { emptyFunction } from "scripts/helpers";
import "./FilterButton.scss";
import { SyncOutlined } from "@ant-design/icons";

export const BUTTON_THEMES = {
  withIcon: "with-icon",
  primary: "primary",
  redText: "red-text",
};

const FilterButton = ({
  title = "",
  onClick = emptyFunction,
  type = "",
  icon = undefined,
  className = "",
  theme = "primary",
  disable = false,
  preIcon = undefined,
  titleClass = "",
  loading = false,
}: {
  title: string;
  onClick?: (e: string) => void;
  type?: string;
  icon?: JSX.Element;
  className?: string;
  theme?: "with-icon" | "primary" | "red-text";
  disable?: boolean;
  preIcon?: JSX.Element;
  titleClass?: string;
  loading?: boolean;
}) => {
  // THIS BUTTON IS TEMPORARY UNTIL WE UPDATE THE DROPDOWN COMPONENT
  if (loading) {
    disable = true;
    preIcon = <SyncOutlined spin />;
  }
  return (
    <button
      className={`sm-button sm-button-theme-${theme} ${className}  `}
      onClick={() => onClick(type)}
      disabled={disable}
    >
      {preIcon && <span className="pl-[16px]">{preIcon}</span>}
      <span className={`whitespace-nowrap mx-3 sm_body_b2_reg sm-button-title ${titleClass}`}>
        {title}
      </span>
      {icon && <span className="sm-button--icon">{icon}</span>}
    </button>
  );
};

export default FilterButton;

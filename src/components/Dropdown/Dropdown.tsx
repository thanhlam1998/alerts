import React from "react";
import { Dropdown as DropdownAnt, MenuProps } from "antd";
import "./Dropdown.scss";

const Dropdown = ({
  children,
  menu,
  className = "",
  disabled = false,
}: {
  menu: MenuProps;
  children: any;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <DropdownAnt
      disabled={disabled}
      className={`${className}`}
      overlayClassName={`bri-dropdown`}
      trigger={["click"]}
      menu={menu}
    >
      {children}
    </DropdownAnt>
  );
};

export default Dropdown;

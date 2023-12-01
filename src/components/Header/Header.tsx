import BackV2 from "components/svgs/BackV2";
import { ReactNode } from "react";
import React from 'react'

interface HeaderProps {
  title: string | ReactNode;
  rightContent?: ReactNode;
  className?: string;
  onClick?: () => void;
  showBackIcon?: boolean;
}

export const Header = ({
  title,
  rightContent,
  className = "",
  onClick,
  showBackIcon = true,
}: HeaderProps) => {
  return (
    <div className={`header-component flex flex-row items-center justify-between ${className}`}>
      <div className="header-left flex flex-row items-center">
        {showBackIcon && <BackV2 className="mr-[16px] cursor-pointer" onClick={onClick} />}
        <div className="sm_title_t1_semi ">{title}</div>
      </div>
      <div className="header-right">{rightContent}</div>
    </div>
  );
};

export default Header;

import Close from "components/svgs/Close";
import React from "react";
import { emptyFunction } from "scripts/helpers";

const BaseDrawer = ({
  titleIcon = null,
  title = "",
  onClose = emptyFunction,
  children = null,
  customFooter = null,
  className = "",
  isOpen = false,
  loading = false,
}: any) => {
  return (
    <div
      className={`base-drawer shadow-md w-[320px] h-full bg-white absolute top-0 ${
        isOpen ? "right-0" : "right-[-350px]"
      } flex flex-col ${className} transition-all`}
    >
      <div className="base-drawer__header flex justify-between p-4 gap-2">
        <div className="base-drawer__header-title flex items-center gap-4">
          {titleIcon && <span className="inline-flex">{titleIcon}</span>}
          <span className="sm_sub_title_semi">{title}</span>
        </div>
        <div className="base-drawer__header-close-icon">
          <Close
            onClick={() => !loading && onClose()}
            className="cursor-pointer w-4 h-4 text-[#1F2937]"
          />
        </div>
      </div>
      <div className="base-drawer__body flex-1 overflow-y-auto p-4">{children}</div>
      {customFooter && <div className="base-drawer__footer">{customFooter}</div>}
    </div>
  );
};

export default BaseDrawer;

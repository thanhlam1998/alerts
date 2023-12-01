import Header from "components/Header";
import Loading from "components/Loading";
import { trimSpaces } from "scripts/helpers";
import "./WrapperSection.scss";
import React from "react";
import { Spin } from "antd";

interface OverviewSectionProps {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  rightHeaderContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  id?: string;
  borderType?: "border" | "shadow";
  contentClassName?: string;
  collapse?: boolean;
  loaderClassName?: string;
}

const WrapperSection = ({
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  title = "",
  icon = null,
  rightHeaderContent,
  footerContent,
  children,
  loading = false,
  id = "",
  borderType = "shadow",
  contentClassName = "",
  collapse = false,
  loaderClassName,
}: OverviewSectionProps) => {
  return (
    <div
      id={id}
      className={trimSpaces(
        `wrapper-section wrapper-section-${borderType} ${className}`
      )}
    >
      <Header
        className={trimSpaces(
          `wrapper-section__header ${
            collapse ? "mb-0" : "mb-4"
          } ${headerClassName}`
        )}
        showBackIcon={false}
        title={
          <div className="wrapper-section__header-left flex items-center">
            {icon && (
              <div className="wrapper-section__header-left-icon mr-[12px] flex items-center justify-center">
                {icon}
              </div>
            )}
            <div className="wrapper-section__header-left-title">{title}</div>
          </div>
        }
        rightContent={rightHeaderContent}
      />
      <div
        className={`wrapper-section__content min-h-[inherit] transition-all  ${
          collapse ? "!h-0 overflow-hidden" : ""
        } ${contentClassName}`}
      >
        {loading ? (
          <div
            className={`flex items-center justify-center w-full h-full min-h-[inherit] p-[30px_0px] ${loaderClassName}`}
          >
            <Spin />
          </div>
        ) : (
          <>
            <div
              className={trimSpaces(`wrapper-section__body ${bodyClassName}`)}
            >
              {children}
            </div>
          </>
        )}
        {footerContent && (
          <div
            className={trimSpaces(`wrapper-section__footer ${footerClassName}`)}
          >
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default WrapperSection;

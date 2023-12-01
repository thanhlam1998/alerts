import { Breadcrumb } from "antd";
import React, { FC } from "react";
import "./PageWrapper.scss";

interface IBreadcrumbItem {
  href?: string;
  title: string | React.ReactNode;
}

interface IPageWrapper {
  breadcrumbItems?: IBreadcrumbItem[];
  children?: any;
  className?: string;
}

const PageWrapper: FC<IPageWrapper> = ({
  breadcrumbItems = [],
  children,
  className = "",
}) => {
  return (
    <div className={`page-wrapper flex flex-col gap-4 ${className}`}>
      <div className="page-wrapper__breadcrumb">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="page-wrapper__content">{children}</div>
    </div>
  );
};

export default PageWrapper;

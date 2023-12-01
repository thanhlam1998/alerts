import React, { useEffect, useState } from "react";
import { Pagination as PaginationAnt } from "antd";
import "./Pagination.scss";
import { convertToDisplay } from "../../scripts/helpers";
import { APP_PREFIX } from "scripts/constants";
import { Trans } from "react-i18next";

const componentName = "pagination";
const componentClassNamePrefix = `${APP_PREFIX}-${componentName}`;

export interface ConsolePaginationProps {
  size?: "small" | "default";
  showTotalItem?: boolean;
  showQuickJumper?: boolean;
  disabled?: boolean;
  current?: number;
  total?: number;
  className?: string;
  onChange: (page: number, pageSize: number) => void;
  pageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
}

const defaultProps = {
  size: "default",
  showTotalItem: false,
  showQuickJumper: false,
  disabled: false,
  current: 1,
  total: 1,
};

const Pagination = ({
  total = 1,
  size = "default",
  showTotalItem = false,
  showQuickJumper = false,
  disabled = false,
  current = 1,
  onChange,
  className = "",
  showSizeChanger = true,
  pageSize = 10,
  pageSizeOptions = ["10", "20", "50", "100"],
}: ConsolePaginationProps) => {
  const [pageIndex, setPageIndex] = useState(current);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  useEffect(() => {
    if (current > Math.ceil(total / pageSize)) {
      setPageIndex(1);
      setCurrentPageSize(
        pageSizeOptions?.includes(pageSize?.toString()) ? pageSize : +pageSizeOptions?.[0],
      );
      onChange(
        1,
        pageSizeOptions?.includes(pageSize?.toString()) ? pageSize : +pageSizeOptions?.[0],
      );
    } else {
      setPageIndex(current);
      setCurrentPageSize(
        pageSizeOptions?.includes(pageSize?.toString()) ? pageSize : +pageSizeOptions?.[0],
      );
      if (!pageSizeOptions?.includes(pageSize?.toString())) {
        onChange(current, +pageSizeOptions?.[0]);
      }
    }
  }, [current, pageSize]);

  return (
    <PaginationAnt
      showSizeChanger={showSizeChanger}
      className={`${APP_PREFIX} ${componentClassNamePrefix} ${className}`}
      showQuickJumper={showQuickJumper}
      showTotal={(total) =>
        showTotalItem ? (
          total > 1 ? (
            <Trans
              defaults={`Total {{value}} items`}
              values={{ value: convertToDisplay(total) }}
            />
          ) : (
            <Trans
              defaults={`Total {{value}} item`}
              values={{ value: convertToDisplay(total) }}
            />
          )
        ) : (
          ""
        )
      }
      locale={{ page: "" }}
      itemRender={(page, type, originalElement) => {
        if (type === "page") {
          return <a>{convertToDisplay(page)}</a>;
        }
        return originalElement;
      }}
      {...{
        current: pageIndex,
        disabled,
        total,
        size,
        onChange,
        pageSize: currentPageSize,
        pageSizeOptions,
      }}
    />
  );
};

Pagination.defaultProps = {
  ...defaultProps,
};

export default Pagination;

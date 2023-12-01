import cx from "classnames";
import { FC } from "react";
import { Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import "./TableV2.scss";

interface TableV2Props extends TableProps<any> {}

const TableV2: FC<TableV2Props> = ({ className, pagination, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Table
      className={cx("bri-table", className)}
      pagination={
        pagination === false
          ? false
          : {
              ...pagination,
            }
      }
      {...rest}
    />
  );
};

export default TableV2;

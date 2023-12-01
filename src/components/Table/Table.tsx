import { Table as TableAnt } from "antd";
import type { ColumnsType } from "antd/es/table";
import Pagination from "components/Pagination";
import { DEFAULT_PAGE_SIZE } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./Table.scss";

interface ITableProps {
  columns: ColumnsType<any>;
  data: any[];
  onChange?: any;
  loading?: boolean;
  onRow?: any;
  rowSelection?: any;
  rowClassName?: string;
  showPagination?: boolean;
  paginationOptions?: IPaginationProps;
  className?: string;
}

export interface IPaginationProps {
  className?: string;
  pageNumber: number;
  pageSize: number;
  onChange?: any;
  totalItems?: number;
}

const Table = ({
  columns,
  data,
  onChange = emptyFunction,
  loading = false,
  onRow,
  rowSelection,
  rowClassName = "",
  showPagination = true,
  paginationOptions,
  className = "",
  ...rest
}: ITableProps) => {
  return (
    <div className={`bri-table ${className}`}>
      <div className="bri-table__content">
        <TableAnt
          rowKey={(record) => record?.key}
          rowClassName={`table-bri-row ${rowClassName}`}
          className="table-bri-system"
          dataSource={data}
          pagination={false}
          sortDirections={["ascend", "descend"]}
          {...{ columns, onChange, loading, onRow, rowSelection }}
          {...rest}
        />
      </div>
      {showPagination && (
        <div
          className={`bri-table__pagination p-2 flex items-center justify-end ${
            paginationOptions?.className ?? ""
          }`}
        >
          <Pagination
            current={+(paginationOptions?.pageNumber ?? 1)}
            pageSize={+(paginationOptions?.pageSize ?? DEFAULT_PAGE_SIZE)}
            onChange={paginationOptions?.onChange ?? emptyFunction}
            total={+(paginationOptions?.totalItems ?? 0)}
            showTotalItem
            showQuickJumper
          />
        </div>
      )}
    </div>
  );
};
export default Table;

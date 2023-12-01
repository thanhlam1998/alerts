import queryString from "query-string";
import { useLocation } from "react-router-dom";

interface usePaginationProps {
  defaultPage?: number;
  defaultPageSize?: number;
  /**
   * Get page by other query name, default: page
   */
  pagePropsName?: string;
  /**
   * Get page size by other query name, default: pageSize
   */
  pageSizePropsName?: string;
}

const usePagination = ({
  defaultPage = 1,
  defaultPageSize = 10,
  pagePropsName = "page_number",
  pageSizePropsName = "page_size",
}: usePaginationProps = {}) => {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const page = query[pagePropsName];
  const pageSize = query[pageSizePropsName];
  const pageParse = page ? +page : defaultPage;
  const pageSizeParse = pageSize ? +pageSize : defaultPageSize;
  return { page: pageParse, pageSize: pageSizeParse };
};

export default usePagination;

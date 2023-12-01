import { UserApis } from "apis";
import useSearchParams from "hooks/useSearchParams";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "scripts/constants";
import ManageUsersView from "./ManageUsersView";

const ManageUsersContainer = () => {
  const QUERY_DATA = useSearchParams();

  const { pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } =
    QUERY_DATA;

  const [sort, setSort] = useState<any>({});

  const {
    isLoading,
    isFetching,
    data: userListResp,
    refetch: refetchUserList,
  } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.USER.GET_USER_LIST,
      pageIndex,
      pageSize,
      sort,
    ],
    () => {
      const sortParams = { ...sort };

      if (sortParams?.name !== undefined) {
        sortParams.firstName = sortParams?.name;
        sortParams.lastName = sortParams?.name;

        delete sortParams?.name;
      }

      return UserApis.getUserList({
        paging: {
          pageNumber: +pageIndex,
          pageSize: +pageSize,
        },
        sort: sortParams,
      });
    },
    {}
  );

  const updateSort = (values: any) => {
    setSort({ ...values });
  };

  return (
    <ManageUsersView
      {...{
        loading: isLoading || isFetching,
        totalItems: userListResp?.data?.total ?? 0,
        userList: userListResp?.data?.users ?? [],
        refetchUserList,
        sort,
        updateSort,
      }}
    />
  );
};

export default ManageUsersContainer;

import { Avatar } from "antd";
import { ColumnsType } from "antd/es/table";
import Button from "components/Button";
import Delete from "components/svgs/Delete";
import Eye from "components/svgs/Eye";
import Restore from "components/svgs/Restore";
import Table from "components/Table";
import { UserProps } from "interface/User";
import { isArray } from "lodash";
import { UserActionEnum, UserActionPrivilegeMap } from "pages/ManageUsers/ManageUsersView";
import { FC } from "react";
import { getUserRolLabel, USER_ROLES } from "scripts/constants";
import {
  emptyFunction,
  getRedux,
  getShortUserName,
  getTableSort,
} from "scripts/helpers";

interface IUserListProps {
  data: UserProps[];
  onEditUser: (user: UserProps) => void;
  onDeleteUser: (user: UserProps) => void;
  onRestoreUser: (user: UserProps) => void;
  updateSort: any;
  sort: any;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onPageChange: any;
  privilegeMap: UserActionPrivilegeMap,
}

const UserList: FC<IUserListProps> = ({
  data = [],
  onEditUser = emptyFunction,
  onDeleteUser = emptyFunction,
  onRestoreUser = emptyFunction,
  updateSort = emptyFunction,
  sort,
  pageIndex,
  pageSize,
  totalItems,
  onPageChange = emptyFunction,
  privilegeMap = {},
}) => {
  const { email: currentEmail } = getRedux("auth.currentUser", {});

  const columns: ColumnsType<UserProps> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (role, rowInfo) => (
        <div className="flex items-center">
          <Avatar
            className="mr-2"
            size={24}
            style={{
              backgroundColor: "#6085FF",
              color: "#ffffff",
              fontSize: "9px",
            }}
            src={rowInfo?.profilePictureUrl}
          >
            {getShortUserName(rowInfo?.firstName, rowInfo?.lastName)}
          </Avatar>
          <span>{`${rowInfo?.firstName} ${
            rowInfo?.lastName ? rowInfo?.lastName : ""
          }`}</span>
        </div>
      ),
      sorter: {
        compare: (a: UserProps, b: UserProps) => {
          const name = [a.firstName, a.lastName].join(" ");
          const secondName = [b.firstName, b.lastName].join(" ");
          return name.localeCompare(secondName);
        },
        multiple: 1,
      },
      sortOrder: getTableSort(sort?.name),
    },
    {
      title: "Username",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a: UserProps, b: UserProps) =>
          a?.email?.localeCompare(b?.email ?? "") ?? 1,

        multiple: 1,
      },
      sortOrder: getTableSort(sort?.email),
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "role",
      render: (role: USER_ROLES) => {
        return getUserRolLabel(role);
      },
      sorter: {
        compare: (a: UserProps, b: UserProps) =>
          a?.role?.localeCompare(b?.role ?? "") ?? 1,
        multiple: 1,
      },
      sortOrder: getTableSort(sort?.role),
    },
    {
      title: "",
      key: "action",
      width: 130,
      render: (_, row: UserProps) =>
        currentEmail !== row?.email ? (
          <div>
            {/* REASON: Remove this feature because TG manage fixed user account
            <Button
              onClick={() => onRestoreUser(row)}
              className="p-[6px]"
              type="text"
            >
              <Restore />
            </Button>
              */}
            {privilegeMap[UserActionEnum.DELETE] ? (
              <Button
                onClick={() => onDeleteUser(row)}
                className="p-[6px]"
                theme="red"
                type="text"
              >
                <Delete />
              </Button>
            ) : null}
             {privilegeMap[UserActionEnum.EDIT] ? (
                <Button
                  onClick={() => onEditUser(row)}
                  className="p-[6px]"
                  type="text"
                >
                  <Eye className="w-4 h-4" />
                </Button>
             ) : null}
          </div>
        ) : (
          <></>
        ),
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any) => {

    sorter = !isArray(sorter) ? [sorter] : sorter;
    let sortParams: any = {};

    sorter?.forEach((sort: any) => {
      sortParams[sort.field] =
        sort?.order === "ascend"
          ? 1
          : sort?.order === "descend"
          ? 0
          : undefined;
    });

    updateSort(sortParams);
  };

  return (
    <Table
      columns={columns}
      data={(data || [])?.map((it: UserProps, index: number) => ({
        ...it,
        key: index,
      }))}
      onChange={onChange}
      paginationOptions={{
        pageNumber: pageIndex,
        pageSize,
        onChange: onPageChange,
        totalItems,
      }}
    />
  );
};

export default UserList;

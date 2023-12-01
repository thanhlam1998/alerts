import Button from "components/Button";
import PageWrapper from "components/PageWrapper/PageWrapper";
import WrapperSection from "components/WrapperSection";
import Add from "components/svgs/Add";
import Home from "components/svgs/Home";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { UserProps } from "interface/User";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, USER_ROLES } from "scripts/constants";
import { emptyFunction, getRedux } from "scripts/helpers";
import AddUserModal from "./components/AddUserModal";
import ModalDeleteUser from "./components/ModalDeleteUser";
import ModalResetPasswordUser from "./components/ModalResetPasswordUser";
import UserDetailModal from "./components/UserDetailModal";
import UserList from "./components/UserList";

interface IManageUsersViewProps {
  loading: boolean;
  userList: UserProps[];
  totalItems: number;
  refetchUserList: () => void;
  updateSort: any;
  sort: any;
}

type TManageUserAction = "ADD" | "DELETE" | "RESET_PASSWORD" | "UPDATE" | null;

export enum UserActionEnum {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export type UserActionPrivilegeMap = {
  [UserActionEnum.CREATE]?: boolean;
  [UserActionEnum.EDIT]?: boolean;
  [UserActionEnum.DELETE]?: boolean;
}

const ManageUsersView: FC<IManageUsersViewProps> = ({
  loading,
  userList,
  totalItems,
  refetchUserList = emptyFunction,
  updateSort,
  sort,
}) => {
  const { t } = useTranslation();
  const onChangeFilter = useOnChangeFilter();
  const QUERY_DATA: any = useSearchParams();
  const currentUser = getRedux(`auth.currentUser`, {});

  const { pageIndex = DEFAULT_PAGE_INDEX, pageSize = DEFAULT_PAGE_SIZE } =
    QUERY_DATA;

  const [manageUser, setManageUser] = useState<{
    isOpen: boolean;
    action: TManageUserAction;
    userSelected: UserProps | null;
  }>({
    isOpen: false,
    action: null,
    userSelected: null,
  });

  const onPageChange = (pageIndex?: number, pageSize?: number) => {
    onChangeFilter({
      ...QUERY_DATA,
      pageIndex,
      pageSize,
    });
  };

  const onEditUser = (user: UserProps) => {
    setManageUser({
      action: "UPDATE",
      userSelected: user,
      isOpen: true,
    });
  };

  const onDeleteUser = (user: UserProps) => {
    setManageUser({
      action: "DELETE",
      userSelected: user,
      isOpen: true,
    });
  };

  const onRestoreUser = (user: UserProps) => {
    setManageUser({
      action: "RESET_PASSWORD",
      userSelected: user,
      isOpen: true,
    });
  };

  const resetManageUser = () => {
    setManageUser({
      isOpen: false,
      action: null,
      userSelected: null,
    });
  };

  const getAvailableActionsByRole = (role: string): UserActionPrivilegeMap => {
    switch (role) {
      case USER_ROLES.MAKER: 
        return {
          [UserActionEnum.CREATE]: false,
          [UserActionEnum.EDIT]: false,
          [UserActionEnum.DELETE]: false,
        }
      case USER_ROLES.CHECKER: 
        return {
          [UserActionEnum.CREATE]: true,
          [UserActionEnum.EDIT]: true,
          [UserActionEnum.DELETE]: true,
        }
      case USER_ROLES.SIGNER: 
        return {
          [UserActionEnum.CREATE]: true,
          [UserActionEnum.EDIT]: true,
          [UserActionEnum.DELETE]: true,
        }
      default:
        return {}
    }
  }

  const privilegeMap = getAvailableActionsByRole(currentUser.role);

  return (
    <PageWrapper
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "#",
          title: t("Administration"),
        },
        {
          href: "/users",
          title: t("Users"),
        },
      ]}
    >
      <div className="manage-users">
        <div className="manage-users__wrapper flex flex-col gap-4">
          <WrapperSection
            title={t("Users")}
            className="manage-users__header pl-4"
            headerClassName="!mb-0"
            rightHeaderContent={
              privilegeMap[UserActionEnum.CREATE] ? (
                <Button
                  type="primary"
                  onClick={() =>
                    setManageUser({
                      isOpen: true,
                      action: "ADD",
                      userSelected: null,
                    })
                  }
                  icon={<Add className="w-4 h-4" />}
                  disabled={loading}
                >
                  {t("New User")}
                </Button>
              ) : null
            }
          />
          <WrapperSection
            {...{ loading }}
            className="manage-users__user-list p-0"
            headerClassName="!mb-0"
          >
            <UserList
              {...{
                onEditUser,
                onDeleteUser,
                onRestoreUser,
                updateSort,
                sort,
                pageIndex,
                pageSize,
                totalItems,
                onPageChange,
                data: userList,
                privilegeMap: privilegeMap,
              }}
            />
          </WrapperSection>
        </div>
      </div>

      {(() => {
        switch (manageUser.action) {
          case "ADD":
            return (
              <AddUserModal
                {...{
                  visible: manageUser?.isOpen,
                  closeModal: resetManageUser,
                  reloadUserList: refetchUserList,
                }}
              />
            );
          case "DELETE":
            return (
              <ModalDeleteUser
                {...{
                  visible: manageUser?.isOpen,
                  closeModal: resetManageUser,
                  userData: manageUser?.userSelected ?? {},
                  refetchUserList: refetchUserList,
                }}
              />
            );
          case "RESET_PASSWORD":
            return (
              <ModalResetPasswordUser
                {...{
                  visible: manageUser?.isOpen,
                  closeModal: resetManageUser,
                  reloadUserList: refetchUserList,
                  userData: manageUser?.userSelected,
                }}
              />
            );
          case "UPDATE":
            return (
              <UserDetailModal
                {...{
                  visible: manageUser?.isOpen,
                  closeModal: resetManageUser,
                  onDeleteUser,
                  userData: manageUser?.userSelected,
                  reloadUserList: refetchUserList,
                }}
              />
            );
          default:
            return null;
        }
      })()}
    </PageWrapper>
  );
};

export default ManageUsersView;

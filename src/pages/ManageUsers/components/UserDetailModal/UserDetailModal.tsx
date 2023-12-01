import Delete from "components/svgs/Delete";
import { Avatar, Form } from "antd";
import { updateUser } from "apis/user";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import UserRole from "components/UserRole";
import { UserProps } from "interface/User";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import {
  emptyFunction,
  formatLastUpdatedTime,
  getShortUserName,
} from "scripts/helpers";
import "./UserDetailModal.scss";

const UserDetailModal = ({
  visible,
  closeModal,
  userData = {},
  onDeleteUser = emptyFunction,
  reloadUserList = emptyFunction,
}: {
  visible: boolean;
  closeModal: any;
  userData: Partial<UserProps> | null;
  reloadUserList: () => void;
  onDeleteUser: any;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { isLoading: isLoadingUpdateUser, mutate: _onUpdateUser } = useMutation(
    updateUser,
    {
      onSuccess: () => {
        toast.success(t("User updated successfully"));
        refetchAndClose();
      },
    }
  );

  const refetchAndClose = () => {
    form.resetFields();
    closeModal();
    reloadUserList();
  };

  const onFinish = (values: any) => {
    const { firstName, lastName, role } = values;
    _onUpdateUser({ firstName, lastName, role, id: userData?.id ?? "" });
  };

  const isLoading = isLoadingUpdateUser;
  return (
    <Modal
      className="update-user-modal"
      width={640}
      visible={visible}
      onCancel={closeModal}
      maskClosable={false}
      title={`${t("User Details")}`}
      customFooter={
        <div className="flex flex-row justify-between">
          <Button
            onClick={() => onDeleteUser(userData)}
            type="text"
            size="large"
            theme="red"
            icon={<div className="flex mr-1 h-full items-center"><Delete width={18} height={18} /></div>}
          >
            {t("Delete this user")}
          </Button>
          <div>
            <Button onClick={closeModal} type="text" size="large">
              {t("Cancel")}
            </Button>
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="primary"
              size="large"
              htmlType="submit"
              onClick={form.submit}
            >
              {t("Save")}
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-4 bg-gray100 rounded-lg flex flex-row mb-4">
        <div className="w-7">
          <Avatar
            className="mr-2"
            size={24}
            style={{
              backgroundColor: "#6085FF",
              color: "#ffffff",
              fontSize: "9px",
            }}
            src={userData?.profilePictureUrl}
          >
            {getShortUserName(userData?.firstName, userData?.lastName)}
          </Avatar>
        </div>
        <div className="ml-2">
          <div className=" text-gray800 text-base">{`${userData?.firstName} ${
            userData?.lastName ? userData?.lastName : ""
          }`}</div>
          {userData?.lastUpdatedOn && (
            <div className="text-gray600 text-sm">
              <Trans
                defaults="Last edited {{dateTime}}"
                values={{
                  dateTime: formatLastUpdatedTime(userData?.lastUpdatedOn),
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Form
        initialValues={{
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
          role: userData?.role,
        }}
        form={form}
        onFinish={onFinish}
        name="update-user"
        layout="vertical"
      >
        <div className="row">
          <Form.Item
            name="role"
            label={t("User Role")}
            className="rol-row"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <UserRole />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item
            name="firstName"
            label={t("First Name")}
            rules={[
              {
                required: true,
                message: t("Please input your first name"),
              },
            ]}
          >
            <Input
              name="firstName"
              disabled={isLoading}
              placeholder={t("First Name")}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t("Last Name")}
            rules={[
              {
                required: true,
                message: t("Please input your last name"),
              },
            ]}
          >
            <Input
              disabled={isLoading}
              name="lastName"
              placeholder={t("Last Name")}
            />
          </Form.Item>
        </div>
        <Form.Item name="email" label={t("Username")}>
          <Input disabled placeholder={t("Username")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetailModal;

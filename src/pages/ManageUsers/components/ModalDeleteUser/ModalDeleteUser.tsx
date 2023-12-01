import { deleteUser } from "apis/user";
import Modal from "components/Modal";
import { UserProps } from "interface/User";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { DEFAULT_MODAL_WIDTH } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";

const ModalDeleteUser = ({
  visible = false,
  closeModal = emptyFunction,
  userData = {},
  refetchUserList,
}: {
  visible: boolean;
  closeModal: any;
  userData: Partial<UserProps>;
  refetchUserList: any;
}) => {
  const { t } = useTranslation();

  const { isLoading: isLoadingDeleteUser, mutate: _onDeleteUser } = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success(t("User deleted successfully"));
      refetchUserList();
      closeModal();
    },
  });

  return (
    <Modal
      className="delete-user-modal"
      width={DEFAULT_MODAL_WIDTH}
      visible={visible}
      onCancel={closeModal}
      maskClosable={false}
      title={`${t("Delete User")}`}
      okText={t("Delete User")}
      cancelText={t("Cancel")}
      
      onOk={() => _onDeleteUser(userData?.id ?? "")}
      buttonOkProps={{
        disabled: isLoadingDeleteUser,
        loading: isLoadingDeleteUser,
        type: "primary",
        theme: "red",
      }}
    >
      <Trans
        defaults='Are you sure you want to delete " <bold>{{name}}</bold> "?'
        values={{
          name: `${userData?.firstName} ${userData?.lastName ? userData?.lastName : ""}`,
        }}
        components={{ bold: <strong /> }}
      />
      <Trans />
    </Modal>
  );
};

export default ModalDeleteUser;

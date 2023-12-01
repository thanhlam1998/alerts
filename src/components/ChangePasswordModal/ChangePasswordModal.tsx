
import { changePasswordProfile } from "apis/user";
import Modal from "components/Modal";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ChangePasswordForm from "./ChangePasswordForm";
import './ChangePasswordModal.scss';

const ChangePasswordModal = ({ enableModal, setEnableModal }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading: changePasswordLoading, mutate: callChangePassword } = useMutation(
    changePasswordProfile,
    {
      onSuccess: (data:any) => {
        toast.success(t("Password changed successfully"));
        setEnableModal(false);
      },
    },
  );

  return (
    <Modal
      title={t("Change Password")}
      visible={enableModal}
      onCancel={() => setEnableModal(false)}
      centered
      className="change-password-modal"
      destroyOnClose={true}
      maskClosable={false}
      showFooter={false}
      bodyStyle={{ padding: 0 }}
    >
      <ChangePasswordForm {...{ callChangePassword, changePasswordLoading }} />
    </Modal>
  );
};

export default ChangePasswordModal;

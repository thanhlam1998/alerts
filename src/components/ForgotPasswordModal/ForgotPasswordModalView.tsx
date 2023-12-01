import Modal from "components/Modal";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

interface ForgotPasswordModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  isForgotPasswordStep: boolean;
  onSubmit: (data?: any) => void;
  loading: boolean;
  username?: string;
}

const ForgotPasswordModalView: FC<ForgotPasswordModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,

  onSubmit = emptyFunction,
  loading = false,
  username,
  isForgotPasswordStep,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="forgot-password-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={
        isForgotPasswordStep ? (
          <div className="flex flex-col">
            <span className="sm_title_t1_semi text-gray800">
              {t("Forgot Password")}
            </span>
            <span className="sm_body_b2_reg text-gray500">
              {t("Enter your email to reset your password")}
            </span>
          </div>
        ) : (
          t("Reset Password")
        )
      }
      showFooter={false}
      onCancel={closeModal}
      width={640}
    >
      {(() => {
        if (isForgotPasswordStep)
          return (
            <ForgotPasswordForm
              {...{ callForgotPassword: onSubmit, loading }}
            />
          );

        return (
          <ResetPasswordForm
            {...{ username, callResetPassword: onSubmit, loading }}
          />
        );
      })()}
    </Modal>
  );
};

export default ForgotPasswordModalView;

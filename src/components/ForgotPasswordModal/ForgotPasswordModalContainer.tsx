import { AuthApis } from "apis";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { emptyFunction } from "scripts/helpers";
import ForgotPasswordModalView from "./ForgotPasswordModalView";

interface ForgotPasswordModalProps {
  visible?: boolean;
  closeModal?: () => void;
}

const ForgotPasswordModalContainer: FC<ForgotPasswordModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
}: any) => {
  const { t } = useTranslation();

  const [step, setStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setStep(0);
    setUsername("");
  }, [visible]);

  const { isLoading: forgotPasswordLoading, mutate: callForgotPassword } =
    useMutation(AuthApis.callForgotPassword, {
      onSuccess: (_, { email }) => {
        setUsername(email);
        setStep(1);
      },
    });

  const { isLoading: resetPasswordLoading, mutate: callResetPassword } =
    useMutation(AuthApis.callResetPassword, {
      onSuccess: () => {
        toast.success(t("Reset password successfully, please login again."));
        handleCloseModal();
      },
    });

  const handleCloseModal = () => {
    closeModal();
    setStep(0);
    setUsername("");
  };

  const isForgotPasswordStep = step === 0;

  return (
    <ForgotPasswordModalView
      {...{
        visible,
        username,
        closeModal: handleCloseModal,
        onSubmit: isForgotPasswordStep ? callForgotPassword : callResetPassword,
        loading: isForgotPasswordStep
          ? forgotPasswordLoading
          : resetPasswordLoading,
        isForgotPasswordStep,
      }}
    />
  );
};

export default ForgotPasswordModalContainer;

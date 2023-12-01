import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import RejectCaseModalView from "./RejectCaseModalView";

interface IRejectCaseModalProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
}

const RejectCaseModalContainer: FC<IRejectCaseModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { caseId = "" } = useParams();
  const navigate = useNavigate();

  const rejectCaseCallback = () => {
    toast.success(t("Reject case successfully"));
    closeModal();
    navigate("/cases");
  };

  const { isLoading, mutate: callRejectCase } = useMutation(
    () => CaseApis.rejectCase(cif ?? caseId),
    {
      onSuccess: rejectCaseCallback,
    }
  );

  return (
    <RejectCaseModalView
      {...{
        visible,
        closeModal,
        cif,

        isLoading,
        callRejectCase,
      }}
    />
  );
};

export default RejectCaseModalContainer;

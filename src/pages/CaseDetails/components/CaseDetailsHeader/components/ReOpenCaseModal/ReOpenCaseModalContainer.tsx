import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import ReOpenCaseModalView from "./ReOpenCaseModalView";

interface IReOpenCaseModalProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
}

const ReOpenCaseModalContainer: FC<IReOpenCaseModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { caseId = "" } = useParams();
  const navigate = useNavigate();

  const reOpenCaseCallback = () => {
    toast.success(t("Re-open case successfully"));
    closeModal();
    navigate("/cases");
  };

  const { isLoading, mutate: callReOpenCase } = useMutation(
    () => CaseApis.reOpenCase(cif ?? caseId),
    {
      onSuccess: reOpenCaseCallback,
    }
  );

  return (
    <ReOpenCaseModalView
      {...{
        visible,
        closeModal,
        cif,

        isLoading,
        callReOpenCase,
      }}
    />
  );
};

export default ReOpenCaseModalContainer;

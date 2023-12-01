import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import ApproveCaseModalView from "./ApproveCaseModalView";

interface IApproveCaseModalProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
}

const ApproveCaseModalContainer: FC<IApproveCaseModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { caseId = "" } = useParams();

  const approveCaseCallback = () => {
    toast.success(t("Approve case successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading, mutate: callApproveCase } = useMutation(
    () => CaseApis.approveCase(cif ?? caseId),
    {
      onSuccess: approveCaseCallback,
    }
  );

  return (
    <ApproveCaseModalView
      {...{
        visible,
        closeModal,
        cif,

        isLoading,
        callApproveCase,
      }}
    />
  );
};

export default ApproveCaseModalContainer;

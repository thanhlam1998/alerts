import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import ConfirmModalView from "./ConfirmModalView";

interface ConfirmModalProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
  idType?: string;
}

const ConfirmModalContainer: FC<ConfirmModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
  idType,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { caseId = "" } = useParams();

  const addIncidentalSubjectCallback = () => {
    toast.success(t("Add incidental subject successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_INCIDENTAL_SUBJECTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_REMOVED_SUBJECTS
    );
  };

  const { isLoading, mutate: callAddIncidentalSubject } = useMutation(
    () => CaseApis.addIncidentalSubject(caseId, cif, idType),
    {
      onSuccess: addIncidentalSubjectCallback,
    }
  );

  return (
    <ConfirmModalView
      {...{
        visible,
        closeModal,
        isLoading,
        callAddIncidentalSubject,
      }}
    />
  );
};

export default ConfirmModalContainer;

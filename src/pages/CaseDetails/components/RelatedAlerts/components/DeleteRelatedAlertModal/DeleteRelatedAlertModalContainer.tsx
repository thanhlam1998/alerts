import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import DeleteRelatedAlertModalView from "./DeleteRelatedAlertModalView";

interface DeleteRelatedAlertModalProps {
  visible?: boolean;
  closeModal?: () => void;
  alertId: string;
}

const DeleteRelatedAlertModalContainer: FC<DeleteRelatedAlertModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  alertId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateCaseCallback = () => {
    toast.success(t("Detach case successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_RELATED_ALERTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_UNASSIGNED_ALERTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_INCIDENTAL_SUBJECTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_REMOVED_SUBJECTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_MAIN_SUBJECT
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading: isDetaching, mutate: callDetachAlertFromCase } =
    useMutation(CaseApis.detachAlertFromCase, {
      onSuccess: updateCaseCallback,
    });

  return (
    <DeleteRelatedAlertModalView
      {...{
        visible,
        closeModal,
        alertId,
        isDetaching,
        callDetachAlertFromCase,
      }}
    />
  );
};

export default DeleteRelatedAlertModalContainer;

import { AlertApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import ConfirmModalView from "./ConfirmModalView";

interface ConfirmModalProps {
  visible?: boolean;
  closeModal?: () => void;
  alertId: string;
}

const ConfirmModalContainer: FC<ConfirmModalProps> = ({
  closeModal = emptyFunction,
  visible = false,
  alertId,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const assignAlertToCaseCallback = () => {
    toast.success(t("Assign alert to case successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_UNASSIGNED_ALERTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_RELATED_ALERTS
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

  const { isLoading, mutate: callAssignAlertToCase } = useMutation(
    AlertApis.assignAlertToCase,
    {
      onSuccess: assignAlertToCaseCallback,
    }
  );

  return (
    <ConfirmModalView
      {...{
        visible,
        closeModal,
        isLoading,
        callAssignAlertToCase,
        alertId,
      }}
    />
  );
};

export default ConfirmModalContainer;

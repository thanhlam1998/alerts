import { AlertApis, CaseApis } from "apis";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import AssignToCaseModalView from "./AssignToCaseModalView";
import { useParams } from "react-router-dom";

interface IAssignToCaseModalContainerProps {
  visible?: boolean;
  closeModal?: () => void;
  alertIdsSelected?: string[];
  resetAlertIdsSelected?: (alertIdsSelected?: string[]) => void;
}

const AssignToCaseModalContainer: FC<IAssignToCaseModalContainerProps> = ({
  closeModal = emptyFunction,
  visible = false,
  alertIdsSelected = [],
  resetAlertIdsSelected = emptyFunction,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { alertCIFNumber = "" } = useParams();

  const {
    isLoading: isGettingAssignableCases,
    data: assignableCasesData,
  }: any = useQuery(
    [BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_ASSIGNABLE_CASES],
    () => CaseApis.getActiveCases(alertCIFNumber),
    { enabled: visible }
  );

  const assignAlertToCaseCallback = () => {
    toast.success(t("Assign alerts to case successfully"));
    resetAlertIdsSelected();
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_OPEN_ALERTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_NETWORK_CONNECTION
    );
  };

  const { isLoading: isAssigning, mutate: callAssignAlertToCase } = useMutation(
    AlertApis.assignAlertToCase,
    {
      onSuccess: assignAlertToCaseCallback,
    }
  );

  return (
    <AssignToCaseModalView
      {...{
        visible,
        closeModal,
        alertIdsSelected,

        isGettingAssignableCases,
        assignableCasesData: assignableCasesData?.data ?? [],

        isAssigning,
        callAssignAlertToCase,
      }}
    />
  );
};

export default memo(AssignToCaseModalContainer);

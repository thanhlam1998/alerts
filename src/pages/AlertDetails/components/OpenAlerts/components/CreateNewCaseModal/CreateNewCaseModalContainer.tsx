import { CaseApis, GeneralApis, UserApis } from "apis";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES, USER_ROLES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import CreateNewCaseModalView from "./CreateNewCaseModalView";

interface ICreateNewCaseModalContainerProps {
  visible?: boolean;
  closeModal?: () => void;
  alertIdsSelected?: string[];
  resetAlertIdsSelected?: (alertIdsSelected?: string[]) => void;
}

const CreateNewCaseModalContainer: FC<ICreateNewCaseModalContainerProps> = ({
  closeModal = emptyFunction,
  visible = false,
  alertIdsSelected = [],
  resetAlertIdsSelected = emptyFunction,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading: isGettingMarkerUsers, data: makerUsersData }: any =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.USER.GET_USERS_BY_ROLE],
      () => UserApis.getUsersByRole({ role: USER_ROLES.MAKER }),
      { enabled: visible }
    );

  const { isLoading: isGettingCaseCategories, data: caseCategoriesData }: any =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.GENERAL.GET_CASE_CATEGORIES],
      GeneralApis.getCaseCategories,
      { enabled: visible }
    );

  const createCaseFromAlertsCallback = () => {
    toast.success(t("Create new case successfully"));
    resetAlertIdsSelected();
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_OPEN_ALERTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_NETWORK_CONNECTION
    );
  };

  const {
    isLoading: isCreatingNewCaseFromAlertIds,
    mutate: callCreateNewCaseFromAlertIds,
  } = useMutation(CaseApis.createCaseFromAlerts, {
    onSuccess: createCaseFromAlertsCallback,
  });

  return (
    <CreateNewCaseModalView
      {...{
        visible,
        closeModal,
        alertIdsSelected,

        isGettingMarkerUsers,
        makerUsersData: makerUsersData?.data ?? [],

        isGettingCaseCategories,
        caseCategoriesData: caseCategoriesData?.data ?? [],

        isCreatingNewCaseFromAlertIds,
        callCreateNewCaseFromAlertIds,
      }}
    />
  );
};

export default memo(CreateNewCaseModalContainer);

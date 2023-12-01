import { CaseApis, GeneralApis, UserApis } from "apis";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES, USER_ROLES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import SubmitCaseModalView from "./SubmitCaseModalView";
import { ICaseDetail } from "interfaces/case";

interface ISubmitCaseModalContainerProps {
  visible?: boolean;
  closeModal?: () => void;
  caseDetails?: ICaseDetail;
}

const SubmitCaseModalContainer: FC<ISubmitCaseModalContainerProps> = ({
  closeModal = emptyFunction,
  visible = false,
  caseDetails,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading: isGettingCaseCategories, data: caseCategoriesData }: any =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.GENERAL.GET_CASE_CATEGORIES],
      GeneralApis.getCaseCategories,
      { enabled: visible }
    );

  const { isLoading: isGettingCheckers, data: checkersData }: any = useQuery(
    [
      `${BRI_USE_QUERY_REQUEST_KEY_NAMES.USER.GET_USERS_BY_ROLE}-${USER_ROLES.CHECKER}`,
    ],
    () => UserApis.getUsersByRole({ role: USER_ROLES.CHECKER }),
    { enabled: visible }
  );

  const { isLoading: isGettingSigners, data: signersData }: any = useQuery(
    [
      `${BRI_USE_QUERY_REQUEST_KEY_NAMES.USER.GET_USERS_BY_ROLE}-${USER_ROLES.SIGNER}`,
    ],
    () => UserApis.getUsersByRole({ role: USER_ROLES.SIGNER }),
    { enabled: visible }
  );

  const submitCaseCallback = () => {
    toast.success(t("Submit case successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading: isSubmitting, mutate: callSubmitCase } = useMutation(
    CaseApis.submitCase,
    {
      onSuccess: submitCaseCallback,
    }
  );

  return (
    <SubmitCaseModalView
      {...{
        visible,
        closeModal,
        caseDetails,

        isGettingCaseCategories,
        caseCategoriesData: caseCategoriesData?.data ?? [],

        isGettingCheckers,
        checkersData: checkersData?.data ?? [],

        isGettingSigners,
        signersData: signersData?.data ?? [],

        isSubmitting,
        callSubmitCase,
      }}
    />
  );
};

export default memo(SubmitCaseModalContainer);

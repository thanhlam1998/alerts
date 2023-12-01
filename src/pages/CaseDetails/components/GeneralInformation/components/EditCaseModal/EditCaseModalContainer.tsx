import { CaseApis, GeneralApis } from "apis";
import { ICaseDetail } from "interfaces/case";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import EditCaseModalView from "./EditCaseModalView";

interface IEditCaseModalContainerProps {
  visible?: boolean;
  closeModal?: () => void;
  caseDetails: ICaseDetail;
}

const EditCaseModalContainer: FC<IEditCaseModalContainerProps> = ({
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

  const updateCaseCallback = () => {
    toast.success(t("Update case successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading: isUpdatingCase, mutate: callUpdateCase } = useMutation(
    CaseApis.updateCase,
    {
      onSuccess: updateCaseCallback,
    }
  );

  return (
    <EditCaseModalView
      {...{
        visible,
        closeModal,
        caseDetails,

        isGettingCaseCategories,
        caseCategoriesData: caseCategoriesData?.data ?? [],

        isUpdatingCase,
        callUpdateCase,
      }}
    />
  );
};

export default memo(EditCaseModalContainer);

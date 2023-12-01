import { CaseDetailActionPrivilegeMap, ICaseDetail, IUserListItem } from "interfaces/case";
import MakersView from "./MakersView";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { CaseApis } from "apis";

export interface IMakerList {
  isGettingMakers: boolean;
  makersData: IUserListItem[];
}

interface IMakersContainerProps extends IMakerList {
  loading: boolean;
  caseDetails?: ICaseDetail;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const MakersContainer = ({
  loading,
  caseDetails,

  isGettingMakers,
  makersData,
  privilegeMap = {}
}: IMakersContainerProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const removeMakerFromCaseCallback = () => {
    toast.success(t("Remove maker successfully"));
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading: removeMakerLoading, mutate: callRemoveMakerFromCase } =
    useMutation(CaseApis.removeMakerFromCase, {
      onSuccess: removeMakerFromCaseCallback,
    });

  const addMakerFromCaseCallback = () => {
    toast.success(t("Add maker successfully"));
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading: addMakerLoading, mutate: callAddMakerToCase } =
    useMutation(CaseApis.addMakerToCase, {
      onSuccess: addMakerFromCaseCallback,
    });

  return (
    <MakersView
      {...{
        loading,
        caseDetails,

        isGettingMakers,
        makersData,

        removeMakerLoading,
        callRemoveMakerFromCase,

        addMakerLoading,
        callAddMakerToCase,

        privilegeMap: privilegeMap,
      }}
    />
  );
};

export default MakersContainer;

import { CaseApis } from "apis";
import { CaseDetailActionPrivilegeMap, ICaseDetail } from "interfaces/case";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  CASE_PRIORITIES,
} from "scripts/constants";
import CaseDetailsHeaderView from "./CaseDetailsHeaderView";
import { emptyFunction } from "scripts/helpers";

const CaseDetailsHeaderContainer = ({
  loading = false,
  caseDetails,
  isLoadingExportCaseDetail,
  callExportCaseXML = emptyFunction,
  callExportCaseCSV = emptyFunction,
  privilegeMap = {}
}: {
  loading: boolean;
  caseDetails?: ICaseDetail;
  isLoadingExportCaseDetail: boolean;
  callExportCaseXML: (caseId: string) => void;
  callExportCaseCSV: (caseId: string) => void;
  privilegeMap: CaseDetailActionPrivilegeMap;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { caseId = "" } = useParams();

  const updateCaseCallback = () => {
    toast.success(t("Update case successfully"));
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS
    );
  };

  const { isLoading, mutate: callChangeCasePriority } = useMutation(
    (priority: CASE_PRIORITIES) =>
      CaseApis.changeCasePriority(caseDetails?.caseId ?? caseId, priority),
    {
      onSuccess: updateCaseCallback,
    }
  );

  return (
    <CaseDetailsHeaderView
      {...{ 
        loading, caseDetails, 
        isLoading, callChangeCasePriority,
        isLoadingExportCaseDetail,
        callExportCaseXML: callExportCaseXML,
        callExportCaseCSV: callExportCaseCSV,
        privilegeMap,
      }}
    />
  );
};

export default CaseDetailsHeaderContainer;

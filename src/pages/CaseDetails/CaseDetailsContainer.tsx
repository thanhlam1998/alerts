import { useParams } from "react-router-dom";
import CaseDetailsView from "./CaseDetailsView";
import { CaseApis, GeneralApis, UserApis } from "apis";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES, USER_ROLES } from "scripts/constants";
import { useQuery } from "react-query";

const CaseDetailsContainer = () => {
  const { caseId = "" } = useParams();

  const { isLoading: isGettingCaseDetails, data: caseDetailsData }: any =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS, caseId],
      () => CaseApis.getCaseDetails(caseId),
      { enabled: !!caseId }
    );

  const { isLoading: isGettingAlertCategories, data: alertCategoriesData } =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.GENERAL.GET_CASE_CATEGORIES],
      GeneralApis.getAlertCategories,
    );

  const { isLoading: isGettingMakers, data: makersData } = useQuery(
    [BRI_USE_QUERY_REQUEST_KEY_NAMES.USER.GET_USERS_BY_ROLE],
    () => UserApis.getUsersByRole({ role: USER_ROLES.MAKER })
  );

  return (
    <CaseDetailsView
      {...{
        isGettingCaseDetails,
        caseDetailsData: caseDetailsData?.data,

        isGettingAlertCategories,
        alertCategoriesData: alertCategoriesData?.data,

        isGettingMakers,
        makersData: makersData?.data,
      }}
    />
  );
};

export default CaseDetailsContainer;

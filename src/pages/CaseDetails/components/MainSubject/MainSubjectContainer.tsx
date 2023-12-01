import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import MainSubjectView from "./MainSubjectView";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CaseApis } from "apis";

const MainSubjectContainer = ({
  isGettingCaseDetails,
}: {
  isGettingCaseDetails: boolean;
}) => {
  const { caseId = "" } = useParams();

  const { isLoading: isGettingMainSubject, data: mainSubjectData }: any =
    useQuery(
      [
        BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_MAIN_SUBJECT,
        caseId,
      ],
      () => CaseApis.getCaseDetailsMainSubject(caseId),
      { enabled: !!caseId && !isGettingCaseDetails}
    );

  return (
    <MainSubjectView
      {...{
        isGettingMainSubject: isGettingCaseDetails || isGettingMainSubject,
        mainSubjectData: mainSubjectData?.data,
      }}
    />
  );
};

export default MainSubjectContainer;

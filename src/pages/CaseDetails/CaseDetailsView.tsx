import PageWrapper from "components/PageWrapper";
import Home from "components/svgs/Home";
import { ICaseDetail } from "interfaces/case";
import { IGetAlertCategoriesProps } from "interfaces/common";
import { isEmpty } from "lodash";
import NotFound from "pages/NotFound";
import { useTranslation } from "react-i18next";
import CaseDetailsHeader from "./components/CaseDetailsHeader";
import GeneralInformation from "./components/GeneralInformation";
import IncidentalSubjects from "./components/IncidentalSubjects";
import MainSubject from "./components/MainSubject";
import Makers from "./components/Makers";
import { IMakerList } from "./components/Makers/MakersContainer";
import RelatedAlerts from "./components/RelatedAlerts";
import RemovedSubjects from "./components/RemovedSubjects";
import UnassignedAlerts from "./components/UnassignedAlerts";
// import NetworkConnection from "./components/NetworkConnection";
import { CaseApis } from "apis";
import { useMutation } from "react-query";
import {
  downloadURL,
  getCaseDetailPrivilegeMap,
  getRedux,
} from "scripts/helpers";

interface ICaseDetailsViewProps extends IMakerList, IGetAlertCategoriesProps {
  isGettingCaseDetails: boolean;
  caseDetailsData?: ICaseDetail;
}

const CaseDetailsView = ({
  isGettingCaseDetails,
  caseDetailsData,

  isGettingAlertCategories,
  alertCategoriesData,

  isGettingMakers,
  makersData,
}: ICaseDetailsViewProps) => {
  const { t } = useTranslation();
  const currentUser = getRedux(`auth.currentUser`, {});

  const { isLoading: isLoadingExportCaseXML, mutate: callExportCaseXML } =
    useMutation(CaseApis.exportCaseDetailByXML, {
      onSuccess: (resp: any) => resp?.data?.url && downloadURL(resp.data.url),
    });

  const { isLoading: isLoadingExportCaseCSV, mutate: callExportCaseCSV } =
    useMutation(CaseApis.exportCaseDetailByCSV, {
      onSuccess: (resp: any) => resp?.data?.url && downloadURL(resp.data.url),
    });

  const isEmptyCaseDetails = isEmpty(caseDetailsData) && !isGettingCaseDetails;
  if (isEmptyCaseDetails) {
    return <NotFound />;
  }

  const privilegeMap = getCaseDetailPrivilegeMap(
    currentUser.role,
    caseDetailsData?.approvalStatus ?? ""
  );

  return (
    <PageWrapper
      className="case-details"
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "/cases",
          title: t("Cases"),
        },
        {
          href: "#",
          title: t("Case Details"),
        },
      ]}
    >
      <div className="case-details__wrapper flex flex-col gap-4">
        <CaseDetailsHeader
          {...{
            loading: isGettingCaseDetails,
            caseDetails: caseDetailsData,
            isLoadingExportCaseDetail:
              isLoadingExportCaseXML || isLoadingExportCaseCSV,
            callExportCaseXML,
            callExportCaseCSV,
            privilegeMap: privilegeMap,
          }}
        />
        <div className="flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <GeneralInformation
              {...{
                loading: isGettingCaseDetails,
                caseDetails: caseDetailsData,
                privilegeMap: privilegeMap,
              }}
            />
            <div className="w-[320px] flex-grow-[1]">
              <Makers
                {...{
                  loading: isGettingCaseDetails,
                  caseDetails: caseDetailsData,
                  isGettingMakers,
                  makersData,
                  privilegeMap: privilegeMap,
                }}
              />
            </div>
          </div>
          <MainSubject {...{ isGettingCaseDetails }} />
          {/* <NetworkConnection /> */}
          <IncidentalSubjects
            {...{
              isGettingCaseDetails,
              privilegeMap,
            }}
          />
          <RemovedSubjects
            {...{
              isGettingCaseDetails,
              privilegeMap,
            }}
          />
          <RelatedAlerts
            {...{
              isGettingAlertCategories,
              alertCategoriesData,
              isGettingCaseDetails,
              privilegeMap,
            }}
          />
          <UnassignedAlerts
            {...{
              isGettingAlertCategories,
              alertCategoriesData,
              isGettingCaseDetails,
              privilegeMap,
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default CaseDetailsView;

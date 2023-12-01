import BoxContent from "components/BoxContent";
import WrapperSection from "components/WrapperSection";
import Edit from "components/svgs/Edit";
import { CaseDetailActionEnum, CaseDetailActionPrivilegeMap, ICaseCategory, ICaseDetail } from "interfaces/case";
import { isEmpty } from "lodash";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CASE_DATE_TIME_FORMAT } from "scripts/constants";
import { convertToDisplay, renderRiskScore } from "scripts/helpers";
import EditCaseModal from "./components/EditCaseModal";

const DEFAULT_VALUE = "-";

const GeneralInformation = ({
  loading,
  caseDetails,
  privilegeMap,
}: {
  loading: boolean;
  caseDetails?: ICaseDetail;
  privilegeMap: CaseDetailActionPrivilegeMap;
}) => {
  const { t } = useTranslation();

  const [isEditCaseModalOpen, setIsEditCaseModalOpen] = useState(false);

  const generalInformationItems = [
    {
      label: t("Main Subject"),
      value: caseDetails?.mainSubject?.customerName ?? DEFAULT_VALUE,
    },
    {
      label: t("Main Subject CIF"),
      value: caseDetails?.mainSubject?.cif ?? DEFAULT_VALUE,
    },
    {
      label: t("Alerts"),
      value: convertToDisplay(caseDetails?.totalAlerts ?? 0),
    },
    {
      label: t("Created Date"),
      value: caseDetails?.createdDateTime
        ? moment(caseDetails?.createdDateTime * 1000).format(
            CASE_DATE_TIME_FORMAT
          )
        : DEFAULT_VALUE,
    },
    {
      label: t("GoAML Report Number"),
      value: caseDetails?.goamlReportNumber ?? DEFAULT_VALUE,
    },
    {
      label: t("FIU Ref #"),
      value: caseDetails?.fiuRefNumber ?? DEFAULT_VALUE,
    },
    {
      label: t("Incidental Subjects"),
      value: convertToDisplay(caseDetails?.totalIncidentalSubjects),
    },
    {
      label: t("Transactions"),
      value: convertToDisplay(caseDetails?.totalTransactions),
    },
    {
      label: t("Risk Score"),
      value: renderRiskScore(caseDetails?.aggregatedRiskScore),
    },
    {
      label: t("Decision"),
      value: caseDetails?.decision ?? DEFAULT_VALUE,
    },
  ];
  const showEditCaseIcon = !loading && !isEmpty(caseDetails) && privilegeMap[CaseDetailActionEnum.EDIT_CASE_INFO];

  return (
    <div id="general-information" className="w-[calc(100%-320px-16px)]">
      <WrapperSection
        title={
          <div className="flex items-center gap-3">
            <span>{t("General Information")}</span>
            {showEditCaseIcon && (
              <Edit
                className="w-4 h-4 cursor-pointer text-gray500"
                onClick={() => setIsEditCaseModalOpen(true)}
              />
            )}
          </div>
        }
        className="case-details__general-information p-6 h-full w-full"
        {...{ loading }}
      >
        <div className="flex flex-col gap-4">
          <div className="case-general-information grid grid-cols-5 gap-y-4 gap-x-2">
            {generalInformationItems?.map(({ label, value }, index) => {
              return (
                <div className="flex flex-col gap-1" key={index}>
                  <span className="sm_body_b2_reg text-gray500">{label}</span>
                  <span className="sm_body_b1_semi text-gray800">{value}</span>
                </div>
              );
            })}
          </div>

          <BoxContent
            title={t("Categories")}
            theme="gray"
            className="!p-2 overflow-hidden !rounded-[8px]"
            contentClassName="flex flex-wrap gap-2"
          >
            {caseDetails?.categories?.map(
              (category: ICaseCategory, index: number) => (
                <span
                  className="border border-solid border-gray200 bg-gray50 rounded-[4px] py-[2px] px-2 sm_body_b2_reg overflow-hidden"
                  key={index}
                >
                  {category.name}
                </span>
              )
            )}
          </BoxContent>
          <BoxContent
            title={t("Description")}
            theme="gray"
            className="!p-2 overflow-hidden !rounded-[8px] whitespace-pre-wrap"
          >
            {caseDetails?.description}
          </BoxContent>
          <BoxContent
            title={t("UKER Comment")}
            theme="gray"
            className="!p-2 overflow-hidden !rounded-[8px] whitespace-pre-wrap"
          >
            {caseDetails?.ukerComment}
          </BoxContent>
        </div>

        {!isEmpty(caseDetails) && (
          <EditCaseModal
            visible={isEditCaseModalOpen}
            closeModal={() => setIsEditCaseModalOpen(false)}
            {...{ caseDetails }}
          />
        )}
      </WrapperSection>
    </div>
  );
};

export default GeneralInformation;

import Button from "components/Button";
import PriorityDropdown from "components/PriorityDropdown";
import Tag from "components/Tag";
import WrapperSection from "components/WrapperSection";
import BackV2 from "components/svgs/BackV2";
import { CaseDetailActionEnum, CaseDetailActionPrivilegeMap, ICaseDetail } from "interfaces/case";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  CASE_APPROVAL_STATUS_ENUM,
  CASE_APPROVAL_STATUS_OPTIONS,
  CASE_PRIORITIES,
  USER_ROLES,
} from "scripts/constants";
import { emptyFunction, getCaseApprovalStatus, getCaseDetailPrivilegeMap, getRedux } from "scripts/helpers";
import ApproveCaseModal from "./components/ApproveCaseModal";
import CreateAdhocCaseModal from "./components/CreateAdhocCaseModal";
import ReOpenCaseModal from "./components/ReOpenCaseModal";
import RejectCaseModal from "./components/RejectCaseModal";
import SubmitCaseModal from "./components/SubmitCaseModal";
import { Dropdown } from "antd";

enum ExportTypeEnum {
  AS_PDF = "AS_PDF",
  AS_CSV = "AS_CSV",
  AS_XML = "AS_XML"
}

const CaseDetailsHeaderView = ({
  loading = false,
  caseDetails,
  callChangeCasePriority = emptyFunction,
  isLoading = false,
  isLoadingExportCaseDetail,
  callExportCaseXML,
  callExportCaseCSV,
  privilegeMap,
}: {
  loading: boolean;
  caseDetails?: ICaseDetail;
  isLoading: boolean;
  callChangeCasePriority: (priority: CASE_PRIORITIES) => void;
  isLoadingExportCaseDetail: boolean;
  callExportCaseXML: (caseId: string) => void;
  callExportCaseCSV: (caseId: string) => void;
  privilegeMap: CaseDetailActionPrivilegeMap;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { caseId = "" } = useParams();

  const [isSubmitCaseModalOpen, setIsSubmitCaseModalOpen] = useState(false);
  const [isRejectCaseModalOpen, setIsRejectCaseModalOpen] = useState(false);
  const [isApproveCaseModalOpen, setIsApproveCaseModalOpen] = useState(false);
  const [isReopenCaseModalOpen, setIsReopenCaseModalOpen] = useState(false);
  const [isCreateAdhocModalOpen, setIsCreateAdhocModalOpen] = useState(false);
  const [adhocCaseId, setAdhocCaseId] = useState(null); 
  const [adhocCaseProcessing, setAdhocCaseProcessing] = useState(false);

  const approvalStatusName = caseDetails?.approvalStatus
    ? CASE_APPROVAL_STATUS_OPTIONS?.find(
        (item: any) => item?.value === caseDetails?.approvalStatus
      )?.label
    : "";
    
  const onExportClick = ({ key }: { key: string }) => {
    switch (key) {
      case ExportTypeEnum.AS_PDF: 
        // TODO: IMPLEMENT CALLING API 
        break;
      case ExportTypeEnum.AS_CSV:
        callExportCaseCSV(caseId)
        break;
      case ExportTypeEnum.AS_XML:
        callExportCaseXML(caseId)
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (caseDetails && caseDetails.caseId) {
      setAdhocCaseId(caseDetails?.adhocCaseId);
      setAdhocCaseProcessing(caseDetails?.adhocCaseProcessing);
    }
  }, [caseDetails]);

  return (
    <>
      <WrapperSection
        icon={
          <BackV2 className="cursor-pointer " onClick={() => navigate(-1)} />
        }
        className="case-details__header"
        headerClassName="!mb-0 pl-2"
        title={
          loading ? (
            <span className="sm_body_b1_semi text-gray800">
              {t("Loading...")}
            </span>
          ) : (
            <div className="flex items-center sm_body_b1_semi text-gray800 gap-2">
              <span>{`Case ${caseDetails?.caseId ?? caseId}`}</span>
              {!isEmpty(approvalStatusName) && (
                <Tag
                  color={getCaseApprovalStatus(
                    caseDetails?.approvalStatus as CASE_APPROVAL_STATUS_ENUM
                  )}
                  label={approvalStatusName}
                />
              )}
              {caseDetails?.priority && (
                <PriorityDropdown
                  type="CASE"
                  priority={caseDetails?.priority}
                  onChangePriority={(value: CASE_PRIORITIES) =>
                    callChangeCasePriority(value)
                  }
                  disabled={isLoading || !privilegeMap[CaseDetailActionEnum.CHANGE_PRIORITY]}
                />
              )}
            </div>
          )
        }
        rightHeaderContent={
          <div className="flex flex-row justify-end gap-2">
            {(() => {
              if (
                !adhocCaseId &&
                !adhocCaseProcessing
              ) {
                return privilegeMap[CaseDetailActionEnum.CREATE_ADHOC_CASE] ? (
                  <Button
                    type="default"
                    theme="standard"
                    onClick={() => setIsCreateAdhocModalOpen(true)}
                    disabled={isLoading}
                  >
                    {t("Create Adhoc Case")}
                  </Button>
                ) : null;
              }

              if (
                !adhocCaseId &&
                adhocCaseProcessing
              ) {
                return (
                  <Button type="default" theme="standard" disabled>
                    {t("Adhoc On Progress")}
                  </Button>
                );
              }

              if (adhocCaseId) {
                return (
                  <Button
                    type="default"
                    theme="standard"
                    onClick={() =>
                      navigate(`/cases/${adhocCaseId}`)
                    }
                    disabled={isLoading}
                  >
                    {t("Show Adhoc Case")}
                  </Button>
                );
              }
            })()}
            {(() => {
              switch (caseDetails?.approvalStatus) {
                case CASE_APPROVAL_STATUS_ENUM.OPEN: {
                  return privilegeMap[CaseDetailActionEnum.SUBMIT] ? (
                    <Button
                      type="default"
                      theme="standard"
                      onClick={() => setIsSubmitCaseModalOpen(true)}
                    >
                      {t("Submit Case")}
                    </Button>
                  ) : null;
                }
                case CASE_APPROVAL_STATUS_ENUM.ON_CHECKER:
                case CASE_APPROVAL_STATUS_ENUM.ON_SIGNER: {
                  return (
                    <>
                      {privilegeMap[CaseDetailActionEnum.REJECT] ? (
                         <Button
                          type="default"
                          theme="red"
                          onClick={() => setIsRejectCaseModalOpen(true)}
                        >
                          {t("Reject")}
                        </Button>
                      ) : null}
                      {privilegeMap[CaseDetailActionEnum.APPROVE] ? (
                        <Button
                          type="default"
                          theme="standard"
                          onClick={() => setIsApproveCaseModalOpen(true)}
                        >
                          {t("Approve")}
                        </Button>
                      ) : null}
                    </>
                  );
                }
                case CASE_APPROVAL_STATUS_ENUM.CLOSED: {
                  return privilegeMap[CaseDetailActionEnum.REOPEN] ? (
                    <Button
                      type="default"
                      theme="standard"
                      onClick={() => setIsReopenCaseModalOpen(true)}
                    >
                      {t("Re-open")}
                    </Button>
                  ) : null;
                }
                default: {
                  return null;
                }
              }
            })()}
             <Dropdown menu={{
              items: [
                // TODO: Uncomment when export PDF requirement done 
                // {
                //   label: t('AS PDF'),
                //   key: ExportTypeEnum.AS_PDF,
                // },
                {
                  label: t('AS CSV'),
                  key: ExportTypeEnum.AS_CSV,
                },
                {
                  label: t('AS XML'),
                  key: ExportTypeEnum.AS_XML,
                },
              ],
              onClick: onExportClick,
             }} trigger={['click']}
             >
              <Button 
                type="primary" 
                theme="standard" 
                disabled={loading || isLoadingExportCaseDetail}
                loading={isLoadingExportCaseDetail}
                onClick={(e) => e.preventDefault()}
              >
                {t("Export")}
              </Button>
             </Dropdown>
          </div>
        }
      />
      <SubmitCaseModal
        visible={isSubmitCaseModalOpen}
        closeModal={() => setIsSubmitCaseModalOpen(false)}
        {...{ caseDetails }}
      />
      <RejectCaseModal
        cif={caseDetails?.caseId}
        visible={isRejectCaseModalOpen}
        closeModal={() => setIsRejectCaseModalOpen(false)}
      />
      <ApproveCaseModal
        cif={caseDetails?.caseId}
        visible={isApproveCaseModalOpen}
        closeModal={() => setIsApproveCaseModalOpen(false)}
      />
      <ReOpenCaseModal
        cif={caseDetails?.caseId}
        visible={isReopenCaseModalOpen}
        closeModal={() => setIsReopenCaseModalOpen(false)}
      />
      <CreateAdhocCaseModal
        cif={caseDetails?.caseId}
        visible={isCreateAdhocModalOpen}
        closeModal={(success?: boolean) => {
          if (success) {
            setAdhocCaseProcessing(true);
          }

          setIsCreateAdhocModalOpen(false)
        }}
      />
    </>
  );
};

export default CaseDetailsHeaderView;

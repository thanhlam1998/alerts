import BoxContent from "components/BoxContent";
import InvolvedTransactions from "components/InvolvedTransactions";
import WrapperSection from "components/WrapperSection";
import {
  IAlertDetail,
  IAlertDetailIdentity,
  IAlertReason,
} from "interfaces/alertsQueue";
import { useTranslation } from "react-i18next";
import { DEFAULT_CURRENCY } from "scripts/constants";
import { renderRiskScore } from "scripts/helpers";

const GeneralInformation = ({
  loading,
  alertDetails,
}: {
  loading: boolean;
  alertDetails?: IAlertDetail;
}) => {
  const { t } = useTranslation();

  return (
    <WrapperSection
      title={t("General Information")}
      className="alert-details__general-information p-6"
      {...{ loading }}
    >
      <div className="flex flex-col gap-4">
        <BoxContent title={t("Customer Identity")} theme="gray">
          <div className="grid gap-2 grid-cols-4">
            {alertDetails?.identities?.map(
              (identity: IAlertDetailIdentity, index: number) => (
                <div className="flex flex-col gap-1" key={index}>
                  <span className="sm_body_b2_reg text-gray500">
                    {identity?.name}
                  </span>
                  <span className="sm_body_b1_semi text-gray800">
                    {identity?.value}
                  </span>
                </div>
              )
            )}
          </div>
        </BoxContent>
        <BoxContent title={t("Alert Summary")} theme="gray">
          <div className="flex flex-col gap-2">
            <div className="grid gap-2 grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="sm_body_b2_reg text-gray500">
                  {t("Risk Score")}
                </span>
                <span className="sm_body_b1_semi text-gray800">
                  {renderRiskScore(alertDetails?.aggregatedRiskScore)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="sm_body_b2_reg text-gray500">
                  {t("Total Open Alerts")}
                </span>
                <span className="sm_body_b1_semi text-gray800">
                  {alertDetails?.totalOpenAlerts}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InvolvedTransactions
                {...{
                  isInFlow: true,
                  totalFrequencies: alertDetails?.inflowSummary?.frequency ?? 0,
                  totalAmounts:
                    alertDetails?.inflowSummary?.amount?.amount ?? 0,
                  currency:
                    alertDetails?.inflowSummary?.amount?.currency ??
                    DEFAULT_CURRENCY,
                  totalCIFInvolved: alertDetails?.inflowSummary?.parities ?? 0,
                }}
              />
              <InvolvedTransactions
                {...{
                  isInFlow: false,
                  totalFrequencies:
                    alertDetails?.outflowSummary?.frequency ?? 0,
                  totalAmounts:
                    alertDetails?.outflowSummary?.amount?.amount ?? 0,
                  currency:
                    alertDetails?.outflowSummary?.amount?.currency ??
                    DEFAULT_CURRENCY,
                  totalCIFInvolved: alertDetails?.outflowSummary?.parities ?? 0,
                }}
              />
            </div>
            <BoxContent title={t("Alert Reasons")}>
              <div className="flex flex-wrap gap-2">
                {(alertDetails?.alertReasons ?? [])?.map(
                  (reason: IAlertReason, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-[2px] rounded-[4px] border-1 border-solid border-gray200 bg-gray50"
                    >{`${reason?.name} (${reason?.value})`}</span>
                  )
                )}
              </div>
            </BoxContent>
          </div>
        </BoxContent>
      </div>
    </WrapperSection>
  );
};

export default GeneralInformation;

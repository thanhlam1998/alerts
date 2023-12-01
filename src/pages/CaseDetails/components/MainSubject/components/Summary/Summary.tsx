import BoxContent from "components/BoxContent";
import InvolvedTransactions from "components/InvolvedTransactions";
import { ICaseMainSubject } from "interfaces/case";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { DEFAULT_CURRENCY, DEFAULT_VALUES } from "scripts/constants";
import { convertToDisplay, formatMoney } from "scripts/helpers";

interface ISummaryProps {
  mainSubjectData?: ICaseMainSubject;
}

const Summary = ({ mainSubjectData }: ISummaryProps) => {
  const { t } = useTranslation();

  return (
    <BoxContent title={t("Summary")} theme="gray">
      <div className="flex flex-col gap-2">
        <div className="grid gap-2 grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="sm_body_b2_reg text-gray500">
              {t("Total Transaction Frequency")}
            </span>
            <span className="sm_body_b1_semi text-gray800">
              {convertToDisplay(
                mainSubjectData?.totalTransactionFrequency ?? 0
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="sm_body_b2_reg text-gray500">
              {t("Total Transaction Amount")}
            </span>
            <span className="sm_body_b1_semi text-gray800">
              {!isEmpty(mainSubjectData?.totalTransactionAmount ?? {})
                ? formatMoney(
                    mainSubjectData?.totalTransactionAmount?.amount ?? 0,
                    mainSubjectData?.totalTransactionAmount?.currency ??
                      DEFAULT_CURRENCY
                  )
                : null}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InvolvedTransactions
            {...{
              isInFlow: true,
              totalFrequencies: mainSubjectData?.inflowSummary?.frequency ?? 0,
              totalAmounts:
                (mainSubjectData?.inflowSummary?.amount ?? {})?.amount ?? 0,
              currency:
                (mainSubjectData?.inflowSummary?.amount ?? {})?.currency ??
                DEFAULT_CURRENCY,
              totalCIFInvolved: mainSubjectData?.inflowSummary?.recipients ?? 0,
            }}
          />
          <InvolvedTransactions
            {...{
              isInFlow: false,
              totalFrequencies: mainSubjectData?.outflowSummary?.frequency ?? 0,
              totalAmounts:
                (mainSubjectData?.outflowSummary?.amount ?? {})?.amount ?? 0,
              currency:
                (mainSubjectData?.outflowSummary?.amount ?? {})?.currency ??
                DEFAULT_CURRENCY,
              totalCIFInvolved:
                mainSubjectData?.outflowSummary?.recipients ?? 0,
            }}
          />
        </div>
      </div>
    </BoxContent>
  );
};

export default Summary;

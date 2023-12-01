import BoxContent from "components/BoxContent";
import { useTranslation } from "react-i18next";
import { DEFAULT_CURRENCY } from "scripts/constants";
import { convertToDisplay, formatMoney } from "scripts/helpers";

const InvolvedTransactions = ({
  isInFlow = true,
  totalFrequencies = 0,
  totalAmounts = 0,
  currency = DEFAULT_CURRENCY,
  totalCIFInvolved = 0,
}: {
  isInFlow: boolean;
  totalFrequencies: number;
  totalAmounts: number;
  currency?: string;
  totalCIFInvolved: number;
}) => {
  const { t } = useTranslation();

  return (
    <BoxContent
      title={
        isInFlow
          ? t("Involved In-flow Transactions")
          : t("Involved Out-flow Transactions")
      }
      theme="white"
    >
      <div className="grid grid-cols-3 gap-[6px]">
        <div className="flex flex-col gap-1">
          <span className="sm_body_b3_reg text-gray500">
            {t("Total Frequencies")}
          </span>
          <span className="sm_body_b2_reg text-gray800">
            {convertToDisplay(totalFrequencies)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="sm_body_b3_reg text-gray500">
            {t("Total Amounts")}
          </span>
          <span className="sm_body_b2_reg text-gray800">
            {formatMoney(totalAmounts, currency)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="sm_body_b3_reg text-gray500">
            {t("Total CIFs Involved")}
          </span>
          <span className="sm_body_b2_reg text-gray800">
            {convertToDisplay(totalCIFInvolved)}
          </span>
        </div>
      </div>
    </BoxContent>
  );
};

export default InvolvedTransactions;

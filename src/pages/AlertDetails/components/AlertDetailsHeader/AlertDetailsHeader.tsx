import Button from "components/Button";
import { getTagColor } from "components/Tag/Tag";
import WrapperSection from "components/WrapperSection";
import BackV2 from "components/svgs/BackV2";
import { IAlertDetail } from "interfaces/alertsQueue";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ALERT_PRIORITIES, ALERT_PRIORITY_OPTIONS } from "scripts/constants";
import { emptyFunction, getAlertPriorityColor } from "scripts/helpers";

const AlertDetailsHeader = ({
  loading = false,
  alertDetails,
}: {
  loading: boolean;
  alertDetails?: IAlertDetail;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const priorityColor = getAlertPriorityColor(
    alertDetails?.customerPriority as ALERT_PRIORITIES
  );
  const dropdownColor = getTagColor(priorityColor);
  const priorityName = ALERT_PRIORITY_OPTIONS(t)?.find(
    (item: any) => item?.value === alertDetails?.customerPriority
  )?.name;

  return (
    <WrapperSection
      icon={<BackV2 className="cursor-pointer " onClick={() => navigate(-1)} />}
      className="alert-details__header"
      headerClassName="!mb-0 pl-2"
      title={
        loading ? (
          <span className="sm_body_b1_semi text-gray800">
            {t("Loading...")}
          </span>
        ) : (
          <div className="flex items-center sm_body_b1_semi text-gray800 gap-2">
            <span>{alertDetails?.customerName}</span>
            <span>{alertDetails?.cif}</span>
            <div
              style={{ background: dropdownColor?.backgroundColor }}
              className="bg-[#fafafd] rounded px-2 py-[2px] flex justify-center items-center gap-1"
            >
              <span className="text-gray600 sm_body_b2_reg">
                {t("Priority")}
              </span>
              <span
                className="text-blue600 sm_body_b2_semi"
                style={{ color: dropdownColor?.textColor }}
              >
                {priorityName}
              </span>
            </div>
          </div>
        )
      }
    />
  );
};

export default AlertDetailsHeader;

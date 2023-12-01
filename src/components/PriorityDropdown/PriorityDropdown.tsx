import Dropdown from "components/Dropdown";
import LoadingIcon from "components/Select/LoadingIcon";
import { getTagColor } from "components/Tag/Tag";
import ChevronDown from "components/svgs/ChevronDown";
import { IAlertPriority } from "interface/alerts";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ALERT_PRIORITY_OPTIONS,
  CASE_PRIORITIES,
  CASE_PRIORITY_OPTIONS,
} from "scripts/constants";
import { getAlertPriorityColor } from "scripts/helpers";
import "./PriorityDropdown.scss";

const PriorityDropdown = ({
  priority,
  className = "",
  onChangePriority,
  loading = false,
  type = "ALERT",
  disabled,
}: {
  priority: IAlertPriority | CASE_PRIORITIES;
  className?: string;
  onChangePriority: (status: any) => void;
  loading?: boolean;
  type: "ALERT" | "CASE";
  disabled?: boolean;
}) => {
  const { t } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const isAlert = type === "ALERT";

  const tagColor = getAlertPriorityColor(priority as any);
  const dropdownColor = getTagColor(tagColor);

  const priorityName = (
    isAlert ? ALERT_PRIORITY_OPTIONS(t) : CASE_PRIORITY_OPTIONS(t)
  )?.find((item: any) => item?.value === priority)?.name;

  return (
    <Dropdown
      className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      menu={{
        items: (isAlert
          ? ALERT_PRIORITY_OPTIONS(t)
          : CASE_PRIORITY_OPTIONS(t)
        ).map((item: any) => ({
          label: item?.name,
          key: item?.value,
        })),
        onClick: (e) => onChangePriority(e?.key as any),
      }}
      {...{ disabled, loading: disabled }}
    >
      <div
        style={{ background: dropdownColor?.backgroundColor }}
        className={`bg-[#fafafd] rounded px-2 py-[2px] flex justify-center items-center gap-2 ${className}`}
        onClick={() => !loading && setDropdownVisible(!dropdownVisible)}
      >
        {loading && (
          <LoadingIcon className="animate-spin mr-2 h-[10px] w-[10px]" />
        )}
        <span className="text-gray600 sm_body_b2_reg">{t("Priority")}</span>
        <span
          className="text-blue600 sm_body_b2_semi"
          style={{ color: dropdownColor?.textColor }}
        >
          {priorityName}
        </span>
        {!disabled ? <ChevronDown width={12} height={12} color={dropdownColor?.textColor} />  : null}
      </div>
    </Dropdown>
  );
};

export default PriorityDropdown;

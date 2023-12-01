import BackButton from "components/svgs/BackButton";
import moment from "moment";
import { memo } from "react";
import { PICKER_MONTHS_TO_ADD } from "scripts/constants";
import React from "react";

const PickerHeader = ({ yearSelected, setYearSelected }: any) => {
  const YEAR_ALLOW_TO = moment().add(PICKER_MONTHS_TO_ADD, "M").year();
  const onScrollToTop = () => {
    return document.getElementById("week-content")?.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="sm-date-picker-header justify-between flex">
      <BackButton
        role="button"
        className="flex cursor-pointer"
        onClick={() => {
          setYearSelected(yearSelected - 1);
          onScrollToTop();
        }}
      />
      <span className="flex sm_body_b1_semi">{yearSelected}</span>
      <BackButton
        role="button"
        className={`flex rotate-180-deg ${
          +yearSelected < YEAR_ALLOW_TO ? "cursor-pointer" : "opacity-0 cursor-default"
        }`}
        onClick={() => {
          setYearSelected(+yearSelected + 1 < YEAR_ALLOW_TO ? +yearSelected + 1 : YEAR_ALLOW_TO);
          onScrollToTop();
        }}
      />
    </div>
  );
};
export default memo(PickerHeader);

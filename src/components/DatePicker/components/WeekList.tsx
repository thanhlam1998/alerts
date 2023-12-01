import moment from "moment";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { DATE_FORMAT, PICKER_TYPES, PICKER_WEEKS_TO_ADD } from "scripts/constants";
import PickerHeader from "./PickerHeader";
import React from 'react'

const WeekList = ({
  yearSelected,
  setYearSelected,
  onChangePicker,
  from,
  to,
  allowedFrom,
}: any) => {
  const { t } = useTranslation();
  const WEEK_RANGE = [...Array(moment().year(yearSelected).isoWeeksInYear()).keys()]?.map(
    (i) => i + 1,
  );

  return (
    <div className="sm-date-picker">
      <PickerHeader {...{ yearSelected, setYearSelected }} />
      <div
        id="week-content"
        className="sm-date-picker-body py-[8px] pt-[0px] mt-[16px] grid grid-cols-4 gap-2 pr-[3px] justify-between overflow-y-scroll h-[220px]"
      >
        {WEEK_RANGE?.map((week: number) => {
          const fromValue = moment()
            .year(yearSelected)
            .isoWeek(week)
            .startOf("isoWeek")
            .format(DATE_FORMAT);
          const toValue = moment()
            .year(yearSelected)
            .isoWeek(week)
            .endOf("isoWeek")
            .format(DATE_FORMAT);

          // if (moment(toValue) > moment()) {
          //   toValue = moment().format(DATE_FORMAT);
          // }

          const weekItemNum = moment().year(yearSelected).week(week).week();
          const currenYearAdd13Weeks = moment().add(PICKER_WEEKS_TO_ADD, "weeks").year();
          const weekAllowedTo =
            yearSelected === currenYearAdd13Weeks
              ? moment().add(PICKER_WEEKS_TO_ADD, "weeks").isoWeek()
              : moment().year(yearSelected).isoWeek();

          let isAllowSelection = !(
            weekItemNum > weekAllowedTo && currenYearAdd13Weeks === yearSelected
          );

          if (allowedFrom) {
            const weekAllowedFrom = moment.utc(allowedFrom, DATE_FORMAT).format("GGGGWW");
            const week = `${yearSelected}${('0' + weekItemNum).slice(-2)}`
            isAllowSelection =
              isAllowSelection &&
              !!((week) >= (weekAllowedFrom));
          }

          return (
            <div
              key={week}
              onClick={() =>
                isAllowSelection && onChangePicker(PICKER_TYPES?.weekly, fromValue, toValue)
              }
              className={`cursor-pointer p-[8px] time-item sm_body_b2_reg 
              ${moment.utc(from, DATE_FORMAT).format("GGGGWW") === moment.utc(fromValue, DATE_FORMAT).format("GGGGWW") &&
                  moment.utc(to, DATE_FORMAT).format("GGGGWW") === moment.utc(toValue, DATE_FORMAT).format("GGGGWW") ? `time-active sm_body_b2_semi` : ``}
              ${isAllowSelection ? "cursor-pointer" : "cursor-not-allowed disabled"}
              `}
            >
              {`${t("W")}${week}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(WeekList);

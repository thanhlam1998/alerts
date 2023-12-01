import { range } from "lodash";
import moment from "moment";
import { memo } from "react";
import { DATE_FORMAT, PICKER_MONTHS_TO_ADD, PICKER_TYPES } from "scripts/constants";
import PickerHeader from "./PickerHeader";
import React from 'react'

const MonthList = ({
  yearSelected,
  setYearSelected,
  onChangePicker,
  from,
  to,
  allowedFrom,
}: any) => {
  return (
    <div className="sm-date-picker">
      <PickerHeader {...{ yearSelected, setYearSelected }} />
      <div className="sm-date-picker-body py-[8px] grid grid-cols-3 gap-2 justify-between">
        {range(12)?.map((month: number) => {
          const fromValue = moment()
            .year(yearSelected)
            .month(month)
            .startOf("month")
            .format(DATE_FORMAT);
          const toValue = moment()
            .year(yearSelected)
            .month(month)
            .endOf("month")
            .format(DATE_FORMAT);

          // if (moment(toValue) > moment()) {
          //   toValue = moment().format(DATE_FORMAT);
          // }

          const monthItemNum = moment().year(yearSelected).month(month).month();

          const currenYearAdd3Months = moment().add(PICKER_MONTHS_TO_ADD, "months").year();
          const monthAllowedTo =
            yearSelected === currenYearAdd3Months
              ? moment().add(PICKER_MONTHS_TO_ADD, "months").month()
              : moment().year(yearSelected).month();
          let isAllowSelection = !(
            monthItemNum > monthAllowedTo && currenYearAdd3Months === yearSelected
          );
          if (allowedFrom) {
            const monthAllowedFrom = moment(allowedFrom, DATE_FORMAT).month();
            const yearAllowedFrom = moment(allowedFrom, DATE_FORMAT).year();
            isAllowSelection =
              isAllowSelection &&
              !!((yearSelected * 12 + monthItemNum) >= (yearAllowedFrom * 12 + monthAllowedFrom));
          }

          return (
            <div
              key={month}
              onClick={() =>
                isAllowSelection && onChangePicker(PICKER_TYPES?.monthly, fromValue, toValue)
              }
              className={`cursor-pointer my-[8px] time-item sm_body_b2_reg 
              ${from === fromValue && to === toValue ? `time-active sm_body_b2_semi` : ``}
              ${isAllowSelection ? "cursor-pointer" : "cursor-not-allowed disabled"}

              `}
            >
              {moment().month(month).format("MMM")}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(MonthList);

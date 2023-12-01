import BackButton from "components/svgs/BackButton";
import moment from "moment";
import { memo } from "react";
import { DATE_FORMAT, PICKER_MONTHS_TO_ADD, PICKER_TYPES } from "scripts/constants";
import { arrFromRange } from "scripts/helpers";
import React from 'react'

const YearList = ({
  yearPageIndex,
  yearRange,
  setYearPageIndex,
  setYearSelected,
  onChangePicker,
  from,
  to,
  allowedFrom,
}: any) => {
  return (
    <div className="sm-date-picker">
      <div className="sm-date-picker-header justify-between flex">
        <BackButton
          role="button"
          className="flex cursor-pointer"
          onClick={() => setYearPageIndex(yearPageIndex + 1)}
        />
        <span className="flex sm_body_b1_semi">
          {yearRange?.from + 1} - {yearRange?.to}
        </span>
        <BackButton
          role="button"
          className={`flex rotate-180-deg ${
            yearPageIndex > 0 ? "cursor-pointer" : "opacity-0 cursor-default"
          }`}
          onClick={() => {
            setYearPageIndex(yearPageIndex - 1 > 0 ? yearPageIndex - 1 : 0);
          }}
        />
      </div>
      <div className="sm-date-picker-body py-[8px] grid grid-cols-3 gap-y-2 gap-x-3 justify-between">
        {arrFromRange(yearRange?.from, yearRange?.to)?.map((year: number) => {
          const fromValue = moment().year(year).startOf("year").format(DATE_FORMAT);
          const toValue = moment().year(year).endOf("year").format(DATE_FORMAT);
        
          const yearItemNum = moment().year(year).year(); 
          const yearAllowTo = moment().add(PICKER_MONTHS_TO_ADD, "M").year(); // CA-1240

          let isAllowSelection = !(yearItemNum > yearAllowTo);
          if (allowedFrom) {
            const yearAllowedFrom = moment(allowedFrom, DATE_FORMAT).year();
            isAllowSelection = isAllowSelection && !(yearAllowedFrom > yearItemNum);
          }

          return (
            <div
              key={year}
              onClick={() => {
                if (isAllowSelection) {
                  setYearSelected(+year);
                  onChangePicker(PICKER_TYPES?.yearly, fromValue, toValue);
                }
              }}
              className={`cursor-pointer my-[6px] time-item sm_body_b2_reg ${
                from === fromValue && to === toValue ? "time-active sm_body_b2_semi" : ""
              }
              ${isAllowSelection ? "cursor-pointer" : "cursor-not-allowed disabled"}
              `}
            >
              {moment().year(year).format("Y")}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(YearList);

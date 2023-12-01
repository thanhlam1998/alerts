import moment from "moment";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { DATE_FORMAT, PICKER_QUARTERS_TO_ADD, PICKER_TYPES } from "scripts/constants";
import PickerHeader from "./PickerHeader";
import React  from 'react'

const QuarterList = ({
  yearSelected,
  setYearSelected,
  onChangePicker,
  from,
  to,
  allowedFrom,
}: any) => {
  const { t } = useTranslation();
  return (
    <div className="sm-date-picker">
      <PickerHeader {...{ yearSelected, setYearSelected }} />
      <div className="sm-date-picker-body py-[8px] grid grid-cols-1">
        {[
          {
            quarter: 1,
            months: [1, 2, 3],
          },
          {
            quarter: 2,
            months: [4, 5, 6],
          },
          {
            quarter: 3,
            months: [7, 8, 9],
          },
          {
            quarter: 4,
            months: [10, 11, 12],
          },
        ]?.map((item: any) => {
          const fromValue = moment()
            .year(yearSelected)
            .quarter(+item?.quarter)
            .startOf("quarters")
            .format(DATE_FORMAT);
          const toValue = moment()
            .year(yearSelected)
            .quarter(+item?.quarter)
            .endOf("quarters")
            .format(DATE_FORMAT);

          // if (moment(toValue) > moment()) {
          //   toValue = moment().format(DATE_FORMAT);
          // }

          const quarterItemNum = moment().year(yearSelected).quarter(item?.quarter).quarter();
          const currenYearAdd1Quarter = moment().add(PICKER_QUARTERS_TO_ADD, "quarters").year();
          const quarterAllowedTo =
            yearSelected === currenYearAdd1Quarter
              ? moment().add(PICKER_QUARTERS_TO_ADD, "quarters").quarter()
              : moment().year(yearSelected).quarter();

          let isAllowSelection = !(
            quarterItemNum > quarterAllowedTo && currenYearAdd1Quarter === yearSelected
          );
          if (allowedFrom) {
            const quarterAllowedFrom = moment(allowedFrom, DATE_FORMAT).quarter();
            const yearAllowedFrom = moment(allowedFrom, DATE_FORMAT).year();
            isAllowSelection =
              isAllowSelection &&
              !!((yearSelected * 12 + quarterItemNum * 3) >= (yearAllowedFrom * 12 + quarterAllowedFrom * 3));
          }

          return (
            <div
              key={item?.quarter}
              onClick={() =>
                isAllowSelection && onChangePicker(PICKER_TYPES?.quarterly, fromValue, toValue)
              }
              className={`time-item rounded-[12px] my-[5px] p-[5px] sm_body_b2_reg ${from === fromValue && to === toValue ? `time-active sm_body_b2_semi` : ``
                }
              ${isAllowSelection ? "cursor-pointer" : "cursor-not-allowed disabled"}
              `}
            >
              <div className="grid grid-cols-4 gap-2 justify-between w-full">
                <div className="flex justify-center p-[8px] ">
                  {t("Q")}
                  {item?.quarter}
                </div>
                {item?.months?.map((month: number) => {
                  return (
                    <div
                      key={month}
                      className="flex justify-center p-[8px] whitespace-nowrap truncate max-w-[59px] sm_body_b2_reg"
                    >
                      {moment()
                        .month(month - 1)
                        .format("MMM")}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(QuarterList);

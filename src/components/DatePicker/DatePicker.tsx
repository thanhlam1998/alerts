/* eslint-disable no-restricted-globals */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { Tabs } from "antd";
import FilterButton from "components/FilterButton";
import FilterIcon from "components/svgs/Filter";
import useOnClickOutside from "hooks/useClickOutside";
import { includes, upperFirst, values } from "lodash";
import moment from "moment";
import queryString from "query-string";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { DATE_FORMAT, PICKER_TYPES, PICKER_TYPES_LABEL } from "scripts/constants";
import { getDefaultPickerTime } from "scripts/helpers";
import MonthList from "./components/MonthList";
import QuarterList from "./components/QuarterList";
import WeekList from "./components/WeekList";
import YearList from "./components/YearList";
import "./DatePicker.scss";
const { TabPane } = Tabs;

const YEAR_PAGE_SIZE = 12;
const CURRENT_YEAR = moment().year();

const getYearByPageIndex = (pageIndex: number) => {
  return moment()
    .add(6, "years")
    .subtract(pageIndex * YEAR_PAGE_SIZE, "years")
    .year(); // CA-1240
};

const getLabelBtnPicker = (pickerType = PICKER_TYPES?.monthly, fromInput: any, toInput: any, t: any) => {
  let time: any = toInput;
  if (
    pickerType === PICKER_TYPES?.weekly &&
    moment(fromInput, DATE_FORMAT).format("YYYY") !== moment(toInput, DATE_FORMAT).format("YYYY")
  ) {
    if (+moment(toInput, DATE_FORMAT).isoWeek() >= 52) {
      time = fromInput;
    } else {
      time = toInput;
    }
  }


  if (pickerType === PICKER_TYPES?.yearly) {
    return moment(time, DATE_FORMAT).format("YYYY");
  } else if (pickerType === PICKER_TYPES?.quarterly) {
    return `Q${moment(time, DATE_FORMAT).quarter()} ${moment(time).format("YYYY")}`;
  } else if (pickerType === PICKER_TYPES?.monthly) {
    return moment(time, DATE_FORMAT).format("MMMM YYYY");
  } else if (pickerType === PICKER_TYPES?.weekly) {
    return `${t("Week")} ${moment(time, DATE_FORMAT).format("W")} ${moment(time, DATE_FORMAT).format("YYYY")}`;
  } else {
    return moment(time, DATE_FORMAT).format("MMM YYYY");
  }
};

export const pickerAttribute = {
  isMounted: true,
};

const DatePicker = ({
  typeToShow = PICKER_TYPES?.monthly,
  from = "",
  to = "",
  onChange = () => { },
  children,
  pickerClassName = ``,
  buttonClassName = ``,
  allowedFrom,
  loading = false,
}: any) => {
  const queryData = queryString?.parse(location?.search) as any | null;
  const [_searchParams, setSearchParams] = useSearchParams();
  const wrapperRef = useRef(null);
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [yearPageIndex, setYearPageIndex] = useState(0);
  const [yearSelected, setYearSelected] = useState(+CURRENT_YEAR);

  const [tabSelected, setTabSelected] = useState(PICKER_TYPES?.monthly);

  const [yearRange, setYearRange] = useState({
    from: getYearByPageIndex(yearPageIndex + 1),
    to: getYearByPageIndex(yearPageIndex),
  });

  useOnClickOutside(wrapperRef, () => {
    setIsVisible(false);
    setTabSelected(typeToShow);

    if (
      queryData?.pickerType === PICKER_TYPES?.weekly &&
      moment(from, DATE_FORMAT).format("YYYY") !== moment(to, DATE_FORMAT).format("YYYY")
    ) {
      if (+moment(to, DATE_FORMAT).isoWeek() >= 52) {
        setYearSelected(moment(from, DATE_FORMAT).year());
      } else {
        setYearSelected(moment(to, DATE_FORMAT).year());
      }
    } else {
      setYearSelected(moment(to, DATE_FORMAT).year());
    }
  });

  const onResetDatePicker = () => {
    setSearchParams(queryString.stringify({ ...queryData, ...getDefaultPickerTime() }), {
      replace: true,
    });
  };

  useEffect(() => {
    if (!loading && pickerAttribute?.isMounted) {
      if (!typeToShow || !queryData?.pickerType || !includes(values(PICKER_TYPES), typeToShow)) {
        onResetDatePicker();
        return;
      }

      if (queryData?.from?.length !== 10 || queryData?.to?.length !== 10) {
        onResetDatePicker();
        return;
      }

      if ((queryData?.from && !queryData?.to) || (!queryData?.from && queryData?.to)) {
        onResetDatePicker();
        return;
      }

      if (allowedFrom) {
        if (moment.utc(allowedFrom, DATE_FORMAT) > moment.utc(from)) {
          onResetDatePicker();
          return;
        }
      }

      if (moment(from, DATE_FORMAT) > moment(to, DATE_FORMAT)) {
        onResetDatePicker();
        return;
      }

      if (queryData?.pickerType === PICKER_TYPES?.weekly) {
        // DON'T ADD 7 DAYS, BECAUSE WE NEED TO INCLUDES DAY FROM

        // IF FROM + 1 WEEK (-1) === TO : OK
        // IF TO === NOW AND TO - FROM < = 6 : OK
        if (
          moment.utc(queryData?.from, DATE_FORMAT)
            .add(1, "weeks")
            .subtract(1, "d")
            .format(DATE_FORMAT) === moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ||
          (moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ===
            moment.utc().format(DATE_FORMAT) &&
            moment.utc(queryData?.to, DATE_FORMAT).diff(moment.utc(queryData?.from, DATE_FORMAT), "days") <=
            6) || (moment.utc(queryData?.from, DATE_FORMAT).format("GGGGWW") == moment.utc(queryData?.to, DATE_FORMAT).format("GGGGWW"))
        ) {
        } else {
          onResetDatePicker();
          return;
        }
      }
      if (queryData?.pickerType === PICKER_TYPES?.monthly) {
        if (
          moment.utc(queryData?.from, DATE_FORMAT)
            .add(1, "months")
            .subtract(1, "d")
            .format(DATE_FORMAT) === moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ||
          (moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ===
            moment.utc().format(DATE_FORMAT) &&
            +moment.utc(queryData?.from, DATE_FORMAT).format("D") === 1 &&
            moment.utc(queryData?.to, DATE_FORMAT).diff(moment.utc(queryData?.from), "days") <= 31) ||
          (moment.utc(queryData?.from, DATE_FORMAT).format("YYYYMM") == moment.utc(queryData?.to, DATE_FORMAT).format("YYYYMM"))
        ) {
        } else {
          onResetDatePicker();
          return;
        }
      }
      if (queryData?.pickerType === PICKER_TYPES?.quarterly) {
        const startMonthOfQuarter: any = +moment.utc(queryData?.from, DATE_FORMAT).format("M");
        if (
          moment.utc(queryData?.from, DATE_FORMAT)
            .add(1, "quarters")
            .subtract(1, "d")
            .format(DATE_FORMAT) === moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ||
          (moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ===
            moment.utc().format(DATE_FORMAT) &&
            +moment.utc(queryData?.from, DATE_FORMAT).format("D") === 1 &&
            includes([1, 4, 7, 10], startMonthOfQuarter) &&
            moment.utc(queryData?.to, DATE_FORMAT).diff(moment.utc(queryData?.from, DATE_FORMAT), "days") <=
            93) // count days of 3 month
          || (moment.utc(queryData?.from, DATE_FORMAT).format("YYYYQ") == moment.utc(queryData?.to, DATE_FORMAT).format("YYYYQ"))
        ) {
        } else {
          onResetDatePicker();
          return;
        }
      }

      if (queryData?.pickerType === PICKER_TYPES?.yearly) {
        if (
          moment.utc(queryData?.from, DATE_FORMAT)
            .add(1, "years")
            .subtract(1, "d")
            .format(DATE_FORMAT) === moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ||
          (moment.utc(queryData?.to, DATE_FORMAT).format(DATE_FORMAT) ===
            moment.utc().add(3, "M").format(DATE_FORMAT) &&
            +moment.utc(queryData?.from, DATE_FORMAT).format("D") === 1 &&
            moment.utc(queryData?.to, DATE_FORMAT).diff(moment.utc(queryData?.from, DATE_FORMAT), "days") <=
            366) // count days of 1 year
          || (moment.utc(queryData?.from, DATE_FORMAT).format("YYYY") == moment.utc(queryData?.to, DATE_FORMAT).format("YYYY"))
        ) {
        } else {
          onResetDatePicker();
          return;
        }
      }

      let year: any = moment.utc(to, DATE_FORMAT).year();
      if (
        queryData?.pickerType === PICKER_TYPES?.weekly &&
        moment.utc(from, DATE_FORMAT).format("YYYY") !== moment.utc(to, DATE_FORMAT).format("YYYY")
      ) {
        if (+moment.utc(to, DATE_FORMAT).isoWeek() >= 52) {
          year = moment.utc(from, DATE_FORMAT).year();
        } else {
          year = moment.utc(to, DATE_FORMAT).year();
        }
      }

      const currentYearPageIndex = +Math.floor(
        (moment.utc().add(3, "M").year() - year) / YEAR_PAGE_SIZE,
      );
      setYearPageIndex(currentYearPageIndex);
      setYearSelected(year);
    }
  }, [from, to, typeToShow, loading]);

  useEffect(() => {
    setTabSelected(typeToShow);
  }, [typeToShow]);

  // useEffect(() => {
  //   if (!queryData?.pickerType || !includes(values(PICKER_TYPES), queryData?.pickerType)) {
  //     delete queryData.pickerType;
  //     onResetDatePicker();
  //     return;
  //   }
  // }, [queryData?.pickerType]);

  useEffect(() => {
    setYearRange({
      from: getYearByPageIndex(yearPageIndex + 1),
      to: getYearByPageIndex(yearPageIndex),
    });
  }, [yearPageIndex]);

  const onChangeYearPage = (pIndex: number) => {
    setYearRange({
      from: getYearByPageIndex(pIndex + 1),
      to: getYearByPageIndex(pIndex),
    });
  };

  const onChangePicker = (type: string, fromValue: any, toValue: any) => {
    // if (moment(toValue) > moment()) {
    //   toValue = moment().format(DATE_FORMAT);
    // }

    if (allowedFrom) {
      if (moment(fromValue, DATE_FORMAT) < moment(allowedFrom, DATE_FORMAT)) {
        fromValue = moment(allowedFrom, DATE_FORMAT).format(DATE_FORMAT);
      }
    }

    onChange(type, fromValue, toValue);
    if (fromValue && toValue) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    pickerAttribute.isMounted = true;
  }, []);

  useEffect(() => {
    if (!loading && pickerAttribute?.isMounted) {
      if (!queryData?.from || !queryData?.to || !queryData?.pickerType) {
        setSearchParams(queryString.stringify({ ...queryData, ...getDefaultPickerTime() }), {
          replace: true,
        });
      }
    }
  }, [loading]);

  return (
    <div className={`sm-date-picker-container relative ${pickerClassName}`} ref={wrapperRef}>
      {children ? (
        children
      ) : (
        <>
          <FilterButton
            className={`${!loading ? "w-[150px] ml-2" : ""} ${buttonClassName} ${
              queryData?.from && queryData?.to ? "btn-picker-active" : ""
            } capitalize`}
            theme="with-icon"
            onClick={() => setIsVisible(!isVisible)}
            loading={loading}
            title={
              queryData?.from && queryData?.to
                ? getLabelBtnPicker(queryData?.pickerType, queryData?.from, queryData?.to, t)
                : t(`Time Range`)
            }
            icon={
              <FilterIcon
                className={!loading && queryData?.from && queryData?.to ? `text-blue500` : ``}
              />
            }
          />
        </>
      )}
      <div
        className={`sm-date-picker-popup w-[284px] h-[328px] p-[8px] absolute z-[999] ${
          isVisible ? "" : "hidden"
        }`}
      >
        <Tabs
          activeKey={tabSelected}
          onChange={(tabId: any) => {
            setTabSelected(tabId);
            setYearSelected(CURRENT_YEAR);
          }}
        >
          {/* <TabPane tab={upperFirst(PICKER_TYPES_LABEL(t)?.weekly)} key={PICKER_TYPES?.weekly}>
            <WeekList
              {...{
                yearSelected,
                setYearSelected,
                onChangePicker,
                from,
                to,
                allowedFrom,
              }}
            />
          </TabPane> */}
          <TabPane tab={upperFirst(PICKER_TYPES_LABEL(t)?.monthly)} key={PICKER_TYPES?.monthly}>
            <MonthList
              {...{
                yearSelected,
                setYearSelected,
                onChangePicker,
                from,
                to,
                allowedFrom,
              }}
            />
          </TabPane>
          <TabPane tab={upperFirst(PICKER_TYPES_LABEL(t)?.quarterly)} key={PICKER_TYPES?.quarterly}>
            <QuarterList
              {...{
                yearSelected,
                setYearSelected,
                onChangePicker,
                from,
                to,
                allowedFrom,
              }}
            />
          </TabPane>
          <TabPane tab={upperFirst(PICKER_TYPES_LABEL(t)?.yearly)} key={PICKER_TYPES?.yearly}>
            <YearList
              {...{
                yearPageIndex,
                yearRange,
                setYearPageIndex,
                setYearSelected,
                onChangePicker,
                yearSelected,
                from,
                to,
                onChangeYearPage,
                allowedFrom,
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default memo(DatePicker);

import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { memo, useEffect, useState } from "react";
import { useUpdateEffect } from "react-use";
import { RANGE_PICKER_FORMAT } from "scripts/constants";
import { emptyFunction, isTimeRangeValueValid } from "scripts/helpers";
import "./RangePicker.scss";

dayjs.extend(weekday);
dayjs.extend(localeData);

export interface IRangePickerProps {
  onChangeTimeRange: ({ from, to }: ITimeRangeValue) => void;
  timeRangeValue: ITimeRangeValue;
}

export interface ITimeRangeValue {
  from: number | null;
  to: number | null;
}

const RangePicker = ({
  timeRangeValue,
  onChangeTimeRange = emptyFunction,
}: IRangePickerProps) => {
  const [timeRangeSelected, setTimeRangeSelected] = useState<ITimeRangeValue>({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (!isTimeRangeValueValid(timeRangeValue)) {
      forceTimeRangeValueToDefault();
    } else if (
      timeRangeSelected?.from != timeRangeValue?.from ||
      timeRangeSelected?.to != timeRangeValue?.to
    ) {
      setTimeRangeSelected({
        from: timeRangeValue?.from,
        to: timeRangeValue?.to,
      });
    }
  }, [timeRangeValue]);

  useUpdateEffect(() => {
    if (
      timeRangeSelected?.from != timeRangeValue?.from ||
      timeRangeSelected?.to != timeRangeValue?.to
    ) {
      onChangeTimeRange({
        from: timeRangeSelected?.from,
        to: timeRangeSelected?.to,
      });
    }
  }, [timeRangeSelected]);

  const forceTimeRangeValueToDefault = () => {
    const today = new Date();
    const twoMonthsAgo = today.setMonth(today.getMonth() - 2);

    setTimeRangeSelected({
      from: dayjs(twoMonthsAgo).startOf("day").unix(),
      to: dayjs(new Date()).startOf("day").unix(),
    });
  };

  const onChange = (dates: null | (Dayjs | null)[]) => {
    if ((dates ?? [])?.length > 0) {
      const fromUnix = dayjs(dates?.[0]).unix();
      const toUnix = dayjs(dates?.[1]).unix();

      if (isTimeRangeValueValid({ from: fromUnix, to: toUnix })) {
        setTimeRangeSelected({
          from: fromUnix,
          to: toUnix,
        });
      }
    }
  };

  return (
    <DatePicker.RangePicker
      className="bri-range-picker"
      format={RANGE_PICKER_FORMAT}
      // @ts-ignore
      onChange={onChange}
      value={
        !isTimeRangeValueValid(timeRangeSelected)
          ? null
          : [
              dayjs((timeRangeSelected?.from as number) * 1000),
              dayjs((timeRangeSelected?.to as number) * 1000),
            ]
      }
      allowClear={false}
    />
  );
};

export default memo(RangePicker);

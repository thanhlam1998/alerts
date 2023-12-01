import Alert from "components/svgs/Alert";
import moment from "moment";
import React from "react";
import "./Steps.scss";

const data = [
  {
    icon: <Alert className="text-white" />,
    date: new Date(),
    time: new Date(),
    title: "Attached to Case",
    subTitle: (
      <div>
        <div>By: sheath@aliashere.com</div>
        <div>Status: Open</div>
        <div>Comment: Earlier tx from same subject</div>
      </div>
    ),
  },
  {
    icon: <Alert />,
    date: new Date(),
    time: new Date(),
    title: "Attached to Case",
    subTitle: "abc",
  },
  {
    icon: <Alert />,
    date: new Date(),
    time: new Date(),
    title: "Attached to Case",
    subTitle: "abc",
  },
];

const Steps = ({}: any) => {
  return (
    <div>
      {data?.map((item: any) => {
        return (
          <div className="flex flex-row">
            <div className="flex flex-col justify-center items-end sm_body_b2_reg text-sm mt-[28px]">
              <div>{moment.unix(item.date).format("DD-MM-YYYY")}</div>
              <div>{moment.unix(item.time).format("HH:MM A")}</div>
            </div>
            <div className="flex flex-row">
              <div className="mx-2 relative">
                <div className="flex flex-col p-1 relative z-10 rounded-lg border-solid border-[2px] bg-blue500 border-blue200 w-[26px] h-[26px] justify-center items-center">
                  <span className="text-white w-4 h-4">{item?.icon}</span>
                </div>
                <div className="h-full top-0 w-[2px] bg-blue200 absolute left-[13px]" />
              </div>

              <div className="flex flex-col mb-6">
                <div className="sm_body_b1_semi text-base text-gray800 leading-6">
                  {item?.title}
                </div>
                <div className="sm_body_b2_reg text-sm text-gray600 leading-5">
                  {item?.subTitle}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;

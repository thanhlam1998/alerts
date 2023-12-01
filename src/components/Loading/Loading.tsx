import React from "react";
import loading from "../../assets/icons/loading.svg";
import "./Loading.scss";
import { Spin } from "antd";

const Loading1 = ({ isFullScreen = false }: any) => {
  return (
    <div className={`bri-loading bri-loading__${isFullScreen ? "full" : ""}`}>
      <img src={loading} className="loading-spin" alt="Loading..." />
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[inherit] p-[30px_0px]">
      <Spin />
    </div>
  );
};


export default Loading;

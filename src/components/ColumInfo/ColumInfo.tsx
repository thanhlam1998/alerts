import React, { ReactNode } from "react";
import "./ColumInfo.scss";

const ColumInfo = ({
  label = "",
  value,
  size = "xs",
  className = "",
  valueClassName = "",
}: {
  label: string;
  value: ReactNode;
  className?: string;
  size?: "xs" | "sm";
  valueClassName?: string;
}) => {
  return (
    <div className={`colum-info colum-info flex flex-col ${className}`}>
      <div className={`colum-info-label colum-info-label-${size}`}>{label}</div>
      <div className={`colum-info-value colum-info-value-${size} ${valueClassName}`}>{value}</div>
    </div>
  );
};

export default ColumInfo;

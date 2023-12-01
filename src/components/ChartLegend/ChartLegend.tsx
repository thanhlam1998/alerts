import React from "react";

interface ChartLegendProps {
  color: string;
  name: string;
}

const ChartLegend = ({
  data,
  className = "",
}: {
  className?: string;
  data: ChartLegendProps[];
}) => {
  const renderLegend = (it: ChartLegendProps, index: number) => (
    <div key={index} className="flex flex-row items-center">
      <div className="w-3 h-3 rounded" style={{ background: it.color }} />
      <span className="sm_body_b2_reg ml-1">{it.name}</span>
    </div>
  );

  return (
    <div className={`flex flex-row gap-4 flex-wrap ${className}`}>
      {data?.map((it: ChartLegendProps, index: number) => renderLegend(it, index))}
    </div>
  );
};

export default ChartLegend;

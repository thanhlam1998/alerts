const DashboardSummaryItem = ({ label = "", value }: any) => {
  return (
    <div className="dashboard-summary__item border-0 border-r-[1px] border-solid border-[#E5E7EB] last:border-r-0">
      <div className="dashboard-summary__item-label sm_body_b3_reg text-gray500">
        {label}
      </div>
      <div className="dashboard-summary__item-value sm_heading_h5 text-blue500">
        {value}
      </div>
    </div>
  );
};

export default DashboardSummaryItem;

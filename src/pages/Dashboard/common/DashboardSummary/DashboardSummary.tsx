import WrapperSection from "components/WrapperSection";
import { useTranslation } from "react-i18next";
import DashboardSummaryItem from "../DashboardSummaryItem";
import "./DashboardSummary.scss";

export interface IDashboardSummaryProps {
  loading: boolean;
  items: { label: string; value: any }[];
  title: string | React.ReactNode;
}

const DashboardSummary = ({
  title,
  loading,
  items,
}: IDashboardSummaryProps) => {
  const { t } = useTranslation();

  return (
    <WrapperSection
      {...{ title }}
      className="dashboard__summary !p-4 h-[124px]"
      loaderClassName="!p-0"
      loading={loading}
    >
      <div className="dashboard__summary-content">
        <div className="grid grid-cols-3 gap-2 dashboard__summary-items">
          {items?.map((item: { label: string; value: any }, index: number) => {
            return (
              <DashboardSummaryItem
                key={index}
                label={item?.label}
                value={item?.value}
              />
            );
          })}
        </div>
      </div>
    </WrapperSection>
  );
};

export default DashboardSummary;

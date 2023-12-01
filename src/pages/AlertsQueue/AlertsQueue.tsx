import AlertsQueueFilter from "./AlertsQueueFilter";
import AlertsQueueTable from "./AlertsQueueTable";
import Home from "components/svgs/Home";
import PageWrapper from "components/PageWrapper";
import WrapperSection from "components/WrapperSection";
import { alertMock } from "mock/Alert";
import { getAlertQueue } from "apis/alert";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const AlertsQueue = () => {
  const { t } = useTranslation();

  // TODO: Update correct api and remove initial data
  const { data: alertQueue, isLoading: alertQueueLoading } = useQuery(["alertsQueue"], getAlertQueue, {
    enabled: false,
    select: (data) => data?.data,
    initialData: { data: alertMock },
  });

  return (
    <PageWrapper
      className="alerts-queue"
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "#",
          title: t("Alerts Queue"),
        },
      ]}>
      <WrapperSection title={t("Alerts Queue")} headerClassName="!mb-0 pl-2" className="mb-4" />
      <WrapperSection title={t("Alerts Queue")} className="!p-4" loading={alertQueueLoading}>
        <div className="flex flex-col gap-4">
          <AlertsQueueFilter data={alertQueue} />
          <AlertsQueueTable data={alertQueue} />
        </div>
      </WrapperSection>
    </PageWrapper>
  );
};

export default AlertsQueue;

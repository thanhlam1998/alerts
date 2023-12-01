import AlertTransactionDetailsModal from "components/AlertTransactionDetailsModal";
import PageWrapper from "components/PageWrapper";
import Home from "components/svgs/Home";
import { IAlertDetail, IAlertItemByCIF } from "interfaces/alertsQueue";
import { ICaseCategory } from "interfaces/case";
import { isEmpty } from "lodash";
import NotFound from "pages/NotFound";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AlertDetailsHeader from "./components/AlertDetailsHeader";
import CloseAlerts from "./components/CloseAlerts";
import GeneralInformation from "./components/GeneralInformation";
import NetworkConnection from "./components/NetworkConnection";
import OpenAlerts from "./components/OpenAlerts";
import SummaryOfTransactions from "./components/SummaryOfTransactions";
import { useMutation } from "react-query";
import { downloadURL } from "scripts/helpers";
import { AlertApis } from "apis";

export interface IAlertCategoriesData {
  isGettingAlertCategories: boolean;
  alertCategoriesData?: ICaseCategory[];
}

interface IAlertDetailsViewProps extends IAlertCategoriesData {
  isGettingAlertDetails: boolean;
  alertDetails?: IAlertDetail;
}

const AlertDetailsView = ({
  isGettingAlertDetails = false,
  alertDetails,

  isGettingAlertCategories,
  alertCategoriesData,
}: IAlertDetailsViewProps) => {
  const { t } = useTranslation();

  const [alertSelected, setAlertSelected] = useState<IAlertItemByCIF | null>(
    null
  );
  const [alertTransactionDetailsOpen, setAlertTransactionDetailsOpen] =
    useState<boolean>(false);

  const isEmptyAlertDetails = isEmpty(alertDetails) && !isGettingAlertDetails;

  if (isEmptyAlertDetails) return <NotFound />;

  const onAlertRowClick = (alertItem: IAlertItemByCIF) => {
    setAlertSelected(alertItem);
    setAlertTransactionDetailsOpen(true);
  };

  return (
    <PageWrapper
      className="alert-details"
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "/alerts",
          title: t("Alerts Queue"),
        },
        {
          href: "#",
          title: t("Alert Details"),
        },
      ]}
    >
      <div className="alert-details__wrapper flex flex-col gap-4">
        <AlertDetailsHeader
          {...{ 
            loading: isGettingAlertDetails, 
            alertDetails,
          }}
        />
        <GeneralInformation
          {...{
            loading: isGettingAlertDetails,
            alertDetails,
          }}
        />
        <SummaryOfTransactions />
        <NetworkConnection />
        <OpenAlerts
          {...{
            onAlertRowClick,
            isGettingAlertCategories,
            alertCategoriesData,
          }}
        />
        <CloseAlerts
          {...{
            onAlertRowClick,
            isGettingAlertCategories,
            alertCategoriesData,
          }}
        />
      </div>

      {!isEmpty(alertDetails) && (
        <AlertTransactionDetailsModal
          {...{
            visible: alertTransactionDetailsOpen,
            closeModal: () => {
              setAlertSelected(null);
              setAlertTransactionDetailsOpen(false);
            },
            alertSelected,
            alertDetails,
            type: "Entity",
          }}
        />
      )}
    </PageWrapper>
  );
};

export default AlertDetailsView;

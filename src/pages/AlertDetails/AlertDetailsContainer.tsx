import { AlertApis, GeneralApis } from "apis";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import AlertDetailsView from "./AlertDetailsView";

const AlertDetailsContainer = () => {
  const { alertCIFNumber = "" } = useParams();

  const { isLoading: isGettingAlertDetails, data: alertDetailsData }: any =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_ALERT_DETAILS, alertCIFNumber],
      () => AlertApis.getAlertDetails(alertCIFNumber),
      { enabled: !!alertCIFNumber }
    );

  const {
    isLoading: isGettingAlertCategories,
    data: alertCategoriesData,
  }: any = useQuery(
    [BRI_USE_QUERY_REQUEST_KEY_NAMES.GENERAL.GET_ALERT_CATEGORIES],
    GeneralApis.getAlertCategories
  );

  return (
    <AlertDetailsView
      {...{
        isGettingAlertDetails,
        alertDetails: alertDetailsData?.data,

        isGettingAlertCategories,
        alertCategoriesData: alertCategoriesData?.data,
      }}
    />
  );
};

export default AlertDetailsContainer;

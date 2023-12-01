import WrapperSection from "components/WrapperSection";
import { ICaseMainSubject } from "interfaces/case";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import Accounts from "./components/Accounts";
import CustomerIdentity from "./components/CustomerIdentity";
import Summary from "./components/Summary";

interface IMainSubjectViewProps {
  isGettingMainSubject?: boolean;
  mainSubjectData?: ICaseMainSubject;
}

const MainSubjectView = ({
  isGettingMainSubject = false,
  mainSubjectData,
}: IMainSubjectViewProps) => {
  const { t } = useTranslation();

  return (
    <WrapperSection
      title={t("Main Subject")}
      className="case-details_main-subject p-6"
      {...{ loading: isGettingMainSubject }}
    >
      {isEmpty(mainSubjectData) ? null : (
        <div className="flex flex-col gap-4">
          <CustomerIdentity {...{ mainSubjectData }} />
          <Summary {...{ mainSubjectData }} />
          <Accounts {...{ mainSubjectData }} />
        </div>
      )}
    </WrapperSection>
  );
};

export default MainSubjectView;

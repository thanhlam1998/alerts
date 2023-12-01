import BoxContent from "components/BoxContent";
import { ICaseMainSubject } from "interfaces/case";
import { useTranslation } from "react-i18next";

interface ICustomerIdentityProps {
  mainSubjectData?: ICaseMainSubject;
}

const CustomerIdentity = ({ mainSubjectData }: ICustomerIdentityProps) => {
  const { t } = useTranslation();

  return (
    <BoxContent title={t("Customer Identity")} theme="gray">
      <div className="grid grid-cols-3 gap-2 customer-identity-info">
        {mainSubjectData?.identities?.map((identity, index) => {
          return (
            <div
              className="customer-identity-info__item flex flex-col gap-1"
              key={index}
            >
              <div className="customer-identity-info__item-label sm_body_b2_reg text-gray500">
                {identity?.name}
              </div>
              <div className="customer-identity-info__item-value sm_body_b1_semi text-gray800">
                {identity?.value}
              </div>
            </div>
          );
        })}
      </div>
    </BoxContent>
  );
};

export default CustomerIdentity;

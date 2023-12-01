import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./CreateAdhocCaseModal.scss";

interface ICreateAdhocCaseModalViewProps {
  visible?: boolean;
  closeModal?: (success?: boolean) => void;
  cif?: string;
  isLoading: boolean;
  callCreateAdhocCase: () => void;
}

const CreateAdhocCaseModalView: FC<ICreateAdhocCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
  isLoading,
  callCreateAdhocCase = emptyFunction,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="create-adhoc-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Create Adhoc Case")}
      onCancel={() => closeModal()}
      width={640}
      okText={t("Confirm")}
      buttonOkProps={{
        disabled: isLoading,
        theme: "standard",
      }}
      onOk={callCreateAdhocCase}
    >
      <div className="create-adhoc-case-modal__wrapper">
        <div className="flex items-center sm_body_b1_reg text-gray800 mb-4">
          <Trans
            defaults='Are you sure you want to Create Adhoc Case for this case <spanTag>"{{cif}}"</spanTag>?'
            components={{
              spanTag: <span className="sm_body_b1_semi ml-1" />,
            }}
            values={{ cif }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateAdhocCaseModalView;

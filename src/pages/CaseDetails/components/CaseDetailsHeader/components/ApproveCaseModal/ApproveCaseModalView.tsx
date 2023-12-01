import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./ApproveCaseModal.scss";

interface IApproveCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
  isLoading: boolean;
  callApproveCase: () => void;
}

const ApproveCaseModalView: FC<IApproveCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
  isLoading,
  callApproveCase = emptyFunction,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="approve-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Approve")}
      onCancel={closeModal}
      width={640}
      okText={t("Approve")}
      buttonOkProps={{
        disabled: isLoading,
        theme: "standard",
      }}
      onOk={callApproveCase}
    >
      <div className="approve-case-modal">
        <div className="flex flex-col sm_body_b1_reg text-gray800">
          <div className="flex items-center">
            <Trans
              defaults='Are you sure you want to approve this case <spanTag>"{{cif}}"</spanTag>?'
              components={{
                spanTag: <span className="sm_body_b1_semi ml-1" />,
              }}
              values={{ cif }}
            />
          </div>
          <span className="text-red400 mb-4">
            {t("You can’t undo this action.")}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveCaseModalView;

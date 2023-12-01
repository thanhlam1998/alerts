import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./ReOpenCaseModal.scss";

interface IReOpenCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
  isLoading: boolean;
  callReOpenCase: () => void;
}

const ReOpenCaseModalView: FC<IReOpenCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
  isLoading,
  callReOpenCase = emptyFunction,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="reopen-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Re-open")}
      onCancel={closeModal}
      width={640}
      okText={t("Re-open")}
      buttonOkProps={{
        disabled: isLoading,
        theme: "standard",
      }}
      onOk={callReOpenCase}
    >
      <div className="reopen-case-modal">
        <div className="flex flex-col sm_body_b1_reg text-gray800">
          <div className="flex items-center">
            <Trans
              defaults='Are you sure you want to re-open this case <spanTag>"{{cif}}"</spanTag>?'
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

export default ReOpenCaseModalView;

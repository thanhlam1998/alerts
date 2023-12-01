import { IRemoveIncidentalSubject } from "apis/cases";
import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { emptyFunction } from "scripts/helpers";
import "./DeleteIncidentalSubjectModal.scss";

interface DeleteIncidentalSubjectModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
  idType?: string;
  isLoading: boolean;
  callRemoveIncidentalSubject: (data: IRemoveIncidentalSubject) => void;
}

const DeleteIncidentalSubjectModalView: FC<
  DeleteIncidentalSubjectModalViewProps
> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
  idType,
  isLoading,
  callRemoveIncidentalSubject = emptyFunction,
}) => {
  const { t } = useTranslation();
  const { caseId = "" } = useParams();

  return (
    <Modal
      {...{ visible }}
      className="delete-incidental-subject-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Delete Incidental Subject")}
      onCancel={closeModal}
      width={640}
      okText={t("Delete")}
      buttonOkProps={{
        disabled: isLoading,
        theme: "red",
      }}
      onOk={() => {
        cif && idType && caseId && callRemoveIncidentalSubject({ caseId, cif, idType });
      }}
    >
      <div className="delete-incidental-subject-modal">
        <div className="flex flex-col sm_body_b1_reg text-gray800">
          <div className="flex items-center">
            <Trans
              defaults='Are you sure you want to delete Incidental Account # <spanTag>"{{cif}}"</spanTag>?'
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

export default DeleteIncidentalSubjectModalView;

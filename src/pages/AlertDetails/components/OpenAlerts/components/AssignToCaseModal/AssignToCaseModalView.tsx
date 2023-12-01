import { Form } from "antd";
import { IAssignAlertToCase } from "apis/alert";
import Modal from "components/Modal";
import Select from "components/Select";
import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CASE_PRIORITIES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./AssignToCaseModal.scss";

interface IAssignToCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  alertIdsSelected?: string[];

  isGettingAssignableCases?: boolean;
  assignableCasesData?: any[];

  isAssigning?: boolean;
  callAssignAlertToCase?: (data: IAssignAlertToCase) => void;
}

const AssignToCaseModalView: FC<IAssignToCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  alertIdsSelected = [],

  isGettingAssignableCases = false,
  assignableCasesData = [],

  isAssigning = false,
  callAssignAlertToCase = emptyFunction,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form?.resetFields();
  }, [visible]);

  const onFinish = (values?: any) => {
    callAssignAlertToCase({
      alertIds: alertIdsSelected,
      caseId: values.caseId,
    });
  };

  return (
    <Modal
      {...{ visible }}
      className="assign-to-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Assign To Case")}
      onOk={form.submit}
      onCancel={closeModal}
      width={640}
      okText={t("Assign")}
      buttonOkProps={{
        disabled: isGettingAssignableCases || isAssigning,
        htmlType: "submit",
        loading: isAssigning,
      }}
    >
      <div className="assign-to-case-modal__wrapper py-3">
        <Form
          initialValues={{ priority: CASE_PRIORITIES.MEDIUM }}
          {...{ form, onFinish }}
          name="createNewCaseForm"
          layout="vertical"
        >
          <div className="assign-to-case-modal__selected-alerts selected-alerts rounded-[8px] bg-gray100 p-2 mb-4">
            <div className="selected-alerts__title text-gray800 sm_body_b2_reg mb-1">
              {t(`Selected Alerts (${alertIdsSelected?.length})`)}
            </div>
            <div className="selected-alerts__items flex items-center flex-wrap gap-2">
              {alertIdsSelected?.map((alertId, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray50 border border-solid border-gray200 sm_body_b3_reg text-gray800 rounded-[4px]"
                >
                  {alertId}
                </span>
              ))}
            </div>
          </div>
          <Form.Item
            name="caseId"
            label={t("Case")}
            rules={[{ required: true, message: t("Please select a case") }]}
            className="assign-to-case-modal__form-item mb-0"
          >
            <Select
              disabled={isGettingAssignableCases}
              options={assignableCasesData?.map((item: any) => {
                return {
                  value: item?.caseId,
                  label: item?.name,
                };
              })}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(AssignToCaseModalView);

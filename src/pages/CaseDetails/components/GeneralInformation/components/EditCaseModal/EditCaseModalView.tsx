import { Input as AntInput, Form, Radio } from "antd";
import { IUpdateCaseData } from "apis/cases";
import Input from "components/Input";
import Modal from "components/Modal";
import Select from "components/Select";
import { ICaseCategory, ICaseDetail } from "interfaces/case";
import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  CASE_PRIORITIES,
  CASE_PRIORITY_OPTIONS,
  DECISION_OPTIONS,
} from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./EditCaseModal.scss";

interface IEditCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  caseDetails: ICaseDetail;

  isGettingCaseCategories?: boolean;
  caseCategoriesData?: ICaseCategory[];

  isUpdatingCase?: boolean;
  callUpdateCase?: (data: { caseId: string; data: IUpdateCaseData }) => void;
}

const EditCaseModalView: FC<IEditCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  caseDetails,

  isGettingCaseCategories = false,
  caseCategoriesData = [],

  isUpdatingCase = false,
  callUpdateCase = emptyFunction,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      priority: caseDetails?.priority,
      categories: caseDetails?.categories?.map(
        (category: ICaseCategory) => category.id
      ),
      description: caseDetails?.description,
      goAMLReportNumber: caseDetails?.goamlReportNumber,
      decision: caseDetails?.decision,
      ukerComment: caseDetails?.ukerComment,
      fiuRefNumber: caseDetails?.fiuRefNumber,
    });
  }, [caseDetails]);

  const onFinish = (values?: any) => {
    callUpdateCase({
      caseId: caseDetails.caseId,
      data: {
        priority: values.priority,
        categories: values.categories,
        description: values?.description ?? undefined,
        decision: values.decision,
        goamlReportNumber: values.goAMLReportNumber,
        ukerComment: values.ukerComment,
        fiuRefNumber: values.fiuRefNumber,
      },
    });
  };

  return (
    <Modal
      {...{ visible }}
      className="edit-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Edit Case")}
      onOk={form.submit}
      onCancel={closeModal}
      width={640}
      okText={t("Save")}
      buttonOkProps={{
        disabled: isGettingCaseCategories || isUpdatingCase,
        htmlType: "submit",
        loading: isUpdatingCase,
      }}
    >
      <div className="edit-case-modal__wrapper py-3">
        <Form
          initialValues={{ priority: CASE_PRIORITIES.MEDIUM }}
          {...{ form, onFinish }}
          name="createNewCaseForm"
          layout="vertical"
        >
          <Form.Item
            name="priority"
            label={t("Priority")}
            className="edit-case-modal__form-item mb-4"
            rules={[{ required: true, message: t("Please select a priority") }]}
          >
            <Radio.Group>
              {CASE_PRIORITY_OPTIONS(t).map((priority: any) => {
                return (
                  <Radio
                    key={priority?.value}
                    value={priority?.value}
                    disabled={isUpdatingCase}
                  >
                    {priority?.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="fiuRefNumber"
            label={t("FIU Ref #")}
            className="edit-case-modal__form-item mb-4"
          >
            <Input disabled={isUpdatingCase} />
          </Form.Item>

          <Form.Item
            name="categories"
            label={t("Categories")}
            rules={[{ required: true, message: t("Please select a category") }]}
            className="edit-case-modal__form-item mb-4"
          >
            <Select
              options={caseCategoriesData?.map((item: ICaseCategory) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
              multiple
              disabled={isUpdatingCase}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={t("Description")}
            className="edit-case-modal__form-item mb-4 bri-input"
          >
            <AntInput.TextArea
              rows={4}
              className="bg-gray50 !h-[62px]"
              disabled={isUpdatingCase}
            />
          </Form.Item>

          <Form.Item
            name="ukerComment"
            label={t("UKER Comment")}
            className="edit-case-modal__form-item mb-4 bri-input"
          >
            <AntInput.TextArea
              rows={4}
              className="bg-gray50 !h-[62px]"
              disabled={isUpdatingCase}
            />
          </Form.Item>

          <Form.Item
            name="goAMLReportNumber"
            label={t("GoAML Report Number")}
            className="edit-case-modal__form-item mb-4"
          >
            <Input disabled={isUpdatingCase} />
          </Form.Item>

          <Form.Item
            name="decision"
            label={t("Decision")}
            className="edit-case-modal__form-item !mb-0"
            rules={[{ required: true, message: t("Please select a decision") }]}
          >
            <Radio.Group>
              {DECISION_OPTIONS.map((decision: any) => {
                return (
                  <Radio
                    key={decision?.value}
                    value={decision?.value}
                    disabled={isUpdatingCase}
                  >
                    {decision?.label}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(EditCaseModalView);

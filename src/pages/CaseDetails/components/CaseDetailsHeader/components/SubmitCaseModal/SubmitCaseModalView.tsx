import { Input as AntInput, Form, Radio } from "antd";
import { ISubmitCase } from "apis/cases";
import Modal from "components/Modal";
import Select from "components/Select";
import { ICaseCategory, ICaseDetail } from "interfaces/case";
import { IUserListItem } from "interfaces/user";
import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  CASE_PRIORITIES,
  CASE_PRIORITY_OPTIONS,
  DECISION_ENUM,
  DECISION_OPTIONS,
} from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./SubmitCaseModal.scss";

interface ISubmitCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  caseDetails?: ICaseDetail;

  isGettingCaseCategories?: boolean;
  caseCategoriesData?: ICaseCategory[];

  isGettingCheckers?: boolean;
  checkersData?: IUserListItem[];

  isGettingSigners?: boolean;
  signersData?: IUserListItem[];

  isSubmitting?: boolean;
  callSubmitCase?: (data: { caseId: string; data: ISubmitCase }) => void;
}

const SubmitCaseModalView: FC<ISubmitCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  caseDetails,

  isGettingCaseCategories = false,
  caseCategoriesData = [],

  isGettingCheckers = false,
  checkersData = [],

  isGettingSigners = false,
  signersData = [],

  isSubmitting,
  callSubmitCase = emptyFunction,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { caseId = "" } = useParams();

  useEffect(() => {
    form.setFieldsValue({
      priority: caseDetails?.priority,
      categories: caseDetails?.categories?.map(
        (category: ICaseCategory) => category.id
      ),
      description: caseDetails?.description,
      decision: caseDetails?.decision,
      checkerEmail: null,
      signerEmail: null,
    });
  }, [caseDetails, visible]);

  const onFinish = (values?: any) => {
    callSubmitCase({
      caseId,
      data: {
        priority: values.priority,
        categories: values.categories,
        description: values?.description ?? undefined,
        decision: values.decision,
        checkerEmail: values.checker,
        signerEmail: values.signer,
      },
    });
  };

  return (
    <Modal
      {...{ visible }}
      className="submit-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Submit Case")}
      onOk={form.submit}
      onCancel={closeModal}
      width={640}
      okText={t("Submit")}
      buttonOkProps={{
        disabled:
          isGettingCaseCategories ||
          isGettingCheckers ||
          isGettingSigners ||
          isSubmitting,
        htmlType: "submit",
        loading: isSubmitting,
      }}
    >
      <div className="submit-case-modal__wrapper py-3">
        <Form
          initialValues={{
            priority: CASE_PRIORITIES.HIGH,
            decision: DECISION_ENUM.STR,
          }}
          {...{ form, onFinish }}
          name="createNewCaseForm"
          layout="vertical"
        >
          <Form.Item
            name="priority"
            label={t("Priority")}
            className="submit-case-modal__form-item mb-4"
            rules={[{ required: true, message: t("Please select a priority") }]}
          >
            <Radio.Group>
              {CASE_PRIORITY_OPTIONS(t).map((priority: any) => {
                return (
                  <Radio
                    key={priority?.value}
                    value={priority?.value}
                    disabled={isSubmitting}
                  >
                    {priority?.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="categories"
            label={t("Categories")}
            rules={[{ required: true, message: t("Please select a category") }]}
            className="submit-case-modal__form-item mb-4"
          >
            <Select
              options={caseCategoriesData?.map((item: ICaseCategory) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
              multiple
              showSearch
              disabled={isSubmitting || isGettingCaseCategories}
              loading={isGettingCaseCategories}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={t("Description")}
            className="submit-case-modal__form-item mb-4 bri-input"
          >
            <AntInput.TextArea
              rows={4}
              className="bg-gray50 !h-[62px]"
              disabled={isSubmitting}
            />
          </Form.Item>

          <Form.Item
            name="decision"
            label={t("Decision")}
            className="submit-case-modal__form-item !mb-4"
            rules={[{ required: true, message: t("Please select a decision") }]}
          >
            <Radio.Group>
              {DECISION_OPTIONS.map((decision: any) => {
                return (
                  <Radio
                    key={decision?.value}
                    value={decision?.value}
                    disabled={isSubmitting}
                  >
                    {decision?.label}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="checker"
            label={t("Checker")}
            rules={[{ required: true, message: t("Please select a checker") }]}
            className="submit-case-modal__form-item mb-4"
          >
            <Select
              options={checkersData?.map((item: IUserListItem) => {
                return {
                  value: item.email,
                  label: `${item.firstName} ${item.lastName}`,
                };
              })}
              showSearch
              disabled={isSubmitting || isGettingCheckers}
              loading={isGettingCheckers}
              placement="topLeft"
            />
          </Form.Item>

          <Form.Item
            name="signer"
            label={t("Signer")}
            rules={[{ required: true, message: t("Please select a signer") }]}
            className="submit-case-modal__form-item !mb-0"
          >
            <Select
              options={signersData?.map((item: IUserListItem) => {
                return {
                  value: item.email,
                  label: `${item.firstName} ${item.lastName}`,
                };
              })}
              showSearch
              disabled={isSubmitting || isGettingSigners}
              loading={isGettingSigners}
              placement="topLeft"
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(SubmitCaseModalView);

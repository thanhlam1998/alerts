import { Form, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ICreateCaseFromAlerts } from "apis/cases";
import Modal from "components/Modal";
import Select from "components/Select";
import { ICaseCategory } from "interfaces/case";
import { IUserListItem } from "interfaces/user";
import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CASE_PRIORITIES, CASE_PRIORITY_OPTIONS } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./CreateNewCaseModal.scss";

interface ICreateNewCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  alertIdsSelected?: string[];

  isGettingMarkerUsers?: boolean;
  makerUsersData?: IUserListItem[];

  isGettingCaseCategories?: boolean;
  caseCategoriesData?: ICaseCategory[];

  isCreatingNewCaseFromAlertIds?: boolean;
  callCreateNewCaseFromAlertIds?: (data: ICreateCaseFromAlerts) => void;
}

const CreateNewCaseModalView: FC<ICreateNewCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  alertIdsSelected = [],

  isGettingMarkerUsers = false,
  makerUsersData = [],

  isGettingCaseCategories = false,
  caseCategoriesData = [],

  isCreatingNewCaseFromAlertIds = false,
  callCreateNewCaseFromAlertIds = emptyFunction,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form?.resetFields();
  }, [visible]);

  const onFinish = (values?: any) => {
    callCreateNewCaseFromAlertIds({
      alertIds: alertIdsSelected,
      makerEmail: values.makerEmail,
      priority: values.priority,
      categories: values.categories,
      description: values?.description ?? undefined,
    });
  };

  return (
    <Modal
      {...{ visible }}
      className="create-new-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Create New Case")}
      onOk={form.submit}
      onCancel={closeModal}
      width={640}
      okText={t("Create")}
      buttonOkProps={{
        disabled:
          isGettingMarkerUsers ||
          isGettingCaseCategories ||
          isCreatingNewCaseFromAlertIds,
        htmlType: "submit",
        loading: isCreatingNewCaseFromAlertIds,
      }}
    >
      <div className="create-new-case-modal__wrapper py-3">
        <Form
          initialValues={{ priority: CASE_PRIORITIES.MEDIUM }}
          {...{ form, onFinish }}
          name="createNewCaseForm"
          layout="vertical"
        >
          <div className="create-new-case-modal__selected-alerts selected-alerts rounded-[8px] bg-gray100 p-2 mb-4">
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
            name="makerEmail"
            label={t("Maker")}
            rules={[{ required: true, message: t("Please select a maker") }]}
            className="create-new-case-modal__form-item mb-4"
          >
            <Select
              disabled={isGettingMarkerUsers}
              options={makerUsersData?.map((user: IUserListItem) => {
                return {
                  value: user.email,
                  label: `${user.firstName} ${user.lastName}`,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            name="priority"
            label={t("Priority")}
            className="create-new-case-modal__form-item mb-4"
          >
            <Radio.Group>
              {CASE_PRIORITY_OPTIONS(t).map((priority: any) => {
                return (
                  <Radio key={priority?.value} value={priority?.value}>
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
            className="create-new-case-modal__form-item mb-4"
          >
            <Select
              disabled={isGettingCaseCategories}
              options={caseCategoriesData?.map(
                (caseCategory: ICaseCategory) => {
                  return {
                    value: caseCategory.id,
                    label: caseCategory.name,
                  };
                }
              )}
              multiple
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={t("Description")}
            className="create-new-case-modal__form-item mb-0"
          >
            <div className="bri-input">
              <TextArea rows={4} className="bg-gray50 !h-[62px]" />
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(CreateNewCaseModalView);

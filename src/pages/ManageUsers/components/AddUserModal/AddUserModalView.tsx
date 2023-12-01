import { Form } from "antd";
import CheckBox from "components/CheckboxButton";
import Input from "components/Input";
import Modal from "components/Modal";
import UserRole from "components/UserRole";
import EyeInvisibleOutlined from "components/svgs/EyeInvisibleOutlined";
import EyeOutlined from "components/svgs/EyeOutlined";
import { HTMLPasswordType } from "pages/Login/LoginView";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_MODAL_WIDTH, USER_ROLES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import { validateEmail, validatePassword } from "scripts/validations";
import "./AddUserModal.scss";

const inputSuffixClassName = "w-4 h-4 cursor-pointer text-gray-800";

interface IAddUserModalViewProps {
  visible: boolean;
  closeModal: any;
  isLoading: boolean;
  callCreateUser: any;
}

const AddUserModalView: FC<IAddUserModalViewProps> = ({
  visible,
  closeModal,
  isLoading,
  callCreateUser = emptyFunction,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(false);
  const [passwordType, setPasswordType] = useState<{
    newPassword: HTMLPasswordType;
    confirmNewPassword: HTMLPasswordType;
  }>({ newPassword: "password", confirmNewPassword: "password" });

  const togglePasswordType = (
    fieldName: "newPassword" | "confirmNewPassword"
  ) =>
    setPasswordType({
      ...passwordType,
      [fieldName]: passwordType[fieldName] === "password" ? "text" : "password",
    });

  const onFinish = ({ firstName, lastName, role, password, email }: any) => {
    callCreateUser({
      firstName,
      lastName,
      role,
      password,
      email,
      sendWelcomeEmail,
    });
  };

  return (
    <Modal
      className="add-user-modal"
      width={DEFAULT_MODAL_WIDTH}
      visible={visible}
      onCancel={closeModal}
      maskClosable={false}
      title={t("Add User")}
      okText={t("Add User")}
      cancelText={t("Cancel")}
      onOk={form.submit}
      buttonOkProps={{
        disabled: isLoading,
        loading: isLoading,
      }}
    >
      <Form
        initialValues={{
          role: USER_ROLES.MAKER,
        }}
        form={form}
        onFinish={onFinish}
        name="addUserForm"
        layout="vertical"
        className="flex flex-col gap-4"
      >
        <Form.Item
          name="role"
          label={t("User Role")}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <UserRole />
        </Form.Item>

        <div className="grid grid-cols-2 gap-x-6">
          <Form.Item
            name="firstName"
            label={t("First Name")}
            rules={[
              {
                required: true,
                message: t("Please input first name"),
                whitespace: true,
              },
            ]}
          >
            <Input
              name="firstName"
              disabled={isLoading}
              placeholder={t("Please input first name")}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={t("Last Name")}
            rules={[
              {
                required: true,
                message: t("Please input last name"),
                whitespace: true,
              },
            ]}
          >
            <Input
              name="lastName"
              placeholder={t("Please input last name")}
              autoComplete="off"
            />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          label={t("Username")}
          rules={[
            {
              required: true,
              message: t("Please input username"),
              whitespace: true,
            },
          ]}
        >
          <Input
            disabled={isLoading}
            placeholder={t("Please input username")}
            autoComplete="off"
          />
        </Form.Item>
        {/* TODO: Remove these fields because LDAP manage password
        <Form.Item
          name="password"
          label={t("Password")}
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input
            disabled={isLoading}
            placeholder={t("Please input password")}
            autoComplete="off"
            type={passwordType.newPassword}
            size="middle"
            suffix={
              passwordType.newPassword === "text" ? (
                <EyeOutlined
                  className={`eye-outlined ${inputSuffixClassName}`}
                  onClick={() => togglePasswordType("newPassword")}
                />
              ) : (
                <EyeInvisibleOutlined
                  className={`eye-invisible-outlined ${inputSuffixClassName}`}
                  onClick={() => togglePasswordType("newPassword")}
                />
              )
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={t("Confirm Password")}
          rules={[
            {
              required: true,
              message: t("Please input confirm password"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("Confirm password does not match"))
                );
              },
            }),
          ]}
        >
          <Input
            type={passwordType.confirmNewPassword}
            size="middle"
            suffix={
              passwordType.confirmNewPassword === "text" ? (
                <EyeOutlined
                  disabled={isLoading}
                  className={`eye-outlined ${inputSuffixClassName}`}
                  onClick={() => togglePasswordType("confirmNewPassword")}
                />
              ) : (
                <EyeInvisibleOutlined
                  disabled={isLoading}
                  className={`eye-invisible-outlined ${inputSuffixClassName}`}
                  onClick={() => togglePasswordType("confirmNewPassword")}
                />
              )
            }
            disabled={isLoading}
            placeholder={t("Please confirm password")}
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item name="sendWelcomeEmail">
          <CheckBox
            label={t("Email user with login information")}
            name="sendWelcomeEmail"
            checked={sendWelcomeEmail}
            onChange={setSendWelcomeEmail}
            size="sm"
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default AddUserModalView;

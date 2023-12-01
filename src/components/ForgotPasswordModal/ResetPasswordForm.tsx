import { Divider, Form } from "antd";
import Button from "components/Button";
import Input from "components/Input";
import EyeInvisibleOutlined from "components/svgs/EyeInvisibleOutlined";
import EyeOutlined from "components/svgs/EyeOutlined";
import { HTMLPasswordType } from "pages/Login/LoginView";
import { FC, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";

interface ResetPasswordFormProps {
  username?: string;
  callResetPassword?: any;
  loading: boolean;
}

const inputSuffixClassName = "w-4 h-4 cursor-pointer text-gray-800";

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  callResetPassword = emptyFunction,
  username,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

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

  return (
    <>
      <div className="mb-6">
        <Trans
          defaults={
            "If your email <strongTag>{{username}}</strongTag> is in our system, you should soon receive a password reset code from <strongTag>no-reply@verification.com</strongTag>"
          }
          values={{ username }}
          components={{ strongTag: <span className="sm_body_b2_semi" /> }}
        />
      </div>
      <Form
        form={form}
        name="resetPasswordForm"
        requiredMark={false}
        layout="vertical"
        onFinish={({ authenticationCode, password }: any) =>
          callResetPassword({ authenticationCode, password })
        }
      >
        <Form.Item
          name="authenticationCode"
          label={t("Authentication Code")}
          rules={[
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: t("Authentication code is only number"),
            },
            { required: true, message: "Please input authentication code" },
          ]}
        >
          <Input
            placeholder="Please input authentication code"
            autoComplete="off"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              whitespace: true,
              required: true,
              message: "Please input new password",
            },
          ]}
          name="password"
          label={t("New Password")}
          className="mb-4"
        >
          <Input
            placeholder="Please input new password"
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
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={t("Confirm New Password")}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: t("Please input confirm new password"),
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value)
                  return Promise.resolve();

                return Promise.reject(
                  new Error(t("Confirm password does not match"))
                );
              },
            }),
          ]}
        >
          <Input
            placeholder={t("Please confirm new password")}
            type={passwordType.confirmNewPassword}
            size="middle"
            suffix={
              passwordType.confirmNewPassword === "text" ? (
                <EyeOutlined
                  disabled={loading}
                  className={`eye-outlined ${inputSuffixClassName}`}
                  onClick={() => togglePasswordType("confirmNewPassword")}
                />
              ) : (
                <EyeInvisibleOutlined
                  disabled={loading}
                  className={`eye-invisible-outlined ${inputSuffixClassName}`}
                  onClick={() => togglePasswordType("confirmNewPassword")}
                />
              )
            }
            disabled={loading}
          />
        </Form.Item>
        <Divider className="my-0 w-auto -mx-6" />
        <div className="p-2 text-right -mx-6">
          <Button
            {...{ loading }}
            disabled={loading}
            type="primary"
            size="large"
            htmlType="submit"
          >
            {t("Reset Password")}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ResetPasswordForm;

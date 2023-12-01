import { Divider, Form } from "antd";
import Button from "components/Button";
import Input from "components/Input";
import React from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import { validateEmail } from "scripts/validations";

interface ForgotPasswordFormProps {
  callForgotPassword?: any;
  loading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  callForgotPassword = emptyFunction,
  loading = false,
}) => {
  const { t } = useTranslation();

  return (
    <Form
      onFinish={({ email }) => callForgotPassword?.({ email })}
      requiredMark={false}
      name="forgotPasswordForm"
      layout="vertical"
    >
      <Form.Item
        label={t("Email")}
        name="email"
        rules={[{ required: true, whitespace: true, validator: validateEmail }]}
      >
        <Input placeholder={t("Please input email")} disabled={loading} />
      </Form.Item>
      <Divider className="my-0 w-auto -mx-6" />
      <div className="p-2 text-right -mx-6">
        <Button
          {...{ loading }}
          disabled={loading}
          size="large"
          type="primary"
          htmlType="submit"
        >
          Send
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;

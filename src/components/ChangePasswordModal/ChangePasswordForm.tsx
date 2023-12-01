import { Button, Col, Divider, Form, Input, Row } from "antd";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  emptyFunction,
  isValidPassword,
  validStyle
} from "scripts/helpers";

interface ChangePasswordProps {
  callChangePassword?: any;
  changePasswordLoading?: boolean;
}

const ChangePasswordForm: FC<ChangePasswordProps> = ({
  callChangePassword = emptyFunction,
  changePasswordLoading = false,
}) => {
  const [condValid, setCondValid] = useState({
    existLower: false,
    existUpper: false,
    existNumber: false,
    existSpecialCharacters: false,
    min8Characters: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const isPasswordPass = useCallback(() => {
    for (const key in condValid) {
      if (condValid[key] === false) {
        return false;
      }
    }
    return true;
  }, [condValid]);

  const onSubmit = (values: any) => {
    const { currentPassword, newPassword } = values;
    
    callChangePassword({currentPassword,newPassword});
  };

  return (
    <Form
      form={form}
      name="changePasswordForm"
      requiredMark={false}
      layout="vertical"
      onFinish={onSubmit}
      onFieldsChange={() =>
        setButtonDisabled(
          !form.isFieldsTouched(true) ||
            !isPasswordPass() ||
            form.getFieldsError().some((field) => field.errors.length > 0),
        )
      }
    >
      <Form.Item
        name="currentPassword"
        label={t("Current Password")}
        rules={[
          {
            required: true,
            message: t("Please input current password"),
          },
        ]}
      >
        <Input.Password placeholder={t("Current Password")} />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label={t("New Password")}
        dependencies={["currentPassword"]}
        rules={[
          ({ getFieldValue }: any) => ({
            validator(_, value) {
              if (!value || getFieldValue("currentPassword") !== value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t("The password cannot be the same as old password")),
              );
            },
          }),
          {
            required: true,
            message: t("Please input password"),
          },
        ]}
      >
        <Input.Password
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setCondValid({
                ...condValid,
                existLower: isValidPassword(value, /^[a-z]$/),
                existUpper: isValidPassword(value, /^[A-Z]$/),
                existNumber: isValidPassword(value, /^[0-9]$/),
                existSpecialCharacters: isValidPassword(value, /^[!@#$%^&*]$/),
                min8Characters: value?.length >= 8,
              });
            } else {
              setCondValid({
                existLower: false,
                existUpper: false,
                existNumber: false,
                existSpecialCharacters: false,
                min8Characters: false,
              });
            }
          }}
          placeholder={t("New Password")}
        />
      </Form.Item>
      <Form.Item noStyle>
        <ul className="errMsgList">
          <Row>
            <Col span={12}>
              <li className={validStyle(condValid?.min8Characters)?.className}>
                {validStyle(condValid?.min8Characters)?.icon} {t("At least 8 characters")}
              </li>
              <li className={validStyle(condValid?.existLower)?.className}>
                {validStyle(condValid?.existLower)?.icon} {t("At least 1 lower-case character.")}
              </li>
              <li className={validStyle(condValid?.existUpper)?.className}>
                {validStyle(condValid?.existUpper)?.icon} {t("At least 1 upper-case character.")}
              </li>
            </Col>
            <Col span={12}>
              <li className={validStyle(condValid?.existNumber)?.className}>
                {validStyle(condValid?.existNumber)?.icon} {t("At least 1 number.")}
              </li>
              <li className={validStyle(condValid?.existSpecialCharacters)?.className}>
                {validStyle(condValid?.existSpecialCharacters)?.icon}{" "}
                {t("At least 1 special character.")}
              </li>
            </Col>
          </Row>
        </ul>
      </Form.Item>
      <Form.Item
        name="passwordConfirm"
        label={t("Confirm New Password")}
        dependencies={["newPassword"]}
        rules={[
          { required: true, whitespace: true, message: t("Please input confirm new password") },
          ({ getFieldValue }: any) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("Confirm password does not match")));
            },
          }),
        ]}
      >
        <Input.Password placeholder={t("Confirm New Password")} />
      </Form.Item>
      <Divider className="my-0 -mx-6 w-auto" />
      <div className="w-auto text-right p-2 -mx-6">
        <Button
          loading={changePasswordLoading}
          disabled={buttonDisabled}
          type="primary"
          size="large"
          htmlType="submit"
        >
          {t("Change Password")}
        </Button>
      </div>
    </Form>
  );
};

export default ChangePasswordForm;

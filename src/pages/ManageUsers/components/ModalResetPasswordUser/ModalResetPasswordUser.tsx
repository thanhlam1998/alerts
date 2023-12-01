import { Col, Form, Row, Input as InputAnt } from "antd";
import { resetPassword } from "apis/user";
import Input from "components/Input";
import Modal from "components/Modal";
import { UserProps } from "interface/User";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { DEFAULT_MODAL_WIDTH } from "scripts/constants";
import { emptyFunction, isValidPassword, validStyle } from "scripts/helpers";
import { validatePassword } from "scripts/validations";
import "./ModalResetPasswordUser.scss";

const ModalResetPasswordUser = ({
  visible,
  closeModal,
  reloadUserList = emptyFunction,
  userData,
}: {
  visible: boolean;
  closeModal: any;
  reloadUserList: () => void;
  userData: UserProps | null;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [condValid, setCondValid] = useState({
    existLower: false,
    existUpper: false,
    existNumber: false,
    existSpecialCharacters: false,
    min8Characters: false,
  });

  const { isLoading: isLoadingResetPassword, mutate: _onResetPassword } = useMutation(
    resetPassword,
    {
      onSuccess: (data: any) => {
        toast.success(t("Password reset successfully"));
        refetchAndClose();
      },
    },
  );

  const refetchAndClose = () => {
    form.resetFields();
    closeModal();
    reloadUserList();
  };

  const onFinish = (values: any) => {
    const { password } = values;
    _onResetPassword({ id: userData?.id ?? "", password });
  };

  const isLoading = isLoadingResetPassword;

  return (
    <Modal
      className="reset-password-user-modal"
      width={DEFAULT_MODAL_WIDTH}
      visible={visible}
      onCancel={closeModal}
      maskClosable={false}
      title={`${t("Reset Password")}`}
      okText={t("Reset Password")}
      cancelText={t("Cancel")}
      
      onOk={() => form.submit()}
      buttonOkProps={{
        disabled: isLoading,
        loading: isLoading,
      }}
    >
      <Form
        initialValues={{
          email: userData?.email,
        }}
        form={form}
        onFinish={onFinish}
        name="update-user"
        layout="vertical"
      >
        <Form.Item name="email" label={t("Email")}>
          <Input disabled placeholder={t("Email")} />
        </Form.Item>
        <Form.Item
          name="password"
          label={t("New Password")}
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <InputAnt.Password
            type="password"
            disabled={isLoading}
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
            placeholder={t("Please input new password")}
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
          name="confirmPassword"
          label={t("Confirm New Password")}
          rules={[
            {
              required: true,
              message: t("Please input confirm password!"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("The two passwords that you entered do not match")),
                );
              },
            }),
          ]}
        >
          <InputAnt.Password
            type="password"
            disabled={isLoading}
            placeholder={t("Please confirm new password")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalResetPasswordUser;

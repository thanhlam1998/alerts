import { Form } from "antd";
import LoginBackgroundImage from "assets/images/login-bg.png";
import Button from "components/Button";
import CheckBox from "components/CheckboxButton";
import ForgotPasswordModal from "components/ForgotPasswordModal";
import Input from "components/Input";
import EyeInvisibleOutlined from "components/svgs/EyeInvisibleOutlined";
import EyeOutlined from "components/svgs/EyeOutlined";
import TigerGraphLogo from "components/svgs/TigerGraph";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./Login.scss";

export type HTMLPasswordType = "password" | "text";

const inputSuffixClassName = "w-4 h-4 cursor-pointer text-gray-800";

const LoginView = ({
  onLogin = emptyFunction,
  isLogging = false,
}: {
  onLogin: any;
  isLogging: boolean;
}) => {
  const { t } = useTranslation();

  const [isRememberFlag, setIsRememberFlag] = useState(false);
  const [isForgotPasswordModalOpen, toggleForgotPasswordModal] =
    useState(false);
  const [passwordType, setPasswordType] =
    useState<HTMLPasswordType>("password");

  const [form] = Form.useForm();

  const togglePasswordType = () =>
    setPasswordType(passwordType === "password" ? "text" : "password");

  return (
    <>
      <div className="login-page w-screen h-screen">
        <div
          className="login-page__wrapper w-full h-full flex items-center justify-center bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url("${LoginBackgroundImage}")` }}
        >
          <div className="login-page__form w-[320px] h-auto">
            <div className="login-page__form-header w-full mb-8">
              <div className="login-page__form-header-logo w-auto h-[64px]">
                <TigerGraphLogo />
              </div>
            </div>
            <div className="login-page__form-content">
              <Form
                {...{ form }}
                initialValues={{ username: "", password: "" }}
                onFinish={onLogin}
                name="login"
                layout="vertical"
              >
                <Form.Item
                  name="username"
                  label={t("Username")}
                  rules={[
                    {
                      required: true,
                      message: t("Please enter your username"),
                    },
                  ]}
                  className="login-page__form-item"
                >
                  <Input size="middle" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={t("Password")}
                  rules={[
                    {
                      required: true,
                      message: t("Please enter your password"),
                    },
                  ]}
                  className="login-page__form-item"
                >
                  <Input
                    type={passwordType}
                    size="middle"
                    suffix={
                      passwordType === "text" ? (
                        <EyeOutlined
                          className={`eye-outlined ${inputSuffixClassName}`}
                          onClick={togglePasswordType}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          className={`eye-invisible-outlined ${inputSuffixClassName}`}
                          onClick={togglePasswordType}
                        />
                      )
                    }
                  />
                </Form.Item>

                <div className="flex items-center justify-between gap-2 mb-4">
                  <CheckBox
                    label={t("Remember me")}
                    name="isRemember"
                    size="sm"
                    checked={isRememberFlag}
                    onChange={setIsRememberFlag}
                  />
                  {/* <div
                    className="sm_body_b3_reg text-blue-500 cursor-pointer"
                    onClick={() => toggleForgotPasswordModal(true)}
                  >
                    {t("Forgot password?")}
                  </div> */}
                </div>
                <Button
                  type="primary"
                  className="w-full"
                  size="large"
                  htmlType="submit"
                  loading={isLogging}
                >
                  {t("Sign In")}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        visible={isForgotPasswordModalOpen}
        closeModal={() => toggleForgotPasswordModal(false)}
      />
    </>
  );
};

export default LoginView;

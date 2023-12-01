import { Avatar, Form, Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { AuthApis } from "apis";
import { updateProfilePicture } from "apis/user";
import clsx from "clsx";
import Button from "components/Button";
import ChangePasswordModal from "components/ChangePasswordModal";
import Input from "components/Input";
import Loading from "components/Loading";
import PhoneInput from "components/PhoneInput";
import WrapperSection from "components/WrapperSection";
import Logout from "components/svgs/Logout";
import useRedux from "hooks/useRedux";
import { isEqual } from "lodash";
import { FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AVATAR_FILE_LIMIT_SIZE } from "scripts/constants";
import { emptyFunction, getBase64, getShortUserName } from "scripts/helpers";
import { logout } from "store/reducers/auth";

interface UserProfileProps {
  callUpdateProfile: Function;
  loading?: boolean;
}

const UserProfile: FC<UserProfileProps> = ({
  callUpdateProfile = emptyFunction,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const currentUser = useRedux("auth.currentUser", {});
  const {
    firstName = "",
    lastName = "",
    email = "",
    phone = "",
    profilePictureUrl = "",
  } = currentUser;

  const initialUserInfo = {
    firstName,
    lastName,
    email,
    phone,
    profilePicture: null,
  };

  const [enablePasswordModal, setEnablePasswordModal] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(profilePictureUrl);

  useEffect(() => {
    form.setFieldsValue({
      firstName,
      lastName,
      email,
      phone,
      profilePicture: null,
    });
  }, [currentUser]);

  const {
    mutate: callUploadProfilePicture,
    isLoading: mutateProfilePictureLoading,
  } = useMutation(updateProfilePicture, {
    onSuccess: () => {
      const formValues = form.getFieldsValue();

      callUpdateProfile({
        firstName: formValues?.firstName,
        lastName: formValues?.lastName,
        phone: formValues?.phone ?? "",
      });
    },
  });

  const { mutate: callLogout, isLoading: mutateLogoutLoading } = useMutation(
    AuthApis.callLogout
  );

  const isUpdating = loading || mutateProfilePictureLoading;

  const submitUpdateProfile = (values: any) => {
    if (initialUserInfo.profilePicture !== values?.profilePicture) {
      callUploadProfilePicture({ photo: values?.profilePicture });
    } else {
      callUpdateProfile({
        firstName: values?.firstName,
        lastName: values?.lastName,
        phone: values?.phone ?? "",
      });
    }
  };

  const onImageChange = (
    info: UploadChangeParam<UploadFile>,
    formOnChange: any
  ) => {
    if (info?.file && checkFileCondition(info.file as RcFile)) {
      formOnChange(info.file);
      getBase64(info.file as RcFile, (url) => {
        setAvatarSrc(url);
      });
    }
  };

  const checkFileCondition = (file: RcFile) => {
    if (file.size > AVATAR_FILE_LIMIT_SIZE) {
      toast.error(t("Image must smaller than 2MB!"));
      return false;
    }

    return true;
  };

  const values = Form.useWatch([], form);
  const isProfileChanged = !isEqual(values, initialUserInfo);

  const UploadPhoto = ({ onChange, firstName, lastName, avatarSrc }: any) => {
    return (
      <Upload
        onChange={(info: any) => onImageChange(info, onChange)}
        accept="image/png, image/jpeg"
        showUploadList={false}
        action=""
        maxCount={1}
        beforeUpload={() => {
          return false;
        }}
      >
        <div className="avatar-container cursor-pointer flex flex-col items-center">
          <Avatar
            size={64}
            className={clsx("text-white text-base", {
              "bg-[#6085FF]": avatarSrc,
            })}
            {...(avatarSrc && { src: avatarSrc })}
          >
            {getShortUserName(firstName, lastName)}
          </Avatar>
          <span className="title text-blue500">
            {t("Change profile picture")}
          </span>
        </div>
      </Upload>
    );
  };

  return (
    <>
      {mutateLogoutLoading && <Loading />}
      <Form
        form={form}
        onFinish={submitUpdateProfile}
        initialValues={{
          firstName,
          lastName,
          email,
          phone,
          profilePicture: profilePictureUrl,
        }}
        name="profile"
        layout="vertical"
      >
        <WrapperSection
          className="!p-2 !pl-4 mb-4"
          title={t("My Profile")}
          rightHeaderContent={
            <Button
              loading={isUpdating}
              htmlType="submit"
              type="primary"
              disabled={!isProfileChanged}
            >
              {t("Save")}
            </Button>
          }
          headerClassName="!mb-0"
        />
        <div className="profile-container">
          <div className="user-profile">
            <div className="flex flex-col items-center mb-6">
              <Form.Item name="profilePicture">
                <UploadPhoto {...{ firstName, lastName, avatarSrc }} />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <Form.Item
                name="firstName"
                label={t("First Name")}
                rules={[
                  {
                    required: true,
                    message: t("Please input your first name"),
                  },
                ]}
              >
                <Input
                  name="firstName"
                  disabled={isUpdating}
                  placeholder={t("First Name")}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={t("Last Name")}
                rules={[
                  {
                    required: true,
                    message: t("Please input your last name"),
                  },
                ]}
              >
                <Input
                  // onChange={handleInputChange}
                  disabled={isUpdating}
                  name="lastName"
                  placeholder={t("Last Name")}
                />
              </Form.Item>
              <Form.Item name="email" label={t("Username")}>
                <Input disabled placeholder={t("Email")} />
              </Form.Item>
              <Form.Item
                name="phone"
                label={t("Phone number")}
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: t("Please input valid phone number"),
                  },
                ]}
              >
                <PhoneInput
                  dropdownStyle={{ width: 312 }}
                  disabled={isUpdating}
                />
              </Form.Item>
            </div>
            <div className="flex justify-between">
              <Button
                className="!text-base"
                onClick={() => setEnablePasswordModal(true)}
                type="link"
              >
                {t("Change Password")}
              </Button>
              <Button
                className="!text-base"
                onClick={() => {
                  callLogout();
                  dispatch(logout());
                }}
                icon={<Logout />}
                type={"link"}
                theme="red"
              >
                {t("Sign Out")}
              </Button>
            </div>
          </div>
        </div>
      </Form>
      <ChangePasswordModal
        enableModal={enablePasswordModal}
        setEnableModal={setEnablePasswordModal}
      />
    </>
  );
};

export default memo(UserProfile);

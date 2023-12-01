import { UserApis } from "apis";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "store/reducers/auth";
import UserProfile from "./UserProfile";

const UserProfileContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: callUpdateProfile, isLoading: isProfileUpdating } =
    useMutation(UserApis.updateProfile, {
      onSuccess: (data: any) => {
        dispatch(updateUserProfile(data?.data?.user));
        toast.success(t("Update profile successfully"));
      },
    });

  const { isLoading: isGettingCurrentProfile } = useQuery(
    ["getCurrentProfile"],
    UserApis.getCurrentProfile,
    {
      onSuccess: (data) => {
        dispatch(updateUserProfile(data?.data));
      },
    }
  );

  return (
    <UserProfile
      {...{
        callUpdateProfile,
        loading: isGettingCurrentProfile || isProfileUpdating,
      }}
    />
  );
};

export default UserProfileContainer;

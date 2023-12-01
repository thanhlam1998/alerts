import { UserApis } from "apis";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { emptyFunction } from "scripts/helpers";
import AddUserModalView from "./AddUserModalView";

const AddUserModalContainer = ({
  visible,
  closeModal,
  reloadUserList = emptyFunction,
}: {
  visible: boolean;
  closeModal: any;
  reloadUserList: () => void;
}) => {
  const { t } = useTranslation();

  const { isLoading, mutate: callCreateUser } = useMutation(
    UserApis.createUser,
    {
      onSuccess: () => {
        toast.success(t("User created successfully"));
        closeModal();
        reloadUserList();
      },
    }
  );

  return (
    <AddUserModalView
      {...{
        visible,
        closeModal,
        isLoading,
        callCreateUser,
      }}
    />
  );
};

export default AddUserModalContainer;

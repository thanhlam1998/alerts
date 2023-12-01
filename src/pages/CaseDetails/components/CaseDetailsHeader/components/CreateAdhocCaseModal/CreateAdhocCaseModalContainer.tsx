import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import CreateAdhocCaseModalView from "./CreateAdhocCaseModalView";

interface ICreateAdhocCaseModalContainerProps {
  visible?: boolean;
  closeModal?: (success?: boolean) => void;
  cif?: string;
}

const CreateAdhocCaseModalContainer: FC<
  ICreateAdhocCaseModalContainerProps
> = ({ closeModal = emptyFunction, visible = false, cif }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { caseId = "" } = useParams();

  const createAdhocCaseCallback = ({ data } : { data: any }) => {
    if (data && data.success) {
      toast.success(t("Create Adhoc case successfully"));
    } else {
      toast.error(t("Create Adhoc case failed"));
    }

    closeModal(data.success);
  };

  const { isLoading, mutate: callCreateAdhocCase } = useMutation(
    () => CaseApis.createAdhocCase(cif ?? caseId),
    {
      onSuccess: createAdhocCaseCallback,
    }
  );

  return (
    <CreateAdhocCaseModalView
      {...{
        visible,
        closeModal,
        cif,

        isLoading,
        callCreateAdhocCase,
      }}
    />
  );
};

export default CreateAdhocCaseModalContainer;

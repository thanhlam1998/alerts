import { CaseApis } from "apis";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import DeleteIncidentalSubjectModalView from "./DeleteIncidentalSubjectModalView";

interface DeleteIncidentalSubjectModalProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
  idType?: string;
}

const DeleteIncidentalSubjectModalContainer: FC<
  DeleteIncidentalSubjectModalProps
> = ({ closeModal = emptyFunction, visible = false, cif, idType }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const removeIncidentalSubjectCallback = () => {
    toast.success(t("Remove incidental subject successfully"));
    closeModal();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_INCIDENTAL_SUBJECTS
    );
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_REMOVED_SUBJECTS
    );
  };

  const { isLoading, mutate: callRemoveIncidentalSubject } = useMutation(
    CaseApis.removeIncidentalSubject,
    {
      onSuccess: removeIncidentalSubjectCallback,
    }
  );

  return (
    <DeleteIncidentalSubjectModalView
      {...{
        visible,
        closeModal,
        cif,
        idType,
        isLoading,
        callRemoveIncidentalSubject,
      }}
    />
  );
};

export default DeleteIncidentalSubjectModalContainer;

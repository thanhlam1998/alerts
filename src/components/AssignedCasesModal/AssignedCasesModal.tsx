import Modal from "components/Modal";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./AssignedCasesModal.scss";

interface AssignedCasesModalProps {
	visible?: boolean;
	closeModal?: () => void;
	caseIds?: string[];
}

const AssignedCasesModal: FC<AssignedCasesModalProps> = ({
	closeModal = emptyFunction,
	visible = false,
	caseIds: cases = [],
}) => {
	const { t } = useTranslation();

	return (
		<Modal
			{...{ visible }}
			className="assigned-cases-modal"
			centered
			destroyOnClose
			bodyStyle={{ padding: 0 }}
			title={t("Cases")}
			onCancel={closeModal}
			width={640}
			showFooter={false}
		>
			<div className="assigned-cases__wrapper">
				{cases?.map((caseId: string) => {
					return (
						<div key={caseId} className="assigned-cases__case py-2">
							<div className="assigned-cases__case-name sm_body_b1_reg text-gray800 py-2">
								{caseId}
							</div>
						</div>
					);
				})}
			</div>
		</Modal>
	);
};

export default AssignedCasesModal;

import Modal from "components/Modal";
import {
	ICaseIncidentalIdentity,
	ICaseIncidentalSubject,
} from "interfaces/case";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./IncidentalSubjectDetailsModal.scss";
import { CaseApis } from "apis";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { useQuery } from "react-query";
import { Spin } from "antd";

interface IncidentalSubjectDetailsModalProps {
	visible?: boolean;
	closeModal?: () => void;
	caseSelected?: ICaseIncidentalSubject | null;
}

const IncidentalSubjectDetailsModal: FC<IncidentalSubjectDetailsModalProps> = ({
	closeModal = emptyFunction,
	visible = false,
	caseSelected,
}) => {
	const { t } = useTranslation();

	const { isLoading: isGettingIdentities, data: identitiesData }: any =
		useQuery(
			[BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_IDENTITIES_BY_CIF],
			() => CaseApis.getIdentitiesByCIF(caseSelected?.cif ?? ""),
			{ enabled: visible },
		);

	return (
		<Modal
			{...{ visible }}
			className="incidental-subject-details-modal"
			centered
			destroyOnClose
			bodyStyle={{ padding: 0 }}
			title={t("Incidental Subject Details ")}
			onCancel={closeModal}
			width={640}
			showFooter={false}
		>
			{isGettingIdentities ? (
				<div className="flex items-center justify-center w-full h-full min-h-[inherit] p-[30px_0px]">
					<Spin />
				</div>
			) : (
				<div className="incidental-subject-details-modal__wrapper p-2 bg-gray100 grid gap-2 grid-cols-4 rounded-[8px] mb-6">
					{(identitiesData?.data ?? []).map(
						(identity: ICaseIncidentalIdentity, index: number) => {
							return (
								<div
									className="customer-identity-info__item flex flex-col gap-1"
									key={index}
								>
									<div className="customer-identity-info__item-label sm_body_b2_reg text-gray500">
										{identity?.name}
									</div>
									<div className="customer-identity-info__item-value sm_body_b1_semi text-gray800">
										{identity?.value}
									</div>
								</div>
							);
						},
					)}
				</div>
			)}
		</Modal>
	);
};

export default IncidentalSubjectDetailsModal;

import Close from "components/svgs/Close";
import { VType } from "interface/graph";
import { isEmpty } from "lodash";
import { NODE_VIEW_OPTIONS } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import InfoRow from "../InfoRow/InfoRow";
import "./NodeDetail.scss";

export interface INodeDetailData {
	attributes: any;
	vId: string;
	vType: VType;
	icon?: string;
}
const NodeDetail = ({
	onClose = emptyFunction,
	nodeData,
}: {
	onClose: () => void;
	nodeData: INodeDetailData;
}) => {
	// console.log("nodeData ====> ", nodeData);
	const isOpen = !isEmpty(nodeData);
	const nodeMappingLabel = NODE_VIEW_OPTIONS().find(
		(it: { label: string; key: string }) => it.key === nodeData.vType,
	)?.label;

	return (
		<div
			className={`object-detail shadow-md w-[320px] h-full bg-white absolute top-0 transition-all z-[99] ${
				isOpen ? "right-0" : "right-[-320px]"
			}`}
		>
			<div className="object-detail__wrapper">
				<div className="object-detail__header flex p-4 gap-2">
					<div className="object-detail__header-left flex gap-4 w-full">
						<div className="object-detail__header-icon w-6 h-6">
							{nodeData?.icon && (
								<img src={nodeData?.icon} className="w-full h-full" />
							)}
						</div>
						<div className="object-detail__header-info flex flex-col gap-[2px]">
							<span className="sm_sub_title_semi text-gray800">
								{nodeData?.attributes?.name ||
									nodeMappingLabel ||
									nodeData.vType}
							</span>
							<span className="sm_body_b1_reg text-gray500">
								{nodeData?.vId}
							</span>
						</div>
					</div>
					<div className="object-detail__header-right">
						<Close
							className="text-gray-800 w-4 h-4 cursor-pointer"
							onClick={onClose}
						/>
					</div>
				</div>

				<div className="object-detail__content p-4">
					{nodeData?.attributes?.map((attributeItem: any) => (
						<InfoRow
							key={attributeItem.id}
							label={attributeItem.name}
							value={(attributeItem.value ?? "").toString()}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default NodeDetail;

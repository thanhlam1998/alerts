import Close from "components/svgs/Close";
import { EType, VType } from "interface/graph";
import { isEmpty } from "lodash";
import { NODE_VIEW_OPTIONS } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import InfoRow from "../InfoRow/InfoRow";
import "./EdgeDetail.scss";

export interface IEdgeDetailData {
	attributes: any;
	eType: EType;
	fromId: string;
	fromType: VType;
	toId: string;
	toType: VType;
}

const EdgeDetail = ({
	onClose = emptyFunction,
	edgeData,
}: {
	onClose: () => void;
	edgeData: IEdgeDetailData;
}) => {
	// console.log("edgeData ====> ", edgeData);
	const isOpen = !isEmpty(edgeData);
	const sourceNodeMappingLabel = NODE_VIEW_OPTIONS().find(
		(it: { label: string; key: string }) => it.key === edgeData.fromType,
	)?.label;

	const targetNodeMappingLabel = NODE_VIEW_OPTIONS().find(
		(it: { label: string; key: string }) => it.key === edgeData.toType,
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
						<div className="object-detail__header-info flex flex-col gap-[2px]">
							<span className="sm_sub_title_semi text-gray800">
								{edgeData?.eType}
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
					<InfoRow
						key={edgeData.fromType}
						label="From Type"
						value={sourceNodeMappingLabel}
					/>
					<InfoRow
						key={edgeData.fromId}
						label="From ID"
						value={(edgeData.fromId ?? "").toString()}
					/>
					<InfoRow
						key={edgeData.toType}
						label="To Type"
						value={targetNodeMappingLabel}
					/>
					<InfoRow
						key={edgeData.toId}
						label="To ID"
						value={(edgeData.toId ?? "").toString()}
					/>
					{edgeData?.attributes?.map((attributeItem: any) => (
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

export default EdgeDetail;

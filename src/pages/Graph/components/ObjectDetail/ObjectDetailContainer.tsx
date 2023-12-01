import { memo } from "react";
import { emptyFunction } from "scripts/helpers";
import EdgeDetail from "./EdgeDetail";
import NodeDetail from "./NodeDetail";

export enum ObjectDetailTypeEnum {
	EDGE = "Edge",
	NODE = "Node",
}

const ObjectDetailContainer = ({
	onClose = emptyFunction,
	objectType,
	objectData,
}: {
	onClose: () => void;
	objectType?: ObjectDetailTypeEnum;
	objectData?: any;
}) => {
  if (!objectType) {
    return null;
  }
  
	return objectType === ObjectDetailTypeEnum.NODE ? (
		<NodeDetail
			{...{
				nodeData: {
					...objectData?.nodeData,
					...(objectData?.icon?.img ? { icon: objectData?.icon?.img } : {}),
				},
				onClose: onClose,
			}}
		/>
	) : (
		<EdgeDetail
			{...{
				edgeData: {
					...objectData?.edgeData,
				},
				onClose: onClose,
			}}
		/>
	);
};

export default memo(ObjectDetailContainer);

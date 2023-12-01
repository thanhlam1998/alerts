import GraphViewComponent from "components/GraphView";
import { TOOL_BAR_ITEMS } from "components/GraphView/GraphView";
import WrapperSection from "components/WrapperSection";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./NetworkConnection.scss";
import NetworkConnectionNodeDetail from "./components/NodeDetail";

const NetworkConnection = ({
	chartData,
	isGettingAlertNetworkConnection,
}: any) => {
	const { t } = useTranslation();
	const graphRef: any = useRef(null);
	const [nodeSelected, setNodeSelected]: any = useState(null);

	const nodeOnClick = (node: any) => {
		const nodeData = node?.item?._cfg?.model;
		setNodeSelected(nodeData);
	};

	const closeNodeDetail = () => {
		const nodeDetail = graphRef?.current?.graphInstance?.findById(
			nodeSelected?.id,
		);
		if (nodeDetail)
			graphRef?.current?.graphInstance?.setItemState(
				nodeDetail,
				"active",
				false,
			);
		setNodeSelected(null);
	};

	return (
		<WrapperSection
			className="alert-details__network-connection network-connection !p-0 overflow-hidden"
			headerClassName="p-4 !mb-0"
			title={t("Network Connection")}
			loading={isGettingAlertNetworkConnection}
		>
			<div className="network-connection__container relative overflow-hidden bg-gray50">
				<NetworkConnectionNodeDetail
					{...{
						nodeData: {
							...nodeSelected?.nodeData,
							...(nodeSelected?.icon?.img
								? { icon: nodeSelected?.icon?.img }
								: {}),
						},
						onClose: closeNodeDetail,
					}}
				/>
				{useMemo(
					() => (
						<GraphViewComponent
							ref={graphRef}
							fitView
							data={chartData}
							toolbarItemsAllowed={[
								TOOL_BAR_ITEMS.zoomIn,
								TOOL_BAR_ITEMS.zoomOut,
							]}
							nodeOnClick={nodeOnClick}
						/>
					),
					[chartData],
				)}
			</div>
		</WrapperSection>
	);
};

export default NetworkConnection;

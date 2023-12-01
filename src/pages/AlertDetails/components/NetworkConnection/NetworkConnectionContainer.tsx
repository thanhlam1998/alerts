import { AlertApis } from "apis";
import { IEdge, IVertex } from "interfaces/alertsQueue";
import {
  DEFAULT_CONFIGS,
  executeForceAtlas2,
} from "pages/Graph/layoutRenderer";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { GRAPH_LAYOUT_OPTIONS, createEdge, createNode } from "scripts/helpers";
import NetworkConnection from "./NetworkConnection";

const NetworkConnectionContainer = () => {
  const { alertCIFNumber = "" } = useParams();

  const [chartData, setChartData]: any = useState({});

  const {
    isLoading: isGettingAlertNetworkConnection,
    data: alertNetworkConnectionData,
  }: any = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_NETWORK_CONNECTION,
      alertCIFNumber,
    ],
    () => AlertApis.getNetworkConnectionGraph(alertCIFNumber),
    { enabled: !!alertCIFNumber }
  );

  useEffect(() => {
    let nodes: IVertex[] = alertNetworkConnectionData?.data?.vertices ?? [];
    let edges: IEdge[] = alertNetworkConnectionData?.data?.edges ?? [];

    nodes = nodes.map((node: IVertex, index) => createNode(node, index === 0));
    edges = edges.map((edge: IEdge) => createEdge(edge));

    const result = executeForceAtlas2({
      ...DEFAULT_CONFIGS,
      ...GRAPH_LAYOUT_OPTIONS,
      nodes,
      edges,
    } as any);

    setChartData({
      nodes: result.nodes,
      edges: result.edges,
    });
  }, [alertNetworkConnectionData?.data]);

  return (
    <NetworkConnection {...{ chartData, isGettingAlertNetworkConnection }} />
  );
};

export default NetworkConnectionContainer;

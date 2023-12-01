import { CaseApis } from "apis";
import { IEdge, IVertex } from "interfaces/case";
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
  const { caseId = "" } = useParams();

  const [chartData, setChartData]: any = useState({});

  const {
    isLoading: isGettingCaseNetworkConnection,
    data: caseNetworkConnectionData,
  }: any = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_NETWORK_CONNECTION,
      caseId,
    ],
    () => CaseApis.getNetworkConnectionGraph(caseId),
    { enabled: !!caseId }
  );

  useEffect(() => {
    let nodes: IVertex[] = caseNetworkConnectionData?.data?.vertices ?? [];
    let edges: IEdge[] = caseNetworkConnectionData?.data?.edges ?? [];

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
  }, [caseNetworkConnectionData?.data]);

  return (
    <NetworkConnection {...{ chartData, isGettingCaseNetworkConnection }} />
  );
};

export default NetworkConnectionContainer;

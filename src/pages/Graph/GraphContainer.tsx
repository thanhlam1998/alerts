import { GraphApis } from "apis";
import { IExpandNode } from "apis/graph";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import dayjs from "dayjs";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { IEdge, IVertex } from "interface/graph";
import {
  IExpandObjectResult,
  ISearchItem,
  IShowGraphResult,
} from "interfaces/graph";
import { find } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  COLORS,
  GRAPH_NODE_ICON_SIZES,
  GRAPH_NODE_SIZES,
  RANGE_PICKER_FORMAT_DASH,
} from "scripts/constants";
import {
  GRAPH_LAYOUT_OPTIONS,
  createEdge,
  createNode,
  isTimeRangeValueValid,
  parseTimeRangeValue,
} from "scripts/helpers";
import GraphView from "./GraphView";
import { DEFAULT_CONFIGS, executeForceAtlas2 } from "./layoutRenderer";
import G6, { GraphOptions } from "@antv/g6";

let chartDataGlobal: any = {};
let queryParamsGlobal: ITimeRangeValue = { from: 1577811600, to: 1689786000 };


const GraphContainer = () => {
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const queryParams = parseTimeRangeValue(QUERY_DATA);
  queryParamsGlobal = queryParams;

  const [chartData, setChartData]: any = useState({});
  const [dataSearch, setDataSearch]: any = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);

  const { mutateAsync: callExpandNode } = useMutation(GraphApis.expandNode);
  let { mutateAsync: callShowGraph, isLoading: isCallingShowGraph } =
    useMutation(GraphApis.showGraph);

  const searchObjectParams: any = {
    searchKeyword: queryParams?.searchText ?? "",
  };

  if (
    isTimeRangeValueValid({
      from: queryParams?.from,
      to: queryParams?.to,
    })
  ) {
    searchObjectParams.startDateTime = queryParams?.from;
    searchObjectParams.endDateTime = queryParams?.to;
  }

  const { isLoading: onSearching }: any = useQuery(
    [BRI_USE_QUERY_REQUEST_KEY_NAMES.GRAPH.SEARCH_OBJECTS, searchObjectParams],
    () => GraphApis.searchObject(searchObjectParams),
    {
      onSuccess: (data) => {
        setDataSearch(data);
      },
      enabled: searchObjectParams?.searchKeyword?.length >= 3,
    }
  );

  const createTempGraph = ({
    initialNodes,
    initialEdges,
    center,
  }: {
    initialNodes: any[],
    initialEdges: any[],
    center?: any[];
  }) => {
    const container: any = document.getElementById("graph-view__container-temp");
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    let graph: any;
  
    const configs: GraphOptions = {
      container: container as any,
      width,
      height,
      animate: true,
      fitView: true,
      fitCenter: true,
      fitViewPadding: 8,
      renderer: "canvas",
      layout: {
        ...GRAPH_LAYOUT_OPTIONS,
        center: center ? center : [width / 2, height / 2],
        onLayoutEnd: () => {
         
          if (graph && graph.save) {
            const graphData: any = graph.save();
            console.log("LAYOUT END -> ", graphData);
            setChartData({
              nodes: graphData.nodes,
              edges: graphData.edges,
            });

            chartDataGlobal = {
              nodes: graphData.nodes,
              edges: graphData.edges,
            };

            graph.destroy();
          }
          
        },
      },
      // modes: {
      //   default: defaultMode,
      // },
      defaultNode: {
        cache: false,
        type: "circle",
        size: GRAPH_NODE_SIZES.base,
        style: {
          // fill: COLORS.white,
          // stroke: COLORS.blue[500],
          lineWidth: 1,
        },
        icon: {
          show: true,
          width: GRAPH_NODE_ICON_SIZES.base,
          height: GRAPH_NODE_ICON_SIZES.base,
        },
        labelCfg: {
          position: "bottom",
          style: {
            fill: COLORS.gray[800],
            fontSize: 10,
            fontWeight: 600,
            lineHeight: 12,
            fontFamily: "Nunito Sans",
            background: {
              fill: COLORS.gray[200],
              padding: 2,
              radius: 4,
            },
          },
        },
      },
      defaultEdge: {
        type: "line",
        style: {
          fill: COLORS.gray[300],
          stroke: COLORS.gray[300],
        },
        labelCfg: {
          autoRotate: true,
          position: "center",
          style: {
            fill: COLORS.gray[800],
            fontSize: 6,
            fontWeight: 400,
            lineHeight: 12,
            fontFamily: "Nunito Sans",
            background: {
              fill: "#FAFAFD",
              stroke: "#FAFAFD",
              padding: [2, 4, 2, 4],
              radius: 2,
            },
          },
        },
      },
      nodeStateStyles: {
        active: {
          fill: COLORS.blue[100],
        },
      },
      // plugins: [toolbar],
      edgeStateStyles: {
        "edge-selected": {
          lineWidth: 1,
        },
      },
    };
  
    graph = new G6.Graph(configs);
    graph.read({
      nodes: initialNodes,
      edges: initialEdges,
    });
  
    return graph;
  }
  

  useEffect(() => {
    (onSearching || queryParams?.searchText?.length === 0) &&
      setDataSearch(null);
  }, [queryParams?.searchText]);

  const onSelectNode = async (node: ISearchItem) => {
    const nodeDetail = await callShowGraph({
      cif: node.cif,
      startDateTime: queryParams?.from as number,
      endDateTime: queryParams?.to as number,
    });

    isCallingShowGraph = true;

    const showGraphResult: IShowGraphResult = nodeDetail?.data;

    let nodes: any = showGraphResult?.vertices ?? [];
    let edges: any = showGraphResult?.edges ?? [];

    nodes = nodes.map((node: IVertex, index: number) =>
      createNode(node as any, index === 0)
    );
    edges = edges.map((edge: IEdge) => createEdge(edge as any));

    createTempGraph({
      initialNodes: nodes,
      initialEdges: edges,
    });

    // const result = await executeForceAtlas2({
    //   ...DEFAULT_CONFIGS,
    //   ...GRAPH_LAYOUT_OPTIONS,
    //   center: center, 
    //   width: width,
    //   height: height,
    //   nodes,
    //   edges,
    // } as any);

    isCallingShowGraph = false;
    // chartDataGlobal = { nodes: result.nodes, edges: result.edges };
    // console.log("RESULT -> ", {
    //   nodes: result.nodes,
    //   edges: result.edges
    // });
    // setChartData({
    //   nodes: result.nodes,
    //   edges: result.edges,
    // });
  };

  const onClearGraph = () => {
    setChartData({ nodes: [], edges: [] });
  };

  const nodeOnDoubleClick = async (node: any, currentChartData: any) => {
    setIsFirstMount(false);
    const nodeInfo = node?.model;

    const params: IExpandNode = {
      vId: nodeInfo?.vId,
      vType: nodeInfo?.vType,
      startDateTime: queryParamsGlobal?.from as number,
      endDateTime: queryParamsGlobal?.to as number,
    };

    const { data }: { data: IExpandObjectResult } = await callExpandNode(
      params
    );

    const { edges, vertices } = data ?? {};

    const currentNodes = currentChartData?.nodes;
    const currentEdges = currentChartData?.edges;

    const expandedVertices = vertices?.map((item: any) => createNode(item));
    const expandedEdges = edges?.map((item: any) => createEdge(item));
    
    expandedVertices?.forEach((node: any) => {
      if (!find(currentNodes, { id: node?.id })) {
        currentNodes.push(node);
      }
    });

    expandedEdges?.forEach((edge: any) => {
       if (!find(currentEdges, { id: edge?.id })) {
        currentEdges.push(edge);
      }
    });

    currentNodes?.forEach((it: any) => {
      if (it?.vId === nodeInfo?.vId && nodeInfo?.icon?.origImg) {
        it.icon.img = it?.icon?.origImg;
      }
    });
    console.log("DOUBLE CLICK NODE -> ", node);
    console.log("create subgraph -> ", {
      initialNodes: currentNodes.filter((item: any) => item.vType === "Customer"),
      initialEdges: currentEdges,
    });

    createTempGraph({
      initialNodes: currentNodes,
      initialEdges: currentEdges,
    });
  };

  const onChangeTimeRange = ({ from, to }: ITimeRangeValue) => {
    if (from !== null && to !== null) {
      const fromString: any = dayjs(from * 1000).format(
        RANGE_PICKER_FORMAT_DASH
      );
      const toString: any = dayjs(to * 1000).format(RANGE_PICKER_FORMAT_DASH);

      onChangeFilter({
        ...QUERY_DATA,
        from: fromString,
        to: toString,
      });
    }
  };

  console.log("RENDER WITH CHART DATA -> ", chartData);

  return (
    <GraphView
      {...{
        dataSearch: dataSearch?.data,
        onSearching,
        nodeOnDoubleClick,
        onSelectNode,
        data: chartData,
        onClearGraph,
        onChangeTimeRange,
        isFirstMount,
        queryParams,
        isCallingShowGraph,
      }}
    />
  );
};

export default GraphContainer;

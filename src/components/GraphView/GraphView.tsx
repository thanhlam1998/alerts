import { Graph } from "@antv/g6";
import { Tooltip } from "antd";
import Image from "components/Image/Image";
import SpinLoading from "components/Loading";
import { ValueOf } from "interfaces/common";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ICONS_URL } from "scripts/constants";
import { createGraph, emptyFunction } from "scripts/helpers";
import "./GraphView.scss";

let graph: Graph | null;
const singleClick: any = { timeout: null, num: 0 };
let dataGlobal: any = {};
let loadingNode: any;
let graphCenter: any;

export const TOOL_BAR_ITEMS = {
  zoomIn: "zoomIn",
  zoomOut: "zoomOut",
  defaultZoom: "defaultZoom",
  fitView: "fitView",
  clear: "clear",
};

const GraphView = (
  {
    data = {},
    nodeOnClick = emptyFunction,
    nodeOnDoubleClick,
    onClearGraph,
    edgeOnClick = emptyFunction,
    toolbarItemsAllowed,
    fitView = true,
    fitCenter = false,
  }: {
    data: any;
    nodeOnClick?: (evt: any) => void;
    nodeOnDoubleClick?: (evt: any) => void;
    onClearGraph?: () => void;
    edgeOnClick?: (evt: any) => void;
    toolbarItemsAllowed?: "ALL" | ValueOf<typeof TOOL_BAR_ITEMS>[];
    fitView?: boolean;
    fitCenter?: boolean;
  },
  ref: any
) => {
  const [isChartReady, setIsChartReady] = useState(false);

  let toolbarItems = [
    {
      name: "Zoom In",
      code: TOOL_BAR_ITEMS.zoomIn,
      icon: ICONS_URL().zoomIn,
      onClick: () => {
        const zoomIndex: any = graph?.getZoom();
        graph?.zoomTo(zoomIndex + 0.2, graphCenter);
      },
    },
    {
      name: "Zoom Out",
      code: TOOL_BAR_ITEMS.zoomOut,
      icon: ICONS_URL().zoomOut,
      onClick: () => {
        const zoomIndex: any = graph?.getZoom();
        graph?.zoomTo(zoomIndex - 0.2, graphCenter);
      },
    },
    {
      name: "Fit View",
      code: TOOL_BAR_ITEMS.fitView,
      icon: ICONS_URL().fitView,
      onClick: () => {
        graph?.fitView();
      },
    },
    {
      name: "Default Zoom",
      code: TOOL_BAR_ITEMS.defaultZoom,
      icon: ICONS_URL().fitCenter,
      onClick: () => {
        graph?.zoomTo(1, graphCenter);
      },
    },
    {
      name: "Clear",
      code: TOOL_BAR_ITEMS.clear,
      icon: ICONS_URL().clean,
      onClick: () => {
        graph?.clear();
        dataGlobal = graph?.save();
        onClearGraph && onClearGraph();
      },
    },
  ];

  if (toolbarItemsAllowed !== "ALL") {
    toolbarItems = toolbarItems.filter((item) =>
      (toolbarItemsAllowed ?? []).includes(item.code)
    );
  }

  const [toolsBar, setToolsBar]: any = useState(toolbarItems);

  useImperativeHandle(ref, () => ({
    graphInstance: graph,
    export: (...params: any) => graph?.downloadFullImage(...params),
    setAddEdgeToolbarActive: (active: boolean) => {
      if (toolsBar?.length) {
        toolsBar[toolsBar?.length - 1].active = active;
        setToolsBar([...toolsBar]);
      }
    },
    updateNode: ({ nodeId, nodeData }: { nodeId: string; nodeData: any }) => {
      const item: any = graph?.findById(nodeId);
      graph?.updateItem(item, nodeData);
    },
  }));

  useEffect(() => {
    if (!graph) {
      initGraph();
    } else {
      const dataNodes = data?.nodes
        .filter(
          (node: any) =>
            !dataGlobal?.nodes?.find((item: any) => item.id === node.id)
        )
        .map((item: any) => ({ type: "node", model: item }));

      const globalEdgeIds = dataGlobal?.edges?.map((it: any) => it?.id);

      const dataEdges = data?.edges
        .filter((edge: any) => {
          return !globalEdgeIds?.includes(edge?.id);
        })
        .map((item: any) => ({ type: "edge", model: item }));

      // build for demo
      const originNodes = graph?.getNodes();
      const originEdges = graph?.getEdges();

      const nodes = data?.nodes?.map((it: any) => it?.id);
      const edges = data?.edges;

      originNodes?.map((originNode: any) => {
        if (nodes?.includes(originNode?._cfg?.id))
          graph?.showItem(originNode?._cfg?.id);
        else graph?.hideItem(originNode?._cfg?.id);
      });

      originEdges?.map((originEdge: any) => {
        const edge = edges?.find(
          (it: any) =>
            it?.source === originEdge?._cfg?.model?.source &&
            it?.target === originEdge?._cfg?.model?.target
        );
        if (edge) graph?.showItem(originEdge?._cfg?.id);
        else graph?.hideItem(originEdge?._cfg?.id);
      });

      graph?.addItems([...dataNodes, ...dataEdges]);

      if (loadingNode) {
        const item: any = graph?.findById(loadingNode?.id);
        item &&
          graph?.updateItem(item, {
            model: {
              icon: {
                img: loadingNode?.model?.icon?.img,
              },
            },
          });
      }
    }

    dataGlobal = graph?.save();
    fitCenter && graph?.fitCenter();
    fitView && graph?.fitView();
  }, [data]);

  useEffect(() => {
    return () => {
      if (graph) {
        graph?.destroy();
        graph = null;
      }
    };
  }, []);

  const initGraph = () => {
    graph = createGraph({
      fitView,
      nodes: data.nodes,
      edges: data.edges,
      elementId: "graph-view__container",
      setIsChartReady: () => setIsChartReady(true),
      onClearGraph: onClearGraph ?? emptyFunction,
    });

    graphCenter = { x: graph.getWidth() / 2, y: graph.getHeight() / 2 };

    graph?.on("node:click", (evt) => {
      clearTimeout(singleClick?.timeout);
      singleClick.num = singleClick.num + 1;
      singleClick.timeout = setTimeout(() => {
        if (singleClick.num == 1) {
          // clearAllStats();
          nodeOnClick(evt);
          // updateNodeData(evt);
        }
        if (singleClick.num > 1) {
          loadingNode = evt?.item?._cfg;
          nodeOnDoubleClick && nodeOnDoubleClick(evt);
        }
        singleClick.num = 0;
      }, 200);
    });

    // TODO: Temporary hide edge detail popup - Uncomment when Edge Details UI done
    // graph?.on("edge:click", (evt) => {
    //   edgeOnClick(evt)
    // });

    graph?.on("afterlayout", () => {
      dataGlobal?.nodes?.forEach((it: any) => {
        if (!it.fx) {
          it.fx = it?.x;
          it.fy = it?.y;
        } else {
          it.x = it?.fx;
          it.y = it?.fy;
        }
      });
    });

    graph?.on("node:dragend", (e) => {
      dataGlobal?.nodes?.forEach((it: any) => {
        it.fx = it?.x;
        it.fy = it?.y;
      });
    });
  };

  return (
    <div className="graph-view">
      {!isChartReady && (
        <div className="absolute w-full h-full">
          <SpinLoading />
        </div>
      )}
      <div
        className="graph-view__container h-full overflow-hidden"
        id="graph-view__container"
      >
        <div className="flex g6-component-toolbar left-0 bottom-0 !top-auto !bg-gray100 !rounded-[12px] !border-none gap-3">
          {toolsBar?.map((toolbar: any, index: any) => (
            <Tooltip placement="top" title={toolbar?.name} key={index}>
              <Image
                onClick={toolbar?.onClick}
                className={`w-6 h-6 cursor-pointer ${
                  toolbar?.active ? "bg-gray300" : ""
                }`}
                alt={toolbar?.name}
                src={toolbar?.icon}
              />
            </Tooltip>
          ))}
        </div>
        <div id="graph-view__container-temp" className="absolute w-full h-full -z-10"></div>
      </div>
    </div>
  );
};

export default forwardRef(GraphView);

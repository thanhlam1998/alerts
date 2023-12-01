import DropdownTree from "components/DropdownFilter/DropdownTree";
import GraphViewComponent from "components/GraphView";
import Loading from "components/Loading/Loading";
import PageWrapper from "components/PageWrapper";
import RangePicker from "components/RangePicker";
import WrapperSection from "components/WrapperSection/WrapperSection";
import Empty from "components/svgs/Empty";
import Home from "components/svgs/Home";
import { isEmpty } from "lodash";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ICONS_URL,
  NODE_VIEW_OPTIONS,
  VertexTypeEnum,
} from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./Graph.scss";
import SearchNode from "./components/SearchNode/SearchNode";
import { ObjectDetailTypeEnum } from "./components/ObjectDetail/ObjectDetailContainer";
import ObjectDetail from "./components/ObjectDetail";

const GraphView = ({
  dataSearch,
  onSearching = false,

  data,

  onSelectNode = emptyFunction,
  queryParams,

  onChangeTimeRange = emptyFunction,
  nodeOnDoubleClick = emptyFunction,

  isFirstMount = false,
  isCallingShowGraph,
}: any) => {
  const { t } = useTranslation();
  const graphRef: any = useRef(null);

  const [objectSelected, setObjectSelected] = useState<{
    type: ObjectDetailTypeEnum;
    data: any;
  } | null>(null);
  const [filterChartData, setFilterChartData]: any = useState([]);
  const [nodeView, setNodeView]: any = useState(
    NODE_VIEW_OPTIONS()?.map((item: any) => item?.key)
  );

  useEffect(() => {
    let origNodes = data?.nodes ?? [];
    let origEdges = data?.edges ?? [];

    let visibleNodes = [];
    let visibleEdge = [];

    if (nodeView?.length) {
      visibleNodes = origNodes?.filter((it: any) =>
        nodeView?.includes(it?.vType)
      );
      const nodeIds = visibleNodes?.map((it: any) => it?.id);
      visibleEdge = origEdges?.filter(
        (it: any) =>
          nodeIds.includes(it?.source) && nodeIds.includes(it?.target)
      );
    }

    if (!nodeView?.length) {
      setFilterChartData({ nodes: origNodes, edges: origEdges });
    } else {
      setFilterChartData({ nodes: visibleNodes, edges: visibleEdge });
    }
  }, [nodeView, data]);

  const nodeOnClick = (node: any) => {
    const nodeData = node?.item?._cfg?.model;
    setObjectSelected({
      type: ObjectDetailTypeEnum.NODE,
      data: nodeData,
    });
  };

  const edgeOnClick = (edge: any) => {
    const edgeData = edge?.item?._cfg?.model;
    setObjectSelected({
      type: ObjectDetailTypeEnum.EDGE,
      data: edgeData,
    });
  };

  const closeNodeDetail = () => {
    const nodeDetail = graphRef?.current?.graphInstance?.findById(
      objectSelected?.data.vId
    );
    if (nodeDetail)
      graphRef?.current?.graphInstance?.setItemState(
        nodeDetail,
        "active",
        false
      );
    setObjectSelected(null);
  };

  return (
    <PageWrapper
      breadcrumbItems={[
        {
          href: "#",
          title: <Home className="w-3 h-3" />,
        },
        {
          href: "/graphs",
          title: "Graph",
        },
      ]}
    >
      <div className="graphs-page-container">
        <WrapperSection
          className="p-2"
          headerClassName="!mb-0"
          title={
            <SearchNode
              {...{
                dataSearch,
                onSelectNode,
                onSearching,
              }}
            />
          }
          rightHeaderContent={
            <div className="flex items-center justify-end gap-2">
              <RangePicker
                {...{
                  onChangeTimeRange,
                  timeRangeValue: {
                    from: queryParams?.from,
                    to: queryParams?.to,
                  },
                }}
              />
              <DropdownTree
                loading={false}
                items={
                  [
                    {
                      label: t("Node View"),
                      value: "ALL",
                      children: NODE_VIEW_OPTIONS()?.map(
                        (item: { label: string; key: string }) => {
                          return {
                            label: item?.label,
                            value: item?.key,
                            imageUrl: null,
                          };
                        }
                      ) as any[],
                    },
                  ] ?? []
                }
                isInFilterSection
                dropdownPanelPosition={`bottom`}
                filterBy="nodeView"
                onApply={(itemsSelected: any) => {
                  setNodeView(itemsSelected);
                }}
                selectedItems={nodeView}
              />
            </div>
          }
        />
        <div className="graphs-container relative overflow-hidden">
          {(() => {
            if (isEmpty(data) && !isCallingShowGraph) {
              return (
                <div className="w-full h-[calc(100%-72px)] flex items-center justify-center flex-col gap-1 absolute z-50 top-0 left-0 right-0">
                  <Empty />
                  <span className="text-gray400 sm_body_b2_reg">
                    {t(
                      "Please search an CIF #, Account #, CIF or Account Name"
                    )}
                  </span>
                </div>
              );
            }

            if (isCallingShowGraph) {
              return (
                <div className="w-full h-[calc(100%-72px)] flex items-center justify-center flex-col gap-1 absolute z-50 top-0 left-0 right-0">
                  <Loading />
                </div>
              );
            }
          })()}
          <ObjectDetail
            {...{
              objectType: objectSelected?.type,
              objectData: objectSelected?.data,
              onClose: closeNodeDetail,
            }}
          />
            <GraphViewComponent
                ref={graphRef}
                data={filterChartData}
                toolbarItemsAllowed="ALL"
                nodeOnDoubleClick={(e: any) => {
                  let node = e?.item?._cfg;
                  const EXPAND_VALID_NODE_TYPES = [
                    VertexTypeEnum.Account,
                    VertexTypeEnum.Customer,
                  ];
                  const clickedVType = node.model?.nodeData?.vType;
                  if (
                    clickedVType &&
                    EXPAND_VALID_NODE_TYPES.includes(clickedVType)
                  ) {
                    node.model.icon.origImg = node.model.icon.img ?? null;
                    node.model.icon.img = ICONS_URL().loading;

                    graphRef?.current?.updateNode({
                      nodeId: node?.id,
                      nodeData: {
                        model: {
                          icon: {
                            img: ICONS_URL().loading,
                          },
                        },
                      },
                    });

                    const cloneGraphData = graphRef?.current?.graphInstance?.save();
                    console.log("double click inside -> ", cloneGraphData);
                    // console.log("double click inside -> ", cloneGraphData);
                    nodeOnDoubleClick(node, {
                      nodes: cloneGraphData.nodes?.map((item: any) => ({...item})),
                      edges: cloneGraphData.edges?.map((item: any) => ({...item})),
                    });
                  }
                }}
                {...{ nodeOnClick, fitView: isFirstMount, edgeOnClick }}
              />
        </div>
      </div>
    </PageWrapper>
  );
};

export default GraphView;

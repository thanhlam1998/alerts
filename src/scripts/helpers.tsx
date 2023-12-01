import G6, { EdgeConfig, GraphOptions, NodeConfig } from "@antv/g6";
import { RcFile } from "antd/lib/upload";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import dayjs from "dayjs";
import { ICaseStatus } from "interface/case";
import { IEdge, IVertex } from "interfaces/alertsQueue";
import { CaseDetailActionEnum, CaseDetailActionPrivilegeMap } from "interfaces/case";
import { ISortColumn } from "interfaces/common";
import { filter, get, isEmpty, isNaN, isNull, isNumber, isUndefined, random, range } from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createSelector } from "reselect";
import i18n from "translations";
import {
  ALERT_PRIORITIES,
  CASE_APPROVAL_STATUS_ENUM,
  CASE_PRIORITIES,
  COLORS,
  DATE_FORMAT,
  DEFAULT_CURRENCY,
  DEFAULT_VALUES,
  EDGE_VIEW_OPTIONS,
  GRAPH_NODE_ICON_SIZES,
  GRAPH_NODE_SIZES,
  ICONS_URL,
  LEFT_MENU_KEY,
  LIKELI_HOOD_ESTIMATIONS,
  NODE_VIEW_OPTIONS,
  NUMBER_DECIMAL_DIGITS,
  PICKER_TYPES,
  USER_ROLES,
  VertexTypeEnum,
} from "./constants";

export const emptyFunction = (f?: any) => f;

export const isJson = (data: any) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

export const getRedux = (path: string, defaultValue: any) => {
  const getValueRedux = (path: string) => (object: any) => get(object, path);
  const selectValueRedux = (path: string) => createSelector(getValueRedux(path), (data) => data);
  const getSelector = (path: string) => useSelector(selectValueRedux(path));
  return getSelector(path) || defaultValue;
};

export const formatNumberWithCommas = (number: any) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const addKeyToArr = (arr: any) => {
  return !isEmpty(arr) ? arr?.map((item: any, index: number) => ({ ...item, key: index, index })) : [];
};

export const trimSpaces = (str?: string) => str?.replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");

export const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const isValidPassword = (value: any, reg: any) => {
  return filter([...value], (c: any) => reg.test(c) === true)?.length > 0;
};

export const validStyle = (field: any) => {
  return {
    className: "",
    icon: field ? <span className="text-blue500">✓</span> : "•",
  };
};

export const checkFileCondition = (file: RcFile) => {
  const isLt2M = file.size / 1024 / 1024 < 1;

  if (!isLt2M) {
    toast.error(i18n.t("Image must smaller than 1MB!"));
  }

  return isLt2M;
};

export const formatLastUpdatedTime = (time?: any) => (time ? moment.unix(time).fromNow() : DEFAULT_VALUES?.noData);

export const getShortUserName = (firstName: string = "", lastName: string = "") =>
  (firstName || "")?.charAt(0)?.toUpperCase() + (lastName || "")?.charAt(0)?.toUpperCase();

export const getTableSort = (sort: any) => {
  switch (sort) {
    case 1:
      return "ascend";
    case 0:
      return "descend";
    default:
      return undefined;
  }
};

export const getTableColumnSortOrder = (sortBy: ISortColumn<any>[], fieldKey: string) => {
  const existed = sortBy.find((item) => item.fieldKey === fieldKey);
  if (!existed) {
    return undefined;
  }

  return getTableSort(existed.sortOrder);
};

export const mapSortColumnParams = (newSortList: any, oldSortList: ISortColumn<any>[]): ISortColumn<any>[] => {
  let sortParams: any[] = [...oldSortList];
  newSortList?.forEach((sort: any) => {
    const existedIndex = sortParams.findIndex((item) => item.fieldKey === sort.field);
    if (existedIndex > -1) {
      if (sort?.order) {
        sortParams[existedIndex].sortOrder = sort?.order === "ascend" ? 1 : sort?.order === "descend" ? 0 : null;
      } else {
        // Remove existing sort item at index
        sortParams.splice(existedIndex, 1);
      }
    } else {
      sortParams.push({
        fieldKey: sort.field,
        sortOrder: sort?.order === "ascend" ? 1 : sort?.order === "descend" ? 0 : null,
      });
    }
  });

  const sorterFields = newSortList.map((item: any) => item.field);
  sortParams = sortParams.filter((item) => sorterFields.includes(item.fieldKey));

  return sortParams;
};

export const getAlertPriorityColor = (status: ALERT_PRIORITIES | CASE_PRIORITIES) => {
  switch (status) {
    case ALERT_PRIORITIES.HIGH:
    case CASE_PRIORITIES.HIGH:
      return "red";
    case ALERT_PRIORITIES.MEDIUM:
    case CASE_PRIORITIES.MEDIUM:
      return "yellow";
    default:
      return "gray";
  }
};

export const getCaseApprovalStatus = (status: CASE_APPROVAL_STATUS_ENUM) => {
  switch (status) {
    case CASE_APPROVAL_STATUS_ENUM.OPEN:
      return "blue";
    case CASE_APPROVAL_STATUS_ENUM.ON_SIGNER:
      return "purple";
    case CASE_APPROVAL_STATUS_ENUM.ON_CHECKER:
      return "yellow";
    default:
      return "gray";
  }
};

export const getCaseStatusColor = (status: ICaseStatus) => {
  switch (status) {
    case "ONGOING":
      return "blue";
    case "CLOSED":
      return "gray";
    default:
      return "gray";
  }
};

type ConvertToDisplayType = "number" | "percent" | "lastUpdatedTime" | "decimalNumber" | "money";

export const formatPercent = (percentValue: number) => {
  percentValue = Math.abs(percentValue);
  percentValue = Number.isInteger(percentValue)
    ? percentValue
    : parseFloat(percentValue.toFixed(+percentValue > 100 ? 0 : NUMBER_DECIMAL_DIGITS));

  return `${formatNumberWithCommas(percentValue)}%`;
};

export const isValueInValid = (value: any) =>
  value === Infinity || isNull(value) || isUndefined(value) || isNaN(+value);

export const formatMoney = (number: any, currency = DEFAULT_CURRENCY) => {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const convertToDisplay = (value: any, type = "number" as ConvertToDisplayType, currency = DEFAULT_CURRENCY) => {
  switch (type) {
    case "lastUpdatedTime": {
      return !isEmpty(value) && !isNaN(value) ? moment.unix(value).fromNow() : DEFAULT_VALUES.noData;
    }
    case "number":
    case "decimalNumber":
    case "percent": {
      if (isValueInValid(value)) return DEFAULT_VALUES.noData;
      if (type === "number") return formatNumberWithCommas(+value);
      if (type === "decimalNumber") {
        return formatNumberWithCommas(Number(value).toFixed(NUMBER_DECIMAL_DIGITS));
      }
      if (type === "percent") return formatPercent(+value);
      break;
    }
    case "money": {
      return isNumber(value) ? `${currency} ${formatMoney(value, currency)}` : DEFAULT_VALUES.noData;
    }
    default:
      return value;
  }
};

export const getDefaultPickerTime = () => {
  const defaultFrom = moment().startOf("month").format(DATE_FORMAT);
  const defaultTo = moment().endOf("month").format(DATE_FORMAT);

  return {
    from: defaultFrom,
    to: defaultTo,
    pickerType: PICKER_TYPES?.monthly,
  };
};

export const arrFromRange = (from: number, to: number) => {
  return range(+from + 1, +to + 1);
};

export const getRiskScoreColor = (score: number) => {
  if (score > 90) return COLORS.red[500];
  else if (score > 80 && score <= 90) return COLORS.orange[500];
  else if (score < 80) return COLORS.yellow[500];
};

export const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!urlPattern.test(urlString);
};

export const sorterMoney = (money: number) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter?.format(money);
};

export const getLikelihoodEstimationName = (code?: number) => {
  const estimate = LIKELI_HOOD_ESTIMATIONS().find((it: any) => it?.value === code);
  return estimate?.label ?? "NaN";
};

export const CHART_COLORS = [
  COLORS?.blue[400],
  COLORS?.green[400],
  COLORS?.orange[400],
  COLORS?.red[400],
  COLORS?.gray[400],
  COLORS?.orange[700],
  COLORS?.blue[600],
  COLORS?.green[200],
  COLORS?.orange[700],
  COLORS?.red[300],
  COLORS?.gray[500],
  COLORS?.orange[300],
];
export const GRAPH_LAYOUT_OPTIONS = {
  type: "forceAtlas2",
  prune: false, // use this to show more than 100 nodes on graph
  preventOverlap: true,
  kr: 200,
  workerEnabled: true,
  workerScriptURL: window.location.origin + "/source/layout.min.js",
};

interface configOptions extends Partial<GraphOptions> {
  setIsChartReady: any;
  elementId: string;
  customTooltip?: any;
  customNodeTooltip?: any;
  nodes: NodeConfig[];
  edges: EdgeConfig[];
  tooltipType?: "edge-tooltip" | "tooltip";
  onClearGraph?: () => void;
  fitView?: boolean;
}

export const createGraph = ({
  nodes,
  edges,
  elementId,
  setIsChartReady,
  customTooltip,
  customNodeTooltip,
  onClearGraph,
  fitView = false,
}: configOptions) => {
  const container = document.getElementById(elementId);

  const width = container?.clientWidth ?? 0;
  const height = container?.clientHeight || 492;
  const center = { x: width / 2, y: height / 2 };

  new G6.ToolBar({
    className:
      "graph-view-toolbar g6-component-toolbar left-0 bottom-0 !top-auto !bg-[#F2F2F5] !rounded-full !border-none",
    // container: "custom-g6-toolbar",
    getContent: () => {
      const toolbarItems = [
        {
          name: "zoom-in",
          icon: ICONS_URL().zoomIn,
          onClick: () => {
            const zoomIndex = graph.getZoom();
            graph.zoomTo(zoomIndex + 0.2, center);
          },
        },
        {
          name: "zoom-out",
          icon: ICONS_URL().zoomOut,
          onClick: () => {
            const zoomIndex = graph.getZoom();
            graph.zoomTo(zoomIndex - 0.2, center);
          },
        },
        {
          name: "default-zoom",
          icon: ICONS_URL().fitCenter,
          onClick: () => {
            graph.zoomTo(1, center);
          },
        },
        {
          name: "fit-view",
          icon: ICONS_URL().fitView,
          onClick: () => {
            graph.fitView();
          },
        },
        {
          name: "clear",
          icon: ICONS_URL().clean,
          onClick: () => {
            graph.clear();
            onClearGraph && onClearGraph();
          },
        },
      ];

      let containerToolbar: any = document.createElement("custom-g6-toolbar");

      let toolbarG6 = document.createElement("div");
      toolbarG6.classList.add("toolbar");
      toolbarG6.style.display = "flex";
      toolbarG6.style.flexDirection = "row";

      toolbarItems.forEach((item) => {
        const button: any = document.createElement("div");
        button.innerHTML = `<img style="width:20px ; margin: 0 5px; cursor:pointer" src="${item.icon}" alt="${item.name}"/>`;
        button.onclick = item.onClick;
        toolbarG6.appendChild(button);
      });
      containerToolbar.appendChild(toolbarG6);

      return containerToolbar;
    },
  });

  const defaultMode: any = ["drag-canvas", "click-edge", "drag-node"];

  if (customNodeTooltip) {
    defaultMode.push({
      type: "tooltip",
      formatText(edge: any) {
        if (customNodeTooltip) return customNodeTooltip(edge);
      },
    });
  }

  if (customTooltip) {
    defaultMode.push({
      type: "edge-tooltip",
      formatText(edge: any) {
        if (customTooltip) return customTooltip(edge);
      },
    });
  }

  const configs: GraphOptions = {
    container: container as any,
    width,
    height,
    animate: true,
    fitView,
    fitCenter: true,
    fitViewPadding: 8,
    renderer: "canvas",
    layout: {
      ...GRAPH_LAYOUT_OPTIONS,
      onLayoutEnd: () => {
        setIsChartReady(true);
      },
    },
    modes: {
      default: defaultMode,
    },
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

  const graph = new G6.Graph(configs);

  graph.read({ nodes, edges });

  if (typeof window !== "undefined") {
    window.onresize = () => {
      if (!graph || graph.get("destroyed")) return;
      if (!container || !container.clientWidth || !container.clientHeight) return;
      graph.changeSize(container.clientWidth, container.clientHeight);
    };
  }

  graph.on("afterpaint", () => {
    if (!container || !container.clientWidth || !container.clientWidth) return;
    graph.changeSize(container.clientWidth, container.clientHeight);
  });

  return graph;
};

export const getTextWidth = (text: string, fontSize: number) => {
  const hiddenElem: any = document.createElement("span");
  hiddenElem.style = `
    position: absolute;
    visibility: hidden;
    font: "Nunito Sans";
    font-size: ${fontSize}px;
    white-space: pre;
  `;
  hiddenElem.textContent = text;
  document.body.appendChild(hiddenElem);
  const width = hiddenElem.offsetWidth;
  document.body.removeChild(hiddenElem);
  return width;
};

export const renderHighlight = (sourceText: string, highlightText: string) => {
  const index = sourceText?.indexOf(highlightText);
  if (index === -1) return sourceText;
  const first = sourceText?.substring(0, index);
  const highlight = sourceText?.substring(index, index + highlightText.length);
  const last = sourceText?.substring(index + highlightText.length);
  return (
    <div>
      {first}
      <span className="text-blue500">{highlight}</span>
      {last}
    </div>
  );
};

export const getNodeConfigByType = (nodeType: VertexTypeEnum) => {
  switch (nodeType) {
    case VertexTypeEnum.Account:
      return {
        icon: {
          show: true,
          img: ICONS_URL()?.[nodeType],
        },
        shape: "circle",
        size: [40],
        color: COLORS.purple[400],
        style: {
          fill: "white",
          lineWidth: 2,
          stroke: COLORS.purple[300],
        },
      };
    case VertexTypeEnum.Alert:
      return {
        icon: {
          show: true,
          img: ICONS_URL()?.[nodeType],
        },
        shape: "circle",
        size: [40],
        color: COLORS.yellow[400],
        style: {
          fill: "white",
          lineWidth: 2,
          stroke: COLORS.yellow[300],
        },
      };
    case VertexTypeEnum.CaseReport:
      return {
        icon: {
          show: true,
          img: ICONS_URL()?.[nodeType],
        },
        shape: "circle",
        size: [40],
        color: COLORS.green[400],
        style: {
          fill: "white",
          lineWidth: 2,
          stroke: COLORS.green[300],
        },
      };
    case VertexTypeEnum.Customer:
      return {
        icon: {
          show: true,
          img: ICONS_URL()?.[nodeType],
        },
        shape: "circle",
        size: [40],
        color: COLORS.blue[400],
        style: {
          fill: "white",
          lineWidth: 2,
          stroke: COLORS.blue[300],
        },
      };
    case VertexTypeEnum.Transaction:
      return {
        icon: {
          show: true,
          img: ICONS_URL()?.[nodeType],
        },
        shape: "circle",
        size: [40],
        color: COLORS.gray[400],
        style: {
          fill: "white",
          lineWidth: 2,
          stroke: COLORS.gray[300],
        },
      };

    default:
      return {
        icon: {
          show: false,
        },
        shape: "circle",
        size: [40],
        color: COLORS.blue[400],
        style: {
          fill: COLORS.white,
          stroke: COLORS.blue[300],
          lineWidth: 2,
        },
      };
  }
};

export const getMonthName = (month: number) => {
  if (month) {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString("en-US", { month: "short" });
  }
  return null;
};

export const downloadURL = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const randomUniqueKey = () => random(11111, 99999);

export const renderRiskScore = (riskScore: any) => {
  return <span>{riskScore?.toFixed(3)}</span>;
};

export const containsAll = (needles: any, haystack: any) => needles.every(Set.prototype.has, new Set(haystack));

export const numFormatter = (num: any) => {
  if (num >= 1000000) {
    return convertToDisplay((num / 1000000).toFixed(1)).replace(/\.0$/, "") + "M";
  }

  if (num >= 1000) {
    return convertToDisplay((num / 1000).toFixed(1)).replace(/\.0$/, "") + "K";
  }

  return convertToDisplay(num);
};

export const createNode = (node: IVertex, mainNode: boolean = false) => {
  const nodeMappingLabel = NODE_VIEW_OPTIONS().find(
    (it: { label: string; key: string }) => it.key === node.vType
  )?.label;

  return {
    label: `${node?.attributes?.name || nodeMappingLabel || node.vType}\n ${node.vId}`,
    id: (node?.vId ?? "") + (node?.vType ?? ""),
    vId: node?.vId,
    vType: node?.vType,
    nodeData: node,
    mainNode,
    ...(node?.vType ? getNodeConfigByType(node?.vType) : {}),
  };
};

export const createEdge = (edgeData: IEdge) => {
  const edgeMappingLabel = EDGE_VIEW_OPTIONS().find(
    (it: { label: string; key: string }) => it.key === edgeData.eType
  )?.label;

  const source = (edgeData?.fromId ?? "") + edgeData?.fromType;
  const target = (edgeData?.toId ?? "") + edgeData?.toType;

  return {
    source,
    target,
    id: `${source}-${target}`,
    label: edgeMappingLabel ?? edgeData?.eType,
    eType: edgeData?.eType,
    ...(!!edgeData?.directed && {
      style: {
        endArrow: {
          path: "M 0,0 L 5,2.5 L 5,-2.5 Z",
          fill: COLORS.gray[300],
          stroke: COLORS.gray[300],
          opacity: 1,
        },
      },
    }),
    edgeData: edgeData,
  };
};

export const isTimeRangeValueValid = (val: ITimeRangeValue) => {
  if (isNull(val?.from) || isNull(val?.to)) return false;

  if (typeof val?.from === "string") {
    val.from = +val.from;
  }

  if (typeof val?.to === "string") {
    val.to = +val.to;
  }

  return !isNaN(val?.from) && !isNaN(val?.to) && isValidDateTime(val?.from * 1000) && isValidDateTime(val?.to * 1000);
};

const isValidDateTime = (input: any) => {
  // Check if input is a valid time string or Unix timestamp
  const isValidTimeString = dayjs(input).isValid();
  const isValidUnixTimestamp = dayjs.unix(input).isValid();

  return isValidTimeString || isValidUnixTimestamp;
};

const DATE_REGEX = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-\d{4}$/;
export const parseTimeRangeValue = (obj: any) => {
  const newObj = { ...obj };

  newObj.from =
    isEmpty(newObj.from) || !DATE_REGEX.test(newObj.from) ? null : moment.utc(newObj.from, DATE_FORMAT).unix();

  newObj.to = isEmpty(newObj.to) || !DATE_REGEX.test(newObj.to) ? null : moment.utc(newObj.to, DATE_FORMAT).unix();

  return newObj;
};

export const getCaseDetailPrivilegeMap = (role: string, approvalStatus: string): CaseDetailActionPrivilegeMap => {
  let mappedPrivilegeMap: CaseDetailActionPrivilegeMap = {};
  switch (role) {
    case USER_ROLES.MAKER:
      mappedPrivilegeMap = {
        [CaseDetailActionEnum.APPROVE]: false,
        [CaseDetailActionEnum.REJECT]: false,
        [CaseDetailActionEnum.SUBMIT]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.OPEN,
        [CaseDetailActionEnum.REOPEN]: false,
      };
      break;
    case USER_ROLES.CHECKER:
      mappedPrivilegeMap = {
        [CaseDetailActionEnum.APPROVE]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.ON_CHECKER,
        [CaseDetailActionEnum.REJECT]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.ON_CHECKER,
        [CaseDetailActionEnum.SUBMIT]: false,
        [CaseDetailActionEnum.REOPEN]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.CLOSED,
      };
      break;
    case USER_ROLES.SIGNER:
      mappedPrivilegeMap = {
        [CaseDetailActionEnum.APPROVE]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.ON_SIGNER,
        [CaseDetailActionEnum.REJECT]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.ON_SIGNER,
        [CaseDetailActionEnum.SUBMIT]: false,
        [CaseDetailActionEnum.REOPEN]: approvalStatus === CASE_APPROVAL_STATUS_ENUM.CLOSED,
      };
      break;
    default:
      break;
  }

  const isEditable = approvalStatus === CASE_APPROVAL_STATUS_ENUM.OPEN;

  return {
    ...mappedPrivilegeMap,
    [CaseDetailActionEnum.CREATE_ADHOC_CASE]: isEditable,
    [CaseDetailActionEnum.EDIT_CASE_INFO]: isEditable,
    [CaseDetailActionEnum.CHANGE_PRIORITY]: isEditable,
    [CaseDetailActionEnum.SEARCH_MAKER]: isEditable,
    [CaseDetailActionEnum.ADD_MAKER]: isEditable,
    [CaseDetailActionEnum.REMOVE_MAKER]: isEditable,
    [CaseDetailActionEnum.REMOVE_SUBJECT_FROM_INCIDENTAL_SUBJECT]: isEditable,
    [CaseDetailActionEnum.ADD_SUBJECT_TO_INCIDENTAL_SUBJECT]: isEditable,
    [CaseDetailActionEnum.REMOVE_ALERT_FROM_CASE]: isEditable,
    [CaseDetailActionEnum.ADD_ALERT_TO_CASE]: isEditable,
  };
};

const getActiveAlertsLeftMenu = (url: string) => {
  let activeData: any = {
    openKeys: [],
    selectedKeys: [LEFT_MENU_KEY?.ALERTS],
  };
  const path = url?.split("/")?.[2] ?? ``;
  switch (path) {
    case `queue`:
      activeData = {
        openKeys: [LEFT_MENU_KEY?.ALERTS],
        selectedKeys: [LEFT_MENU_KEY?.ALERTS, LEFT_MENU_KEY?.ALERTS_QUEUE],
      };
      break;
    case `archived`:
      activeData = {
        openKeys: [LEFT_MENU_KEY?.ALERTS],
        selectedKeys: [LEFT_MENU_KEY?.ALERTS, LEFT_MENU_KEY?.ALERTS_ARCHIVED],
      };
      break;
    default:
      break;
  }
  return activeData;
};

export const getActiveLeftMenuFromUrl = (url: string) => {
  // ex: /shipments/carriers
  if (url?.charAt(0) !== "/") {
    url = "/" + url;
  }

  const serviceName = url?.split("/")?.[1] ?? ``;
  let activeLeftMenuData: any = {};
  switch (serviceName) {
    case LEFT_MENU_KEY?.ALERTS:
      activeLeftMenuData = getActiveAlertsLeftMenu(url);
      break;
    default:
      break;
  }
  return activeLeftMenuData;
};

export const sorterByField = (field: string) => (a: any, b: any) => {
  const valueA = get(a, field);
  const valueB = get(b, field);
  if (valueA instanceof Date) {
    return moment(valueA).isBefore(moment(get(b, field)));
  }
  const type = typeof valueA;

  switch (type) {
    case "number":
      return valueA > valueB;
    case "boolean":
      return valueA - valueB;
    case "string":
    default: {
      const nameA = valueA?.toLowerCase() || "";
      const nameB = valueB?.toLowerCase() || "";
      return nameA?.localeCompare(nameB);
    }
  }
};

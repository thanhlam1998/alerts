import AdministrationIcon from "components/svgs/Administration";
import AlertsIcon from "components/svgs/Alerts";
import CasesIcon from "components/svgs/Cases";
import GraphIcon from "components/svgs/Graph";
import HomeIcon from "components/svgs/Home";
import i18next from "translations";
import variables from "./variables";

export const HTTP_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  GATEWAY_TIMEOUT: 504,
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const API_PREFIX = "/api";

export const API_SERVICES = {
  AUTH: `${API_PREFIX}/auth`,
  USERS: `${API_PREFIX}/users`,
  ALERTS: `${API_PREFIX}/alerts`,
  TRANSACTIONS: `${API_PREFIX}/transactions`,
  GENERAL: `${API_PREFIX}/general`,
  CASES: `${API_PREFIX}/cases`,
  DASHBOARD: `${API_PREFIX}/dashboard`,
  EXPLORER: `${API_PREFIX}/explorer`,
};

export enum SortEnumType {
  ASC = 1,
  DESC = 0,
}

export const LEFT_MENU_KEY = {
  DASHBOARD: "dashboard",
  GRAPHS: "graphs",
  ALERTS: "alerts",
  ALERTS_QUEUE: "alerts-queue",
  ALERTS_ARCHIVED: "alerts-archived",
  CASES: "cases",
  USERS: "users",
};

export const DEFAULT_CURRENCY = "IDR";

export enum USER_ROLES {
  ADMIN = "Admin",
  MAKER = "Maker",
  CHECKER = "Checker",
  SIGNER = "Signer",
}

export const USER_ROLE_OPTIONS = {
  // [USER_ROLES.ADMIN]: {
  //   label: i18next.t("Admin"),
  //   value: USER_ROLES.ADMIN,
  //   description: i18next.t("Admin"),
  // },
  [USER_ROLES.MAKER]: {
    label: i18next.t("Maker"),
    value: USER_ROLES.MAKER,
    description: i18next.t("Maker"),
  },
  [USER_ROLES.CHECKER]: {
    label: i18next.t("Checker"),
    value: USER_ROLES.CHECKER,
    description: i18next.t("Checker"),
  },
  [USER_ROLES.SIGNER]: {
    label: i18next.t("Signer"),
    value: USER_ROLES.SIGNER,
    description: i18next.t("Signer"),
  },
};

export enum ALERT_PRIORITIES {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export const ALERT_PRIORITY_OPTIONS = (t: any) => [
  {
    name: t("Low"),
    value: ALERT_PRIORITIES.LOW,
  },
  {
    name: t("Medium"),
    value: ALERT_PRIORITIES.MEDIUM,
  },
  {
    name: t("High"),
    value: ALERT_PRIORITIES.HIGH,
  },
];

export enum CASE_PRIORITIES {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export const CASE_PRIORITY_OPTIONS = (t: any) => [
  {
    name: t("Low"),
    value: ALERT_PRIORITIES.LOW,
  },
  {
    name: t("Medium"),
    value: ALERT_PRIORITIES.MEDIUM,
  },
  {
    name: t("High"),
    value: ALERT_PRIORITIES.HIGH,
  },
];

export const CASE_STATUS_TYPE = () => [
  {
    name: i18next.t("Ongoing"),
    value: "ONGOING",
  },
  {
    name: i18next.t("Closed"),
    value: "CLOSED",
  },
];

export const LEFT_MENU_ITEMS = (t: any) => [
  // {
  //   id: 1,
  //   key: LEFT_MENU_KEY?.DASHBOARD,
  //   title: t("Dashboard"),
  //   link: `/${LEFT_MENU_KEY?.DASHBOARD}/cases`,
  //   icon: <HomeIcon />,
  //   external: false,
  //   subs: [],
  //   role: [USER_ROLES.ADMIN],
  // },
  // {
  //   id: 2,
  //   key: LEFT_MENU_KEY?.GRAPHS,
  //   title: t("Graphs"),
  //   link: `/${LEFT_MENU_KEY?.GRAPHS}`,
  //   icon: <GraphIcon />,
  //   external: false,
  //   subs: [],
  //   role: [USER_ROLES.ADMIN],
  // },
  {
    id: 3,
    key: LEFT_MENU_KEY?.ALERTS,
    title: t("Alerts"),
    link: `/${LEFT_MENU_KEY?.ALERTS}`,
    icon: <AlertsIcon />,
    external: false,
    subs: [
      {
        id: 1,
        key: LEFT_MENU_KEY?.ALERTS_QUEUE,
        title: t("Alerts Queue"),
        link: `/${LEFT_MENU_KEY?.ALERTS}/queue`,
        external: false,
      },
      {
        id: 1,
        key: LEFT_MENU_KEY?.ALERTS_ARCHIVED,
        title: t("Archived Alerts"),
        link: `/${LEFT_MENU_KEY?.ALERTS}/queue`,
        external: false,
      },
    ],
    role: [USER_ROLES.ADMIN],
  },
  // {
  //   id: 1,
  //   key: LEFT_MENU_KEY?.CASES,
  //   title: t("Cases"),
  //   link: `/${LEFT_MENU_KEY?.CASES}`,
  //   icon: <CasesIcon />,
  //   external: false,
  //   subs: [],
  //   role: [USER_ROLES.ADMIN],
  // },
  // {
  //   id: 1,
  //   key: LEFT_MENU_KEY?.USERS,
  //   title: i18next.t("Administration"),
  //   link: `/${LEFT_MENU_KEY?.USERS}`,
  //   icon: <AdministrationIcon />,
  //   external: false,
  //   subs: [],
  //   role: [USER_ROLES.ADMIN],
  // },
];

export const DATE_FORMAT = "MM/DD/YYYY";
export const DATE_FORMAT_2 = "MMM.YYYY";
export const DATE_FORMAT_3 = "MMMM.DD.YYYY";
export const DATE_PICKER_FORMAT = "MMM.DD.YYYY";
export const RANGE_PICKER_FORMAT = "MMM.DD.YYYY";
export const RANGE_PICKER_FORMAT_DASH = "MM-DD-YYYY";

export const ALERT_DATE_TIME_FORMAT = "MMM.DD.YYYY hh:mm A";
export const CASE_DATE_TIME_FORMAT = "MMM.DD.YYYY hh:mm A";
export const TRANSACTION_DATE_TIME_FORMAT = "MMM.DD.YYYY hh:mm A";

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const IS_LANGUAGE_CHANGED = "isLanguageChanged";

export const PAGE_TRACKING = {
  HOME: "BRI",
  MY_ACCOUNT: "My Account",
};

export const APP_PREFIX = "bri";

export const COLORS = {
  blue: {
    50: "#EFF3FF",
    100: "#D8E1FE",
    200: "#BFCEFE",
    300: "#9DB3FD",
    400: "#7897FF",
    500: "#6085FF",
    600: "#4F71E3",
    700: "#3958BF",
    800: "#2645AD",
  },
  red: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },
  orange: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FF9425",
    500: "#F97316",
    600: "#EA580C",
    700: "#C2410C",
  },
  white: "#fff",
  yellow: {
    50: "#FEFCE8",
    100: "#FEF8CE",
    200: "#FEF08A",
    300: "#FDE047",
    400: "#FEC400",
    500: "#FDB614",
    600: "#CA8A04",
    700: "#A16207",
  },
  gray: {
    50: "#FAFAFD",
    100: "#F2F3F4",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#1F2937",
    800: "#1F2937",
  },
  green: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#30CD9A",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
  },
  purple: {
    100: "#F3E8FF",
    300: "#D8B4FE",
    400: "#C084FC",
    600: "#9333EA",
  },
};

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const SEPARATE_ARR_CHARACTER = "|";

export const PICKER_MONTHS_TO_ADD = 3;
export const PICKER_WEEKS_TO_ADD = 13;
export const PICKER_QUARTERS_TO_ADD = 1;

export const DEFAULT_VALUES = {
  notApplicable: "N/A",
  noData: "-",
};

export const NUMBER_DECIMAL_DIGITS = 2;

export const getUserRolLabel = (role: USER_ROLES) => {
  if (role === USER_ROLES.ADMIN) {
    return "";
  }

  return USER_ROLE_OPTIONS[role]?.label;
};

export const DEFAULT_MODAL_WIDTH = 640;

export const PICKER_TYPES = {
  weekly: "weekly",
  monthly: "monthly",
  quarterly: "quarterly",
  yearly: "yearly",
};

export const PICKER_TYPES_LABEL = (t: any) => ({
  weekly: t("weekly"),
  monthly: t("monthly"),
  quarterly: t("quarterly"),
  yearly: t("yearly"),
});

export const AVATAR_FILE_LIMIT_SIZE = 2 * 1024 * 1024;

export const LIKELI_HOOD_ESTIMATIONS = () => [
  {
    label: i18next.t("Highly Unlikely (1)"),
    value: 1,
  },
  {
    label: i18next.t("Unlikely (2)"),
    value: 2,
  },
  {
    label: i18next.t("Possible (3)"),
    value: 3,
  },
  {
    label: i18next.t("Likely (4)"),
    value: 4,
  },
  {
    label: i18next.t("Highly Likely (5)"),
    value: 5,
  },
];

export const MINIMUM_ENABLE_SEARCH_CHARACTER = 3;

export const GRAPH_NODE_SIZES = {
  lg: 56,
  md: 48,
  base: 40,
  sm: 32,
  xs: 24,
};

export const GRAPH_NODE_ICON_SIZES = {
  lg: 28,
  md: 24,
  base: 20,
  sm: 16,
  xs: 12,
};

export enum VertexTypeEnum {
  Account = "Account",
  Alert = "Alert",
  Customer = "Customer",
  Transaction = "Transaction",
  CaseReport = "Case_Report",
}

export const ICONS_URL: () => any = () => ({
  [VertexTypeEnum.Account]: `${variables.apiUrl}/api/images/icons/account.svg`,
  [VertexTypeEnum.Alert]: `${variables.apiUrl}/api/images/icons/alert.svg`,
  [VertexTypeEnum.CaseReport]: `${variables.apiUrl}/api/images/icons/case-report.svg`,
  [VertexTypeEnum.Transaction]: `${variables.apiUrl}/api/images/icons/transaction.svg`,
  [VertexTypeEnum.Customer]: `${variables.apiUrl}/api/images/icons/customer.svg`,

  clean: `${variables.apiUrl}/api/images/icons/clean.svg`,
  fitCenter: `${variables.apiUrl}/api/images/icons/fitCenter.svg`,
  fitView: `${variables.apiUrl}/api/images/icons/fitView.svg`,
  zoomIn: `${variables.apiUrl}/api/images/icons/zoomIn.svg`,
  zoomOut: `${variables.apiUrl}/api/images/icons/zoomOut.svg`,

  loading: `${variables.apiUrl}/api/images/icons/loadingIcon.svg`,
});

export const BREAKDOWN_TYPE = () => [
  {
    label: i18next.t("Transaction Type"),
    value: "TRANSACTION_TYPE",
  },
  {
    label: i18next.t("CP Industry"),
    value: "CP_COUNTRY",
  },
  {
    label: i18next.t("Mode"),
    value: "MODE",
  },
];

export enum EdgeTypeEnum {
  AccountHasAlert = "ACC_HAS_ALERT",
  CustomerHasAlert = "CUST_HAS_ALERT",
  CustomerReceive = "CUST_RECEIVE",
  CustomerSend = "CUST_SEND",
  Receive = "RECEIVE",
  Send = "SEND",
  TransactionHasAlert = "TX_HAS_ALERT",
  AlertHasCase = "ALERT_HAS_CASE",
}

export const EDGE_VIEW_OPTIONS = () => [
  {
    label: i18next.t("Acc-Has-Alert"),
    key: EdgeTypeEnum.AccountHasAlert,
  },
  {
    label: i18next.t("Cust-Has-Alert"),
    key: EdgeTypeEnum.CustomerHasAlert,
  },
  {
    label: i18next.t("Cust-Receive"),
    key: EdgeTypeEnum.CustomerReceive,
  },
  {
    label: i18next.t("Cust-Send"),
    key: EdgeTypeEnum.CustomerSend,
  },
  {
    label: i18next.t("Receive"),
    key: EdgeTypeEnum.Receive,
  },
  {
    label: i18next.t("Send"),
    key: EdgeTypeEnum.Send,
  },
  {
    label: i18next.t("TX-Has-Alert"),
    key: EdgeTypeEnum.TransactionHasAlert,
  },
  {
    label: i18next.t("Alert-Has-Case"),
    key: EdgeTypeEnum.AlertHasCase,
  },
];

export const TRANSACTION_TREND_FLOW_TYPE = () => [
  {
    label: i18next.t("Inflow to PH"),
    value: "inflow",
  },
  {
    label: i18next.t("Outflow from PH"),
    value: "outflow",
  },
  {
    label: i18next.t("Domestic"),
    value: "domestic",
  },
  {
    label: i18next.t("All"),
    value: "all",
  },
];

export const TRANSACTION_FLOW_TYPE = () => [
  {
    label: i18next.t("Inflow to PH"),
    value: "inward",
  },
  {
    label: i18next.t("Outflow from PH"),
    value: "outward",
  },
  {
    label: i18next.t("Domestic"),
    value: "domestic",
  },
  {
    label: i18next.t("All"),
    value: "all",
  },
];

export const TRANSACTION_VALUES_TYPE = () => [
  {
    label: i18next.t("Transaction Count"),
    value: "TRANSACTION_COUNT",
  },
  {
    label: i18next.t("Total Amount"),
    value: "TOTAL_AMOUNT",
  },
];

export const DASHBOARD_TABS = () => [
  {
    value: "alerts",
    label: i18next.t("Alerts"),
  },
  {
    value: "transactions",
    label: i18next.t("CTRs"),
  },
];

export const DASHBOARD_VIEW_TYPES = {
  monthly: "monthly",
  quarterly: "quarterly",
  yearly: "yearly",
};

export const SOCKET_EVENT_TYPES = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  NEW_COMMENT: "new comment",
  JOIN: "join",
};

export const NODE_VIEW_OPTIONS = () => [
  {
    label: i18next.t("Account"),
    key: VertexTypeEnum.Account,
    color: COLORS.purple[400],
  },
  {
    label: i18next.t("Alert"),
    key: VertexTypeEnum.Alert,
    color: COLORS.yellow[400],
  },
  {
    label: i18next.t("Customer"),
    key: VertexTypeEnum.Customer,
    color: COLORS.blue[400],
  },
  {
    label: i18next.t("Transaction"),
    key: VertexTypeEnum.Transaction,
    color: COLORS.gray[400],
  },
  {
    label: i18next.t("Case Report"),
    key: VertexTypeEnum.CaseReport,
    color: COLORS.green[400],
  },
];

export enum AlertTransactionSummaryTimeRangeEnum {
  DAILY = "Daily",
  MONTHLY = "Monthly",
  QUARTERLY = "Quarterly",
  YEARLY = "Yearly",
}

export const MAX_BAR_THICKNESS_PER_VIEW_TYPE = {
  [AlertTransactionSummaryTimeRangeEnum.DAILY]: 16,
  [AlertTransactionSummaryTimeRangeEnum.MONTHLY]: 26,
  [AlertTransactionSummaryTimeRangeEnum.QUARTERLY]: 36,
  [AlertTransactionSummaryTimeRangeEnum.YEARLY]: 48,
};

export const ALERT_TRANSACTION_SUMMARY_TIME_RANGE_OPTIONS = [
  {
    label: i18next.t("Daily"),
    value: AlertTransactionSummaryTimeRangeEnum.DAILY,
  },
  {
    label: i18next.t("Monthly"),
    value: AlertTransactionSummaryTimeRangeEnum.MONTHLY,
  },
  {
    label: i18next.t("Quarterly"),
    value: AlertTransactionSummaryTimeRangeEnum.QUARTERLY,
  },
  {
    label: i18next.t("Yearly"),
    value: AlertTransactionSummaryTimeRangeEnum.YEARLY,
  },
];

export enum AlertTransactionSummaryBreakdownEnum {
  TOTAL_AMOUNT = "Total_Amount",
  TOTAL_FREQUENCY = "Total_Frequency",
}

export const ALERT_TRANSACTION_SUMMARY_BREAKDOWN_OPTIONS = [
  {
    label: i18next.t("Total Amount"),
    value: AlertTransactionSummaryBreakdownEnum.TOTAL_AMOUNT,
  },
  {
    label: i18next.t("Total Frequency"),
    value: AlertTransactionSummaryBreakdownEnum.TOTAL_FREQUENCY,
  },
];

export enum AlertTransactionSummaryCalculationTypeEnum {
  TRANSACTION_TYPE = "Transaction_Type",
  TRANSACTION_CHANNEL = "Transaction_Channel",
}

export const ALERT_TRANSACTION_SUMMARY_CALCULATION_TYPE_OPTIONS = [
  {
    label: i18next.t("Transaction Type"),
    value: AlertTransactionSummaryCalculationTypeEnum.TRANSACTION_TYPE,
  },
  {
    label: i18next.t("Transaction Channel"),
    value: AlertTransactionSummaryCalculationTypeEnum.TRANSACTION_CHANNEL,
  },
];

export const ALERTS_QUEUE_QUERY_PARAM_NAMES = {
  PAGE_NUMBER: "page_number",
  PAGE_SIZE: "page_size",
  KEYWORD: "keyword",
  BRANCHES: "branches",
} as const;

export const ALERT_DETAILS_QUERY_PARAM_NAMES = {
  OPEN_PAGE_NUMBER: "open_page_number",
  OPEN_PAGE_SIZE: "open_page_size",
  OPEN_ALERT_CATEGORIES: "open_alert_categories",
  OPEN_ALERT_PICKER_TYPE: "open_alert_picker_type",
  OPEN_ALERT_FROM: "open_alert_from",
  OPEN_ALERT_TO: "open_alert_to",

  CLOSED_PAGE_NUMBER: "closed_page_number",
  CLOSED_PAGE_SIZE: "closed_page_size",
  CLOSED_ALERT_CATEGORIES: "closed_alert_categories",

  SUMMARY_TIME_RANGE: "summary_time_range",
  SUMMARY_BREAKDOWN: "summary_breakdown",
  SUMMARY_CALCULATION_TYPE: "summary_calculation_type",
};

export const BRI_USE_QUERY_REQUEST_KEY_NAMES = {
  CASE: {
    GET_CASES_QUEUE: "case_getCasesQueue",
    GET_CASE_DETAILS: "case_getCaseDetails",
    GET_CASE_DETAILS_MAIN_SUBJECT: "case_getCaseDetailsMainSubject",
    GET_CASE_DETAILS_INCIDENTAL_SUBJECTS:
      "case_getCaseDetailsIncidentalSubjects",
    GET_CASE_DETAILS_REMOVED_SUBJECTS: "case_getCaseDetailsRemovedSubjects",
    GET_CASE_DETAILS_RELATED_ALERTS: "case_getCaseDetailsRelatedAlerts",
    GET_CASE_DETAILS_UNASSIGNED_ALERTS: "case_getCaseDetailsUnassignedAlerts",
    GET_ASSIGNABLE_CASES: "case_getAssignedCases",
    GET_IDENTITIES_BY_CIF: "case_getIdentitiesByCIF",
    GET_NETWORK_CONNECTION: "alert_getNetworkConnection",
  },
  ALERT: {
    GET_ALERTS_QUEUE: "alert_getAlertsQueue",

    GET_ALERT_DETAILS: "alert_getAlertDetails",
    GET_SUMMARY_OF_TRANSACTIONS: "alert_getSummaryOfTransactions",
    GET_OPEN_ALERTS: "alert_getOpenAlerts",
    GET_CLOSED_ALERTS: "alert_getClosedAlerts",
    GET_NETWORK_CONNECTION: "alert_getNetworkConnection",
  },
  USER: {
    GET_USER_LIST: "user_getUserList",
    GET_USERS_BY_ROLE: "user_getUsersByRole",
  },
  GENERAL: {
    GET_BRANCHES: "general_getBranches",
    GET_CASE_CATEGORIES: "general_getCaseCategories",
    GET_ALERT_CATEGORIES: "general_getAlertCategories",
  },
  DASHBOARD: {
    GET_ALERT_DASHBOARD_SUMMARY: "dashboard_getAlertDashboardSummary",
    GET_ALERT_DASHBOARD_ALERT_REASONS:
      "dashboard_getAlertDashboardAlertReasons",
    GET_ALERT_DASHBOARD_ALERT_TREND: "dashboard_getAlertDashboardAlertTrend",

    GET_CASE_DASHBOARD_SUMMARY: "dashboard_getCaseDashboardSummary",
    GET_CASE_DASHBOARD_CASE_CATEGORIES:
      "dashboard_getCaseDashboardCaseCategories",
    GET_ALERT_DASHBOARD_CASE_TREND: "dashboard_getAlertDashboardCaseTrend",
  },
  GRAPH: {
    SEARCH_OBJECTS: "graph_searchObjects",
    GET_OBJECT_DETAILS: "graph_getObjectDetails",
  },
};

export const CASES_QUEUE_QUERY_PARAM_NAMES = {
  PAGE_NUMBER: "page_number",
  PAGE_SIZE: "page_size",
  KEYWORD: "keyword",
  PRIORITIES: "priorities",
  CATEGORIES: "categories",
  APPROVAL_STATUSES: "approvalStatuses",
  STATUS: "status",
} as const;

export const CASES_DETAILS_QUERY_PARAM_NAMES = {
  INCIDENTAL_SUBJECTS_BRANCHES: "branches",
  REMOVED_SUBJECTS_BRANCHES: "branches",
  RELATED_ALERTS_CATEGORIES: "categories",
} as const;

export enum CASE_STATUS_FOR_TAB_ENUM {
  OPEN = "Open",
  CLOSED = "Closed",
}

export const CASE_STATUS_FOR_TAB_OPTIONS = [
  {
    label: i18next.t("Open Cases"),
    value: CASE_STATUS_FOR_TAB_ENUM.OPEN,
  },
  {
    label: i18next.t("Closed Cases"),
    value: CASE_STATUS_FOR_TAB_ENUM.CLOSED,
  },
];

export enum CASE_APPROVAL_STATUS_ENUM {
  OPEN = "Open",
  ON_CHECKER = "On_Checker",
  ON_SIGNER = "On_Signer",
  CLOSED = "Closed",
}

export const CASE_APPROVAL_STATUS_OPTIONS = [
  {
    label: i18next.t("Open"),
    value: CASE_APPROVAL_STATUS_ENUM.OPEN,
  },
  {
    label: i18next.t("Waiting for Checker"),
    value: CASE_APPROVAL_STATUS_ENUM.ON_CHECKER,
  },
  {
    label: i18next.t("Waiting for Signer"),
    value: CASE_APPROVAL_STATUS_ENUM.ON_SIGNER,
  },
  {
    label: i18next.t("Closed"),
    value: CASE_APPROVAL_STATUS_ENUM.CLOSED,
  },
];

export enum DECISION_ENUM {
  STR = "STR",
  NON_STR = "Non-STR",
}

export const DECISION_OPTIONS = [
  {
    label: i18next.t("STR"),
    value: DECISION_ENUM.STR,
  },
  {
    label: i18next.t("Non-STR"),
    value: DECISION_ENUM.NON_STR,
  },
];

export const DASHBOARD_TAB_VALUES = {
  ALERTS: "alerts",
  CASES: "cases",
};

export const DASHBOARD_TAB_OPTIONS = (t: any) => [
  {
    label: t("Cases"),
    value: DASHBOARD_TAB_VALUES.CASES,
  },
  {
    label: t("Alerts"),
    value: DASHBOARD_TAB_VALUES.ALERTS,
  },
];

export enum DashboardAlertTrendTimeRangeEnum {
  DAILY = "Daily",
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  QUARTERLY = "Quarterly",
  YEARLY = "Yearly",
}

export const DASHBOARD_ALERT_TREND_TIME_RANGE_OPTIONS = [
  { label: i18next.t("Daily"), value: DashboardAlertTrendTimeRangeEnum.DAILY },
  {
    label: i18next.t("Weekly"),
    value: DashboardAlertTrendTimeRangeEnum.WEEKLY,
  },
  {
    label: i18next.t("Monthly"),
    value: DashboardAlertTrendTimeRangeEnum.MONTHLY,
  },
];

export enum DashboardAlertTrendBreakdownEnum {
  TOTAL_AMOUNT = "Total_Amount",
  TOTAL_CIF = "Total_CIF",
  TOTAL_ALERTS = "Total_Alerts",
}

export const DASHBOARD_ALERT_TREND_BREAKDOWN_OPTIONS = [
  {
    label: i18next.t("Total Amount"),
    value: DashboardAlertTrendBreakdownEnum.TOTAL_AMOUNT,
  },
  {
    label: i18next.t("Total CIF"),
    value: DashboardAlertTrendBreakdownEnum.TOTAL_CIF,
  },
  {
    label: i18next.t("Total Alerts"),
    value: DashboardAlertTrendBreakdownEnum.TOTAL_ALERTS,
  },
];

export enum DashboardAlertTrendCalculationTypeEnum {
  ALERT_STATUS = "Alert_Status",
  ALERT_REASON = "Alert_Reason",
}

export const DASHBOARD_ALERT_TREND_CALCULATION_TYPE_OPTIONS = [
  {
    label: i18next.t("Alert Status"),
    value: DashboardAlertTrendCalculationTypeEnum.ALERT_STATUS,
  },
  {
    label: i18next.t("Alert Reason"),
    value: DashboardAlertTrendCalculationTypeEnum.ALERT_REASON,
  },
];

export enum DashboardCaseTrendTimeRangeEnum {
  DAILY = "Daily",
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  QUARTERLY = "Quarterly",
  YEARLY = "Yearly",
}

export const DASHBOARD_CASE_TREND_TIME_RANGE_OPTIONS = [
  { label: i18next.t("Daily"), value: DashboardCaseTrendTimeRangeEnum.DAILY },
  {
    label: i18next.t("Weekly"),
    value: DashboardCaseTrendTimeRangeEnum.WEEKLY,
  },
  {
    label: i18next.t("Monthly"),
    value: DashboardCaseTrendTimeRangeEnum.MONTHLY,
  },
];

export enum DashboardCaseTrendBreakdownEnum {
  TOTAL_AMOUNT = "Total_Amount",
  TOTAL_CIF = "Total_CIF",
  TOTAL_CASES = "Total_Cases",
}

export const DASHBOARD_CASE_TREND_BREAKDOWN_OPTIONS = [
  {
    label: i18next.t("Total Amount"),
    value: DashboardCaseTrendBreakdownEnum.TOTAL_AMOUNT,
  },
  {
    label: i18next.t("Total CIF"),
    value: DashboardCaseTrendBreakdownEnum.TOTAL_CIF,
  },
  {
    label: i18next.t("Total Cases"),
    value: DashboardCaseTrendBreakdownEnum.TOTAL_CASES,
  },
];

export enum DashboardCaseTrendCalculationTypeEnum {
  CASE_STATUS = "Case_Status",
  CASE_PRIORITY = "Case_Priority",
  CASE_CATEGORY = "Case_Category",
}

export const DASHBOARD_CASE_TREND_CALCULATION_TYPE_OPTIONS = [
  {
    label: i18next.t("Case Status"),
    value: DashboardCaseTrendCalculationTypeEnum.CASE_STATUS,
  },
  {
    label: i18next.t("Case Priority"),
    value: DashboardCaseTrendCalculationTypeEnum.CASE_PRIORITY,
  },
  {
    label: i18next.t("Case Category"),
    value: DashboardCaseTrendCalculationTypeEnum.CASE_CATEGORY,
  },
];

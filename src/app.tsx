import AlertDetails from "pages/AlertDetails";
import Alerts from "pages/Alerts";
import AlertsArchived from "pages/AlertsArchived";
import AlertsDashboard from "pages/Dashboard/AlertsDashboard";
import AlertsQueue from "pages/AlertsQueue";
import CaseDetails from "pages/CaseDetails";
import CasesDashboard from "pages/Dashboard/CasesDashboard";
import CasesQueue from "pages/CasesQueue";
import en from "./translations/moment/en";
import Graph from "pages/Graph";
import i18next from "i18next";
import Layout from "components/Layout";
import Login from "pages/Login";
import ManageUsers from "pages/ManageUsers";
import Modal from "components/Modal";
import moment from "moment";
import NotFound from "pages/NotFound";
import PrivateRoute from "components/PrivateRoute";
import Profile from "pages/Profile";
import PublicRoute from "components/PublicRoute";
import vi from "./translations/moment/vi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getCurrentProfile } from "apis/user";
import { getEnvironmentConfig } from "scripts/variables";
import { getRedux } from "scripts/helpers";
import { hideNotification } from "store/reducers/app";
import { LEFT_MENU_KEY, USER_ROLES } from "scripts/constants";
import { memo, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { updateUserProfile } from "store/reducers/auth";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import "react-toastify/dist/ReactToastify.css";


const languageObj: any = {
  en,
  vi,
};

const ALL_USER_ROLES = [USER_ROLES.ADMIN, USER_ROLES.MAKER, USER_ROLES.CHECKER, USER_ROLES.SIGNER];

const App = () => {
  const dispatch = useDispatch();

  const { notification, currentLanguage: language = "en" }: any = getRedux(`app`, {});
  const userId = getRedux(`auth.currentUser.id`, "");
  const userAccessToken = getRedux(`auth.currentAuth.access_token`, null);

  const [momentLanguage, _setMomentLanguage]: any = useState(``);
  const [globalLoading, _setGlobalLoading]: any = useState(true);

  useEffect(() => {
    (async () => {
      await getEnvironmentConfig();
      _setGlobalLoading(false);
    })();
  }, []);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    moment.locale(momentLanguage, languageObj[momentLanguage]);
  }, [momentLanguage]);

  useQuery(["getCurrentProfile"], getCurrentProfile, {
    onSuccess: ({ data }) => dispatch(updateUserProfile(data)),
    enabled: !!userAccessToken && !!userId && !globalLoading,
  });

  return globalLoading ? (
    <div />
  ) : (
    <div className="bri">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute component={Login} />} />
          <Route path="/login" element={<PublicRoute component={Login} />} />
          <Route element={<Layout />}>
            {/* Start Alerts Page */}
            <Route path={`/${LEFT_MENU_KEY.DASHBOARD}`}>
              <Route path="alerts" element={<PrivateRoute component={AlertsDashboard} role={ALL_USER_ROLES} />} />
              <Route path="cases" element={<PrivateRoute component={CasesDashboard} role={ALL_USER_ROLES} />} />
            </Route>
            {/* End Alerts Page */}

            {/* Start Graphs Page */}
            <Route
              path={`/${LEFT_MENU_KEY.GRAPHS}`}
              element={<PrivateRoute component={Graph} role={ALL_USER_ROLES} />}
            />
            {/* Start Graphs Page */}

            {/* Start Alerts Page */}
            <Route path={`/${LEFT_MENU_KEY.ALERTS}`}>
              <Route
                path={`/${LEFT_MENU_KEY.ALERTS}`}
                element={<PrivateRoute component={Alerts} role={ALL_USER_ROLES} />}
              />
              <Route path=":alertCIFNumber" element={<PrivateRoute component={AlertDetails} role={ALL_USER_ROLES} />} />
            </Route>
            <Route
              path={`/${LEFT_MENU_KEY.ALERTS}/queue`}
              element={<PrivateRoute component={AlertsQueue} role={ALL_USER_ROLES} />}
            />
            <Route
              path={`/${LEFT_MENU_KEY.ALERTS}/archived`}
              element={<PrivateRoute component={AlertsArchived} role={ALL_USER_ROLES} />}
            />
            {/* End Alerts Page */}

            {/* Start Case Page */}
            <Route path={`/${LEFT_MENU_KEY.CASES}`}>
              <Route
                path={`/${LEFT_MENU_KEY.CASES}`}
                element={<PrivateRoute component={CasesQueue} role={ALL_USER_ROLES} />}
              />
              <Route path=":caseId" element={<PrivateRoute component={CaseDetails} role={ALL_USER_ROLES} />} />
            </Route>
            {/* End Case Page */}

            {/* Start Users Page */}
            <Route
              path={`/${LEFT_MENU_KEY.USERS}`}
              element={<PrivateRoute component={ManageUsers} role={ALL_USER_ROLES} />}
            />
            <Route path="/my-account" element={<PrivateRoute component={Profile} role={ALL_USER_ROLES} />} />
            {/* Start End Page */}

            {/* Common Pages */}
            <Route path="/page-not-found" element={<PrivateRoute component={NotFound} role={ALL_USER_ROLES} />} />
            <Route path="/*" element={<PrivateRoute component={NotFound} role={ALL_USER_ROLES} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {notification?.message && (
        <Modal visible={true} title={notification?.title} onOk={() => dispatch(hideNotification())}>
          {notification?.message}
        </Modal>
      )}
      <ToastContainer
        style={{ width: "300px" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </div>
  );
};

export default memo(App);

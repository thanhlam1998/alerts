import { Avatar, Button, Divider, Layout, Menu } from "antd";
import BriFav from "components/svgs/BriFav";
import BriLogo from "components/svgs/BriLogo";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LEFT_MENU_ITEMS, LEFT_MENU_KEY, USER_ROLES } from "scripts/constants";
import { getRedux, getShortUserName } from "scripts/helpers";
import "./Layout.scss";
import Chevron from "components/svgs/Chevron";

const MenuCpn = ({ toggleSidebar, leftMenuActive, setLeftMenuActive, collapse }: any) => {
  const { t } = useTranslation();
  const state: any = {};
  const currentUser = getRedux(`auth.currentUser`, {});
  const currentUserRole = getRedux(`auth.currentAuth.userRole`, "ORG_ADMIN");
  const organizationName = currentUser?.organizationName || currentUser?.organization || "";

  const dashboardLink = `/${LEFT_MENU_KEY.DASHBOARD}/cases`;

  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname?.charAt(0) !== "/") {
      pathname = "/" + pathname;
    }
    const pageName = pathname?.split("/")?.[1] ?? ``;

    const pageActive = LEFT_MENU_ITEMS(t).find((it: any) => it?.key?.toLowerCase() === pageName?.toLowerCase());

    setLeftMenuActive(pageActive?.key);
  }, [pathname]);

  return (
    <>
      <div
        key="homepage"
        className="logo"
        style={{
          marginBottom: "8px",
          height: "80px",
        }}>
        {(state?.logo || organizationName) && (
          <Link to={dashboardLink} className="logo-wrapper">
            {state?.logo ? (
              <img src={state?.logo} alt={organizationName?.toUpperCase() ?? ``} />
            ) : (
              <div className="organization-name">
                <p>{organizationName?.toUpperCase()}</p>
              </div>
            )}
          </Link>
        )}
        <Link to={dashboardLink}>{collapse ? <BriFav /> : <BriLogo />}</Link>
      </div>
      <div className="content">
        <Menu mode="inline" selectedKeys={[leftMenuActive]}>
          {LEFT_MENU_ITEMS(t).map((menuItem) => {
            return menuItem.subs.length > 0 ? (
              <Menu.SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.title}>
                {menuItem.subs.map((item: any) => (
                  <Menu.Item
                    key={item?.key}
                    style={{ paddingLeft: "16px" }}
                    onClick={() => {
                      // dispatch(
                      //   setActiveLeftMenu({
                      //     openKeys: [menuItem?.key],
                      //     selectedKeys: [menuItem?.key, item?.key],
                      //   })
                      // );
                    }}>
                    <Link
                      to={{
                        pathname: `${item?.link}`,
                      }}>
                      {item?.title}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={menuItem?.key}
                icon={menuItem.icon}
                style={{ paddingLeft: "12px" }}
                onClick={() => setLeftMenuActive(menuItem?.key)}>
                <Link to={{ pathname: `${menuItem?.link}` }}>{menuItem?.title}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      {/* <LanguageDropdown /> */}
      <div>
        <div role="button" title="Toggle sidebar" onClick={toggleSidebar} className="sidebar-toggle">
          <span className="title">{t("Collapse")}</span>
          <Button icon={<Chevron side={"right"} />} />
        </div>
        <Divider style={{ margin: "8px 0px" }} />
        <Menu className="bottom-left-menu" mode="inline" selectedKeys={[`/${window.location?.pathname.split("/")[1]}`]}>
          <Menu.Item
            className="footer m-auto"
            key="/my-account"
            icon={
              <Avatar
                size={24}
                style={{
                  backgroundColor: "#6085FF",
                  color: "#ffffff",
                  fontSize: "9px",
                  position: "absolute",
                  top: "4px",
                  left: "8px",
                }}
                src={currentUser?.profilePictureUrl}>
                {getShortUserName(currentUser?.firstName, currentUser?.lastName?.charAt(0))}
              </Avatar>
            }>
            <Link to="/my-account">{t("My Account")}</Link>
          </Menu.Item>
          {/* {!isProduction && (
            <Menu.Item className="footer" key="support" icon={<Support />}>
              Support
            </Menu.Item>
          )} */}
        </Menu>
      </div>
    </>
  );
};

const Sidebar = ({ currentActiveLeftMenu = {} }: any) => {
  const [collapse, setCollapse] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const [leftMenuActive, setLeftMenuActive] = useState({});

  const toggleSidebar = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <>
      <Layout.Sider
        width={212}
        collapsible={false}
        collapsed={collapse}
        collapsedWidth={64}
        style={{
          overflow: "auto",
          height: "100vh",
        }}>
        <MenuCpn
          toggleSidebar={toggleSidebar}
          activeLeftMenu={currentActiveLeftMenu}
          collapse={collapse}
          {...{ leftMenuActive, setLeftMenuActive }}
        />
      </Layout.Sider>
    </>
  );
};

export default memo(Sidebar);

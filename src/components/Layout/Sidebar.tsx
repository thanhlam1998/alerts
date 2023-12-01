import BriFav from "components/svgs/BriFav";
import BriLogo from "components/svgs/BriLogo";
import Chevron from "components/svgs/Chevron";
import { Avatar, Button, Divider, Layout, Menu } from "antd";
import { getActiveLeftMenuFromUrl, getRedux, getShortUserName } from "scripts/helpers";
import { LEFT_MENU_ITEMS, LEFT_MENU_KEY } from "scripts/constants";
import { Link } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { setActiveLeftMenu } from "store/reducers/app";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SlGraph } from "react-icons/sl";
import "./Layout.scss";

const MenuCpn = ({ toggleSidebar, activeLeftMenu, collapse }: any) => {
  const { t } = useTranslation();
  const state: any = {};
  const currentUser = getRedux(`auth.currentUser`, {});
  const organizationName = currentUser?.organizationName || currentUser?.organization || "";
  const dispatch = useDispatch();

  const [active, setActive] = useState({} as any);
  const dashboardLink = `/${LEFT_MENU_KEY.DASHBOARD}/cases`;

  useEffect(() => {
    if (!collapse) {
      setActive(activeLeftMenu);
    } else {
      setActive({ ...activeLeftMenu, openKeys: [] });
    }
  }, [activeLeftMenu]);

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
        <Link to={dashboardLink}>{collapse ? <SlGraph className="w-6 h-6" /> : <SlGraph className="w-6 h-6" />}</Link>
      </div>
      <div className="content">
        <Menu
          mode="inline"
          selectedKeys={active?.selectedKeys}
          openKeys={active?.openKeys}
          onOpenChange={(openKeys: any) => setActive({ ...active, openKeys })}>
          {LEFT_MENU_ITEMS(t).map((menuItem) => {
            return menuItem.subs.length > 0 ? (
              <Menu.SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.title}>
                {menuItem.subs.map((item: any) => (
                  <Menu.Item
                    key={item?.key}
                    style={{ paddingLeft: "16px" }}
                    onClick={() => {
                      dispatch(
                        setActiveLeftMenu({
                          openKeys: [menuItem?.key],
                          selectedKeys: [menuItem?.key, item?.key],
                        })
                      );
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
                onClick={(menuItem: any) => {
                  dispatch(
                    setActiveLeftMenu({
                      openKeys: [],
                      selectedKeys: [menuItem?.key],
                    })
                  );
                }}>
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
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setCollapse((prev) => !prev);
  };

  useEffect(() => {
    dispatch(setActiveLeftMenu(getActiveLeftMenuFromUrl(location?.pathname)));
  }, [location?.pathname]);

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
        <MenuCpn toggleSidebar={toggleSidebar} activeLeftMenu={currentActiveLeftMenu} collapse={collapse} />
      </Layout.Sider>
    </>
  );
};

export default memo(Sidebar);

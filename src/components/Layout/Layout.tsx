import { Layout as LayoutWrapper } from "antd";
import { memo, useRef } from "react";
import { Outlet } from "react-router-dom";
import { getRedux } from "scripts/helpers";
import "./Layout.scss";
import Sidebar from "./Sidebar";

const Layout = ({ className = "" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentActiveLeftMenu }: any = getRedux(`app`, {});

  return (
    <LayoutWrapper className={`console-layout ${className}`}>
      <Sidebar {...{ currentActiveLeftMenu }} />
      <LayoutWrapper className="site-layout">
        <div
          ref={ref}
          id="page-content"
          className="site-layout-background admin-wrapper"
          style={{
            margin: 0,
            padding: "16px",
            overflow: "auto",
            height: "100%",
            minWidth: 921,
          }}
        >
          <Outlet />
        </div>
      </LayoutWrapper>
    </LayoutWrapper>
  );
};

export default memo(Layout);

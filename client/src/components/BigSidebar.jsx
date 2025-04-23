import React from "react";
import BigSidebarWrapper from "../assets/wrappers/BigSidebar";
import { useDashboardCtxt } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

function BigSidebar() {
  const { showSidebar } = useDashboardCtxt();
  return (
    <BigSidebarWrapper>
      <div
        className={
          showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`
        }>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </BigSidebarWrapper>
  );
}

export default BigSidebar;

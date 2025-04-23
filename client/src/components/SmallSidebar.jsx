import React from "react";

import SmallSidebarWrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardCtxt } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
//import links from "../utils/links.jsx";
import Logo from "./Logo";
import NavLinks from "./NavLinks.jsx";

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useDashboardCtxt();

  return (
    <SmallSidebarWrapper>
      <div
        className={
          showSidebar ? `sidebar-container show-sidebar` : `sidebar-container `
        }>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </SmallSidebarWrapper>
  );
}

export default SmallSidebar;

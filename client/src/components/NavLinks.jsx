import React from "react";
import links from "../utils/links";
import { useDashboardCtxt } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";

function NavLinks({ isBigSidebar }) {
  const { toggleSidebar, currentUser } = useDashboardCtxt();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = currentUser;
        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;

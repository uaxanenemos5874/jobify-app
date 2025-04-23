import React from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import ThemeToggleWrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardCtxt } from "../pages/DashboardLayout";

function ThemeToggle() {
  const { isDarkTheme, toggleDarkTheme } = useDashboardCtxt();
  return (
    <ThemeToggleWrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" title="Toggle theme?"/>
      ) : (
        <BsFillMoonFill title="Toggle theme?"/>
      )}
    </ThemeToggleWrapper>
  );
}

export default ThemeToggle;

import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import LogOutContainerWrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardCtxt } from "../pages/DashboardLayout";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser, logoutUser } = useDashboardCtxt();
  console.log(currentUser);
  return (
    <LogOutContainerWrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}>
        {currentUser?.avatar ? (
          <img src={currentUser?.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}

        {currentUser?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </LogOutContainerWrapper>
  );
};
export default LogoutContainer;

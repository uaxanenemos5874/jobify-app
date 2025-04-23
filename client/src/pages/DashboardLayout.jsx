import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import DashboardWrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    console.log(data);
    return data;
  } catch (err) {
    console.log("🔴ERROR:", err);
    toast.error(err?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardCtxt = createContext(); // setting up the context

//component fx.
function DashboardLayout() {
  const { currentUser } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  function toggleDarkTheme() {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser() {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging Out!");
  }

  //console.log(user);

  return (
    <DashboardCtxt.Provider
      value={{
        currentUser,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}>
      <DashboardWrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? (
                <Loading />
              ) : (
                <Outlet context={{ currentUser }} />
              )}
            </div>
          </div>
        </main>
      </DashboardWrapper>
    </DashboardCtxt.Provider>
  );
}
export function useDashboardCtxt() {
  return useContext(DashboardCtxt);
}
export default DashboardLayout;

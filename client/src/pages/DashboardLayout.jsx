import React, { createContext, useContext, useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["currentUser"],
  queryFn: async () => {
    const { data } = await customFetch("/users/current-user");
    console.log("🟢 USER-DATA: ", data);
    return data;
  },
};

export const dashboardLoader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (err) {
    console.log("🔴ERROR:", err);
    toast.error(err?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardCtxt = createContext(); // setting up the context

//component fx.
function DashboardLayout({ queryClient }) {
  const { currentUser } = useQuery(userQuery)?.data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  //Axios Interceptors states
  const [isAuthError, setIsAuthError] = useState(false);

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
    queryClient.invalidateQueries();
    toast.success("Logging Out!");
  }

  //console.log(user);

  //Axios Interceptors
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

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

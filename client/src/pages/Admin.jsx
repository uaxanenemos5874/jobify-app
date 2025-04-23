import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export async function adminLoader() {
  try {
    const resp = await customFetch.get("/users/admin/app-stats");
    return resp.data;
  } catch (error) {
    console.log("🔴ERROR MSG: ", error.message);
    toast.error("You are NOT AUTHORIZED to view this page ❌⚠️");
    return redirect(`/dashboard`);
  }
}

function Admin() {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
}

export default Admin;

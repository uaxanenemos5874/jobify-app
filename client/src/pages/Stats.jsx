import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export async function statsLoader() {
  try {
    const resp = await customFetch.get("/jobs/stats");
    return resp.data;
  } catch (error) {
    console.log(`🔴ERROR:`, error.message);
    return error;
  }
  //return null;
}

function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
}

export default Stats;

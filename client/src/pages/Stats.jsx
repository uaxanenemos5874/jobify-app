import { useQuery } from "@tanstack/react-query";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export async function statsLoader() {
  return null;
  //unreachable code below.
  const resp = await customFetch.get("/jobs/stats");
  return resp.data;
}

function Stats() {
  //const { defaultStats, monthlyApplications } = useLoaderData();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => customFetch.get("/jobs/stats"),
  });

  if (isLoading) return <h4>Loading... ⏳</h4>;
  if (isError) return <h4>Error.. 🔴</h4>;
  const { defaultStats, monthlyApplications } = data.data;

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

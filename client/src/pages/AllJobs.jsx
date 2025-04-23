import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const allJobsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    console.log(data);
    return { data, searchValues: { ...params } };
  } catch (error) {
    console.log("🔴ERROR:", error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsCtxt = createContext();
function AllJobs() {
  const { data, searchValues } = useLoaderData();
  console.log(data);
  return (
    <AllJobsCtxt.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsCtxt.Provider>
  );
}

export const useAllJobsCtxt = () => {
  return useContext(AllJobsCtxt);
};

export default AllJobs;

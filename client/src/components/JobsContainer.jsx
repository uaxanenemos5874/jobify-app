import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsCtxt } from "../pages/AllJobs";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

function JobsContainer() {
  const { data } = useAllJobsCtxt();
  const { jobs, totalJobs, numOfPages } = data;
  //console.log(totalJobs, numOfPages);
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} {jobs.length > 1 ? "jobs" : "job"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}

export default JobsContainer;

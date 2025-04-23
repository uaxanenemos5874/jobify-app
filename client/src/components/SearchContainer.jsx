import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, Link, useSubmit } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsCtxt } from "../pages/AllJobs";

function SearchContainer() {
  const { searchValues } = useAllJobsCtxt();
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeOut;
    return (evt) => {
      const form = evt.currentTarget.form;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        console.log("Debounce effect.. ⏱️✅");
        onChange(form);
      }, 1500);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelTxt="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(evt) => {
              submit(evt.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelTxt="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(evt) => {
              submit(evt.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            list={["all", ...Object.values(JOB_SORT_BY)]}
            defaultValue={sort}
            onChange={(evt) => {
              submit(evt.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* TEMP ⚠️ */}
          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer;

import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (id) => {
  return {
    queryKey: ["singleJob", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const editPageLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect(`/dashboard/all-jobs`);
    }
  };

export const editPageAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const jobData = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, jobData);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job Edited Successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

function EditJob() {
  const id = useLoaderData();
  const {
    data: { singleJob },
  } = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue={singleJob.position}
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={singleJob.company}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelTxt="Job Location"
            defaultValue={singleJob.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelTxt="Job Status"
            defaultValue={singleJob.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelTxt="Job Type"
            defaultValue={singleJob.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditJob;

import { Link, Form, redirect, useNavigate } from "react-router-dom";
import LoginWrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loginAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success(`Logged In!`);
      return redirect("/dashboard");
    } catch (err) {
      console.log("🔴ERROR:", err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.msg ||
        err?.message ||
        "Login failed. Try again!";
      toast.error(`🔴 ${message}`);
      return null;
    }
  };


function Login() {
  const navigate = useNavigate();
  async function loginDemoUser() {
    const data = {
      email: "clark@test.com",
      password: "clark12345",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success(`Take a test-drive round the App.!`);
      navigate("/dashboard");
    } catch (err) {
      console.log("🔴ERROR:", err);
      toast.error(`${err?.response?.statusText}, ${err?.message}`);
      return err;
    }
  }
  return (
    <LoginWrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login🔐</h4>
        <FormRow
          type="email"
          name="email"
          placeholderTxt="Enter your email"
          labelTxt="Email"
        />
        <FormRow
          type="password"
          name="password"
          placeholderTxt="Enter your password"
          labelTxt="Password"
        />
        <SubmitBtn formBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </LoginWrapper>
  );
}

export default Login;

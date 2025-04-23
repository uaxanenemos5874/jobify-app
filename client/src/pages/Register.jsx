import React from "react";
import { Form, redirect, Link } from "react-router-dom";
import RegisterWrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful ✌🏻");
    return redirect("/login");
  } catch (err) {
    console.log("🔴ERROR:", err);
    toast.error(err?.response?.data?.msg);
    return err;
  }
}

function Register() {
  return (
    <RegisterWrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelTxt="First Name"
          placeholderTxt="Enter your first name"
        />
        <FormRow
          type="text"
          name="lastName"
          labelTxt="Last Name"
          placeholderTxt="Enter your last name"
        />
        <FormRow
          type="text"
          name="location"
          labelTxt="Location"
          placeholderTxt="Enter your location"
        />
        <FormRow
          type="email"
          name="email"
          labelTxt="Email"
          placeholderTxt="Enter your email"
        />
        <FormRow
          type="password"
          name="password"
          labelTxt="Password"
          placeholderTxt="Enter your password"
        />
        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </RegisterWrapper>
  );
}

export default Register;

import React from "react";
import { Link, useRouteError } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.svg";
import ErrorWrapper from "../assets/wrappers/ErrorPage";

function Error() {
  const errorInfo = useRouteError();
  if (errorInfo.status === 404) {
    return (
      <ErrorWrapper>
        <div>
          <img src={notFoundImg} alt="not-found-img" />
          <h3>Oops! Page not found.</h3>
          <p>We can't seem to find the page that you're looking for🌵</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </ErrorWrapper>
    );
  }

  return (
    <div>
      <h3>Something Went Wrong 💔😕</h3>
    </div>
  );
}

export default Error;

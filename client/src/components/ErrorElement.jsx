import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorElement() {
  const error = useRouteError();
  console.log(error);
  return <h4>There was an ERROR! 🔴</h4>;
}

export default ErrorElement;

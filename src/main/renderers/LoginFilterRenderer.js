import React from "react";
import { withRouter } from "react-router-dom";

const LoginFilterRenderer=(props)=> {
  const renderHeaderIfNotInLoginPage = () =>
    props.location.pathname.startsWith("/login") ? null : props.children;

  return <>{renderHeaderIfNotInLoginPage()}</>;
}

export default withRouter(LoginFilterRenderer);

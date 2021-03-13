import React from "react";
import { withRouter } from "react-router-dom";
import { Header } from "../layout";

const HeaderRenderer=(props)=> {
  const renderHeaderIfNotInLoginPage = () =>
    props.location.pathname.startsWith("/login") ? null : <Header />;

  return <>{renderHeaderIfNotInLoginPage()}</>;
}

export default withRouter(HeaderRenderer);

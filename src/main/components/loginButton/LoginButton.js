import Button from "@material-ui/core/Button";
import React from "react";
import { withRouter } from "react-router-dom";

const LoginButton = (props) => {
  const handleClick = (history) => history.push("/login");
  return (
    <Button
      color="inherit"
      data-testid="header-login-button"
      role="button"
      onClick={() => handleClick(props.history)}
    >
      Zaloguj się
    </Button>
  );
};

export default withRouter(LoginButton);

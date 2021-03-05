import React from "react";
import { Provider } from "react-redux";
import appStore from "./store";
import { Footer, Header, Navigation, Page } from "./layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="app-container">
      <Provider store={appStore}>
        <CssBaseline />
        <Header/>
        <Router basename={process.env.PUBLIC_URL}>
          <Navigation/>
          <Page />
        </Router>
        <Footer />
      </Provider>
    </div>
  );
}

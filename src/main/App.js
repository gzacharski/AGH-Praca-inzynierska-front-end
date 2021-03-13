import React from "react";
import { Provider } from "react-redux";
import appStore from "./store";
import { Footer, Navigation, Page } from "./layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { useStyles } from "./App.styles";
import HeaderRenderer from "./renderers/HeaderRenderer";

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="app-container">
      <Provider store={appStore}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <HeaderRenderer />
          <Navigation />
          <Page />
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

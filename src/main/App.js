import React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import appStore from "./store";
import { Footer, Header, Navigation, Page } from "./layout";
import { useStyles } from "./App.styles";
import LoginFilterRenderer from "./renderers/LoginFilterRenderer";

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="app-container">
      <Provider store={appStore}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <LoginFilterRenderer>
            <Header />
          </LoginFilterRenderer>
          <Navigation />
          <Page />
          <LoginFilterRenderer>
            <Footer />
          </LoginFilterRenderer>
        </Router>
      </Provider>
    </div>
  );
}

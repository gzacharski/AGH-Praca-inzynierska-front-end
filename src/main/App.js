import React, { Fragment } from "react";
import { Footer, Header, Navigation, Page } from "./layout";
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App() {
  return (
    <Fragment>
      <CssBaseline/>
      <Header />
      <Navigation />
      <Page />
      <Footer />
    </Fragment>
  );
}

import React, { Fragment } from "react";
import { Footer, Header, Navigation, Page } from "./layout";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Navigation />
      <Page />
      <Footer />
    </Fragment>
  );
}

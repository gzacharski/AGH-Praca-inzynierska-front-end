import React, { Fragment , useState} from "react";
import { Footer, Header, Navigation, Page } from "./layout";
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router} from 'react-router-dom';
// import {Provider} from "react-redux";
// import dataStore from "./store";

export default function App() {

  const [openMenu,setOpenMenu]=useState(false);

  return (
    <Fragment>
      <CssBaseline/>
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      {/* <Provider store={dataStore}> */}
        <Router>
          <Navigation openMenu={openMenu} setOpenMenu={setOpenMenu}/>
          <Page />
        </Router>
      {/* </Provider> */}
      <Footer />
    </Fragment>
  );
}

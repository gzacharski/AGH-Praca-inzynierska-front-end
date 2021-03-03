import React, {useState} from "react";
import { Footer, Header, Navigation, Page } from "./layout";
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
// import {Provider} from "react-redux";
// import dataStore from "./store";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

export default function App() {
  const [openMenu,setOpenMenu]=useState(false);
  const classes=useStyles();

  return (
    <div className={classes.root} data-testid='app-container'>
      <CssBaseline />
      <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {/* <Provider store={dataStore}> */}
      <Router>
        <Navigation openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <Page />
      </Router>
      {/* </Provider> */}
      <Footer />
    </div>
  );
}

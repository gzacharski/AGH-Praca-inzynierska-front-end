import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  About,
  Blog,
  Client,
  Contact,
  Home,
  LogInPage,
  News,
  Offer,
  SignUp
} from "../pages";

export default function Page() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/client" component={Client} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={LogInPage} />
      <Route path="/news" component={News} />
      <Route path="/offer" component={Offer} />
      <Route path="/sign-up" component={SignUp}/>
      <Redirect to="/" />
    </Switch>
  );
}

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
   About,
   Blog,
   Client,
   Contact,
   ConfirmRegistration,
   ConfirmResetPasswordPage,
   Home,
   LogInPage,
   News,
   Offer,
   SignUp,
   ResetPasswordPage,
} from 'src/main/pages';

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
         <Route path="/sign-up" component={SignUp} />
         <Route
            path="/confirmRegistration"
            sensitive
            component={ConfirmRegistration}
         />
         <Route
            path="/confirmNewPassword"
            sensitive
            component={ConfirmResetPasswordPage}
         />
         <Route path="/resetPassword" sensitive component={ResetPasswordPage} />
         <Redirect to="/" />
      </Switch>
   );
}

import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
   About,
   AccountPage,
   Blog,
   Client,
   Contact,
   ConfirmRegistration,
   ConfirmResetPasswordPage,
   Home,
   LogInPage,
   MessagesPage,
   News,
   Offer,
   SignUp,
   SettingsPage,
   ResetPasswordPage,
} from 'src/main/pages';
import { AuthContext } from 'src/main/auth';

export default function Page() {
   const authContext = useContext(AuthContext);
   const { token } = authContext.authState;
   return (
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/about" component={About} />
         <Route
            path="/account/messages"
            render={() => (
               <>
                  {token === null && <Redirect to="/login" />};
                  <MessagesPage />
               </>
            )}
         />
         <Route
            path="/account/settings"
            render={() => (
               <>
                  {token === null && <Redirect to="/login" />};
                  <SettingsPage />
               </>
            )}
         />
         <Route
            path="/account"
            render={() => (
               <>
                  {token === null && <Redirect to="/login" />};
                  <AccountPage />
               </>
            )}
         />
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

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
   AccountPage,
   ClientPage,
   ConfirmRegistration,
   ConfirmResetPasswordPage,
   ContactPage,
   EquipmentPage,
   Home,
   LogInPage,
   MessagesPage,
   PriceListPage,
   ResetPasswordPage,
   SettingsPage,
   SignUp,
   TimetablePage,
   TrainersPage,
   WorkoutsPage,
} from 'src/main/pages';
import { withAuthFilter } from 'src/main/auth';

const Page = () => (
   <Switch>
      <Route path="/" exact component={Home} />
      <Route
         path="/account/messages"
         component={() => withAuthFilter(MessagesPage)}
      />
      <Route
         path="/account/settings"
         component={() => withAuthFilter(SettingsPage)}
      />
      <Route path="/account" component={() => withAuthFilter(AccountPage)} />
      <Route path="/client" component={() => withAuthFilter(ClientPage)} />
      <Route path="/contact" component={ContactPage} />
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
      <Route path="/equipment" component={EquipmentPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/price-list" component={PriceListPage} />
      <Route path="/resetPassword" sensitive component={ResetPasswordPage} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/trainers" component={TrainersPage} />
      <Route path="/timetable" component={TimetablePage} />
      <Route path="/workouts" component={WorkoutsPage} />
      <Redirect to="/" />
   </Switch>
);

export default Page;

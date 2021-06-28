import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
   ClientPage,
   ConfirmRegistration,
   ConfirmResetPasswordPage,
   ContactPage,
   EquipmentPage,
   Home,
   LogInPage,
   PriceListPage,
   ResetPasswordPage,
   SignUp,
   TimetablePage,
   TrainersPage,
   WorkoutsPage,
} from 'src/main/pages';
import { withAuthFilter } from 'src/main/auth';
import { accountRouteGroup } from 'src/main/layout/navigation/routeGroups';

const Page = () => (
   <Switch>
      <Route path="/" exact component={Home} />
      {accountRouteGroup}
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

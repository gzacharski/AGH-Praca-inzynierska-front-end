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
import {
   AccountRouteGroup,
   AdminRouteGroup,
   EmployeeRouteGroup,
   ManagerRouteGroup,
} from 'src/main/layout/navigation/routeGroups';

const Page = () => (
   <Switch>
      <Route path="/" exact component={Home} />
      <Route
         path="/account/admin"
         component={() => withAuthFilter(AdminRouteGroup)}
      />
      <Route
         path="/account/manager"
         component={() => withAuthFilter(ManagerRouteGroup)}
      />
      <Route
         path="/account/employee"
         component={() => withAuthFilter(EmployeeRouteGroup)}
      />
      <Route
         path="/account"
         component={() => withAuthFilter(AccountRouteGroup)}
      />
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

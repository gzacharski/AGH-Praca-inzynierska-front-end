import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
   ROLE_ADMIN,
   ROLE_EMPLOYEE,
   ROLE_MANAGER,
   ROLE_TRAINER,
   ROLE_USER,
} from 'src/main/data/roles';
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
import { withAuthFilter, AuthContext } from 'src/main/auth';
import {
   AccountRouteGroup,
   AdminRouteGroup,
   EmployeeRouteGroup,
   ManagerRouteGroup,
   TrainerRouteGroups,
} from 'src/main/layout/navigation/routeGroups';

const Page = () => {
   const authContext = useContext(AuthContext);
   const { userInfo } = authContext.authState;
   const hasAdminRole = userInfo?.roles?.includes(ROLE_ADMIN);
   const hasEmployeeRole = userInfo?.roles?.includes(ROLE_EMPLOYEE);
   const hasManagerRole = userInfo?.roles?.includes(ROLE_MANAGER);
   const hasTrainerRole = userInfo?.roles?.includes(ROLE_TRAINER);
   const hasUserRole = userInfo?.roles?.includes(ROLE_USER);

   return (
      <Switch>
         <Route path="/" exact component={Home} />
         {hasAdminRole && (
            <Route path="/account/admin" component={AdminRouteGroup} />
         )}
         {hasManagerRole && (
            <Route path="/account/manager" component={ManagerRouteGroup} />
         )}
         {hasEmployeeRole && (
            <Route path="/account/employee" component={EmployeeRouteGroup} />
         )}
         {hasTrainerRole && (
            <Route path="/account/trainer" component={TrainerRouteGroups} />
         )}
         {hasUserRole && (
            <Route path="/account" component={AccountRouteGroup} />
         )}
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
};

export default Page;

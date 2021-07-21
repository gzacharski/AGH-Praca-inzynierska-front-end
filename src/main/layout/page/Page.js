/* eslint-disable react/jsx-props-no-spreading */
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
} from 'src/main/pages/public';
import { AuthContext, useAuth } from 'src/main/auth';
import {
   AccountRouteGroup,
   AdminRouteGroup,
   EmployeeRouteGroup,
   ManagerRouteGroup,
   TrainerRouteGroups,
} from 'src/main/layout/navigation/routeGroups';
import { FilterRenderer } from 'src/main/components/utils';
import { filteredUrls } from 'src/main/data/filteredUrls';
import { useStyles } from './Page.styles';

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
         {hasUserRole ? (
            <Route path="/account" component={AccountRouteGroup} />
         ) : (
            <Route path="/account" component={() => <Redirect to="/login" />} />
         )}

         <PublicRouteOnly path="/confirmRegistration" sensitive>
            <ConfirmRegistration />
         </PublicRouteOnly>
         <PublicRouteOnly path="/confirmNewPassword" sensitive>
            <ConfirmResetPasswordPage />
         </PublicRouteOnly>
         <PublicRouteOnly path="/login">
            <LogInPage />
         </PublicRouteOnly>
         <PublicRouteOnly path="/resetPassword" sensitive>
            <ResetPasswordPage />
         </PublicRouteOnly>
         <PublicRouteOnly path="/sign-up">
            <SignUp />
         </PublicRouteOnly>

         <Route path="/contact">
            <ContactPage />
         </Route>
         <Route path="/equipment">
            <EquipmentPage />
         </Route>
         <Route path="/price-list">
            <PriceListPage />
         </Route>
         <Route path="/trainers">
            <TrainersPage />
         </Route>
         <Route path="/timetable">
            <TimetablePage />
         </Route>
         <Route path="/workouts">
            <WorkoutsPage />
         </Route>

         <Redirect to="/" />
      </Switch>
   );
};

const PublicRouteOnly = ({ children, ...rest }) => {
   const auth = useAuth();
   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth.isAuthenticated() ? (
               <Redirect to={{ pathname: '/', state: { from: location } }} />
            ) : (
               children
            )
         }
      />
   );
};

const PageWrapper = () => {
   const classes = useStyles();
   return (
      <>
         <FilterRenderer urls={filteredUrls}>
            <div className={classes.appBarSpacer} />
         </FilterRenderer>
         <Page />
      </>
   );
};

export default PageWrapper;

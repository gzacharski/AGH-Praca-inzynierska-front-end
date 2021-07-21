/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
   ROLE_ADMIN,
   ROLE_EMPLOYEE,
   ROLE_MANAGER,
   ROLE_TRAINER,
} from 'src/main/data/roles';
import {
   HelpPage,
   MessagesPage,
   NotificationsPage,
   UserEquipmentPage,
   UserGroupWorkoutPage,
   UserIndividualWorkoutPage,
   SettingsPage,
   StatisticsPage,
} from 'src/main/pages/private/user';
import {
   ConfirmRegistration,
   ConfirmResetPasswordPage,
   ContactPage,
   EquipmentPage,
   LogInPage,
   PriceListPage,
   ResetPasswordPage,
   SignUp,
   TimetablePage,
   TrainersPage,
   WorkoutsPage,
} from 'src/main/pages/public';
import { AuthContext } from 'src/main/auth';
import {
   AdminRouteGroup,
   EmployeeRouteGroup,
   ManagerRouteGroup,
   TrainerRouteGroups,
} from 'src/main/layout/navigation/routeGroups';
import { FilterRenderer } from 'src/main/components/utils';
import { filteredUrls } from 'src/main/data/filteredUrls';
import { useStyles } from './Page.styles';
import {
   HomeRoute,
   PrivateRoute,
   PrivateRouteWithRole,
   PublicRouteOnly,
} from './RouteUtils';

const Page = () => {
   const authContext = useContext(AuthContext);
   const { userInfo } = authContext.authState;
   const hasAdminRole = userInfo?.roles?.includes(ROLE_ADMIN);
   const hasEmployeeRole = userInfo?.roles?.includes(ROLE_EMPLOYEE);
   const hasManagerRole = userInfo?.roles?.includes(ROLE_MANAGER);
   const hasTrainerRole = userInfo?.roles?.includes(ROLE_TRAINER);

   return (
      <Switch>
         <HomeRoute path="/" exact />

         <PrivateRoute path="/messages">
            <MessagesPage />
         </PrivateRoute>
         <PrivateRoute path="/notifications">
            <NotificationsPage />
         </PrivateRoute>
         <PrivateRoute path="/reservations/workouts/individual">
            <UserIndividualWorkoutPage />
         </PrivateRoute>
         <PrivateRoute path="/reservations/workouts/group">
            <UserGroupWorkoutPage />
         </PrivateRoute>
         <PrivateRoute path="/reservations/equipment">
            <UserEquipmentPage />
         </PrivateRoute>
         <PrivateRoute path="/settings">
            <SettingsPage />
         </PrivateRoute>
         <PrivateRoute path="/stats">
            <StatisticsPage />
         </PrivateRoute>
         <PrivateRoute path="/help">
            <HelpPage />
         </PrivateRoute>

         <PrivateRouteWithRole path="/admin" hasRole={hasAdminRole}>
            <AdminRouteGroup />
         </PrivateRouteWithRole>
         <PrivateRouteWithRole path="/manager" hasRole={hasManagerRole}>
            <ManagerRouteGroup />
         </PrivateRouteWithRole>
         <PrivateRouteWithRole path="/employee" hasRole={hasEmployeeRole}>
            <EmployeeRouteGroup />
         </PrivateRouteWithRole>
         <PrivateRouteWithRole path="/trainer" hasRole={hasTrainerRole}>
            <TrainerRouteGroups />
         </PrivateRouteWithRole>

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

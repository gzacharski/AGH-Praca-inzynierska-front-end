import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

const AccountRouteGroup = () => (
   <Switch>
      <Route path="/messages">
         <MessagesPage />
      </Route>
      <Route path="/notifications">
         <NotificationsPage />
      </Route>
      <Route path="/reservations/workouts/individual">
         <UserIndividualWorkoutPage />
      </Route>
      <Route path="/reservations/workouts/group">
         <UserGroupWorkoutPage />
      </Route>
      <Route path="/reservations/equipment">
         <UserEquipmentPage />
      </Route>
      <Route path="/settings">
         <SettingsPage />
      </Route>
      <Route path="/stats">
         <StatisticsPage />
      </Route>
      <Route path="/help">
         <HelpPage />
      </Route>
   </Switch>
);

export default AccountRouteGroup;

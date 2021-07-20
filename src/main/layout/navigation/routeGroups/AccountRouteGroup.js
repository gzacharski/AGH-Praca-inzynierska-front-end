import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import {
   AccountPage,
   HelpPage,
   MessagesPage,
   NotificationsPage,
   UserEquipmentPage,
   UserGroupWorkoutPage,
   UserIndividualWorkoutPage,
   SettingsPage,
   StatisticsPage,
} from 'src/main/pages/private/user';

const AccountRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/account" component={AccountPage} />
         <Route path={`${path}/messages`} component={MessagesPage} />
         <Route path={`${path}/notifications`} component={NotificationsPage} />
         <Route
            path={`${path}/reservations/workouts/individual`}
            component={UserIndividualWorkoutPage}
         />
         <Route
            path={`${path}/reservations/workouts/group`}
            component={UserGroupWorkoutPage}
         />
         <Route
            path={`${path}/reservations/equipment`}
            component={UserEquipmentPage}
         />
         <Route path={`${path}/settings`} component={SettingsPage} />
         <Route path={`${path}/stats`} component={StatisticsPage} />
         <Route path={`${path}/help`} component={HelpPage} />
         <Redirect to="/account" />
      </Switch>
   );
};

export default AccountRouteGroup;

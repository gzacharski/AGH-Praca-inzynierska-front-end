import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { AccountPage } from 'src/main/pages';
import {
   MessagesPage,
   ReservationsEquipmentPage,
   ReservationsGroupWorkoutPage,
   ReservationsIndivudualWorkoutPage,
   SettingsPage,
   StatisticsPage,
} from 'src/main/pages/account';

const AccountRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/account" component={AccountPage} />
         <Route path={`${path}/messages`} component={MessagesPage} />
         <Route
            path={`${path}/reservations/workouts/individual`}
            component={ReservationsIndivudualWorkoutPage}
         />
         <Route
            path={`${path}/reservations/workouts/group`}
            component={ReservationsGroupWorkoutPage}
         />
         <Route
            path={`${path}/reservations/equipment`}
            component={ReservationsEquipmentPage}
         />
         <Route path={`${path}/settings`} component={SettingsPage} />
         <Route path={`${path}/stats`} component={StatisticsPage} />
         <Redirect to="/account" />
      </Switch>
   );
};

export default AccountRouteGroup;

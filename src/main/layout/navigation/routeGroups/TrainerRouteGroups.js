import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import {
   NotificationsPage,
   TasksPage,
   TrainerPage,
   WorkoutsPage,
} from 'src/main/pages/private/trainer';

const ManagerRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/account/trainer" component={TrainerPage} />
         <Route path={`${path}/workouts`} component={WorkoutsPage} />
         <Route path={`${path}/notifications`} component={NotificationsPage} />
         <Route path={`${path}/tasks`} component={TasksPage} />
         <Redirect to="/account/trainer" />
      </Switch>
   );
};

export default ManagerRouteGroup;

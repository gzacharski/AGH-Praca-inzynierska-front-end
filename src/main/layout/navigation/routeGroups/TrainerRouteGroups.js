import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
   NotificationsPage,
   TasksPage,
   TrainerPage,
   WorkoutsPage,
} from 'src/main/pages/private/trainer';

const ManagerRouteGroup = () => (
   <Switch>
      <Route exact path="/trainer">
         <TrainerPage />
      </Route>
      <Route path="/trainer/workouts">
         <WorkoutsPage />
      </Route>
      <Route path="/trainer/notifications">
         <NotificationsPage />
      </Route>
      <Route path="/trainer/tasks">
         <TasksPage />
      </Route>
      <Redirect to="/trainer" />
   </Switch>
);

export default ManagerRouteGroup;

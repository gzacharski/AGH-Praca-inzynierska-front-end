import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { TasksPage, WorkoutsPage } from 'src/main/pages/private/trainer';

const ManagerRouteGroup = () => (
   <Switch>
      <Route path="/trainer/workouts">
         <WorkoutsPage />
      </Route>
      <Route path="/trainer/tasks">
         <TasksPage />
      </Route>
      <Redirect to="/" />
   </Switch>
);

export default ManagerRouteGroup;

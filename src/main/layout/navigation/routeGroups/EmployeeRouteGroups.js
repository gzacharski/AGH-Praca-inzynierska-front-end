import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
   EquipmentPage,
   TasksPage,
   UsersPage,
} from 'src/main/pages/private/employee';

const EmployeeRouteGroup = () => (
   <Switch>
      <Route path="/employee/tasks">
         <TasksPage />
      </Route>
      <Route path="/employee/equipment">
         <EquipmentPage />
      </Route>
      <Route path="/employee/users">
         <UsersPage />
      </Route>
      <Redirect to="/" />
   </Switch>
);

export default EmployeeRouteGroup;

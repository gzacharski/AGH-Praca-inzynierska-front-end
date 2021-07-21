import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
   EquipmentPage,
   ManagerPage,
   PriceListPage,
   TasksPage,
   TimetablePage,
   UsersPage,
} from 'src/main/pages/private/manager';

const ManagerRouteGroup = () => (
   <Switch>
      <Route exact path="/manager">
         <ManagerPage />
      </Route>
      <Route path="/manager/tasks">
         <TasksPage />
      </Route>
      <Route path="/manager/timetable">
         <TimetablePage />
      </Route>
      <Route path="/manager/pricelist">
         <PriceListPage />
      </Route>
      <Route path="/manager/equipment">
         <EquipmentPage />
      </Route>
      <Route path="/manager/users">
         <UsersPage />
      </Route>
      <Redirect to="/manager" />
   </Switch>
);

export default ManagerRouteGroup;

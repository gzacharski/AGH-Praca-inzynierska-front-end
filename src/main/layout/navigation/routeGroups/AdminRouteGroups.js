import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
   LogsPage,
   ManagementPage,
   StatisticsPage,
   UsersPage,
   EquipmentPage,
} from 'src/main/pages/private/admin';

const AdminRouteGroup = () => (
   <Switch>
      <Route path="/admin/equipment">
         <EquipmentPage />
      </Route>
      <Route path="/admin/logs">
         <LogsPage />
      </Route>
      <Route path="/admin/manage">
         <ManagementPage />
      </Route>
      <Route path="/admin/stats">
         <StatisticsPage />
      </Route>
      <Route path="/admin/users">
         <UsersPage />
      </Route>
      <Redirect to="/" />
   </Switch>
);

export default AdminRouteGroup;

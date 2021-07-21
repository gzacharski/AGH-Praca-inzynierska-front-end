import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
   AdminPage,
   BackupPage,
   ConfigurePage,
   LogsPage,
   ManagementPage,
   StatisticsPage,
   UsersPage,
} from 'src/main/pages/private/admin';

const AdminRouteGroup = () => (
   <Switch>
      <Route exact path="/admin">
         <AdminPage />
      </Route>
      <Route path="/admin/backup">
         <BackupPage />
      </Route>
      <Route path="/admin/configure">
         <ConfigurePage />
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
      <Redirect to="/admin" />
   </Switch>
);

export default AdminRouteGroup;

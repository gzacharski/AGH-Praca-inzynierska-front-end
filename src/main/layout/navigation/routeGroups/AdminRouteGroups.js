import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import {
   AdminPage,
   BackupPage,
   ConfigurePage,
   LogsPage,
   ManagementPage,
   StatisticsPage,
   UsersPage,
} from 'src/main/pages/private/admin';

const AdminRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/admin" component={AdminPage} />
         <Route path={`${path}/backup`} component={BackupPage} />
         <Route path={`${path}/configure`} component={ConfigurePage} />
         <Route path={`${path}/logs`} component={LogsPage} />
         <Route path={`${path}/manage`} component={ManagementPage} />
         <Route path={`${path}/stats`} component={StatisticsPage} />
         <Route path={`${path}/users`} component={UsersPage} />
         <Redirect to="/admin" />
      </Switch>
   );
};

export default AdminRouteGroup;

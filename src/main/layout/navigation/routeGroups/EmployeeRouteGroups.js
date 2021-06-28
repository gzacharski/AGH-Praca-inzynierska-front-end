import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import {
   EquipmentPage,
   ManagerPage,
   TasksPage,
   UsersPage,
} from 'src/main/pages/manager';

const ManagerRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/account/employee" component={ManagerPage} />
         <Route path={`${path}/tasks`} component={TasksPage} />
         <Route path={`${path}/equipment`} component={EquipmentPage} />
         <Route path={`${path}/users`} component={UsersPage} />
         <Redirect to="/account/employee" />
      </Switch>
   );
};

export default ManagerRouteGroup;

import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import {
   EquipmentPage,
   EmployeePage,
   TasksPage,
   UsersPage,
} from 'src/main/pages/employee';

const EmployeeRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/account/employee" component={EmployeePage} />
         <Route path={`${path}/tasks`} component={TasksPage} />
         <Route path={`${path}/equipment`} component={EquipmentPage} />
         <Route path={`${path}/users`} component={UsersPage} />
         <Redirect to="/account/employee" />
      </Switch>
   );
};

export default EmployeeRouteGroup;

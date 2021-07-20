import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import {
   EquipmentPage,
   ManagerPage,
   PriceListPage,
   TasksPage,
   TimetablePage,
   UsersPage,
} from 'src/main/pages/private/manager';

const ManagerRouteGroup = () => {
   const { path } = useRouteMatch();
   return (
      <Switch>
         <Route exact path="/account/manager" component={ManagerPage} />
         <Route path={`${path}/tasks`} component={TasksPage} />
         <Route path={`${path}/timetable`} component={TimetablePage} />
         <Route path={`${path}/pricelist`} component={PriceListPage} />
         <Route path={`${path}/equipment`} component={EquipmentPage} />
         <Route path={`${path}/users`} component={UsersPage} />
         <Redirect to="/account/manager" />
      </Switch>
   );
};

export default ManagerRouteGroup;

import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthFilter } from 'src/main/auth';
import { AccountPage, MessagesPage, SettingsPage } from 'src/main/pages';

export const accountRouteGroup = () => [
   <Route
      path="/account/messages"
      key="/account/messages"
      component={() => withAuthFilter(MessagesPage)}
   />,
   <Route
      path="/account/settings"
      key="/account/settings"
      component={() => withAuthFilter(SettingsPage)}
   />,
   <Route
      path="/account"
      key="/acount"
      component={() => withAuthFilter(AccountPage)}
   />,
];

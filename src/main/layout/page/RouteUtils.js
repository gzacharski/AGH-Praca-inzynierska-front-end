/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AccountPage } from 'src/main/pages/private/user';
import { Home } from 'src/main/pages/public';
import { useAuth } from 'src/main/auth';

const HomeRoute = ({ ...rest }) => {
   const auth = useAuth();
   return (
      <Route
         {...rest}
         render={() => (auth.isAuthenticated() ? <AccountPage /> : <Home />)}
      />
   );
};

const PrivateRouteWithRole = ({ children, hasRole, ...rest }) => {
   const auth = useAuth();
   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth.isAuthenticated() && hasRole ? (
               children
            ) : (
               <Redirect
                  to={{ pathname: '/login', state: { from: location } }}
               />
            )
         }
      />
   );
};

const PrivateRoute = ({ children, ...rest }) => (
   <PrivateRouteWithRole hasRole {...rest}>
      {children}
   </PrivateRouteWithRole>
);

const PublicRouteOnly = ({ children, ...rest }) => {
   const auth = useAuth();
   return (
      <Route
         {...rest}
         render={({ location }) =>
            auth.isAuthenticated() ? (
               <Redirect to={{ pathname: '/', state: { from: location } }} />
            ) : (
               children
            )
         }
      />
   );
};

export { HomeRoute, PrivateRoute, PrivateRouteWithRole, PublicRouteOnly };

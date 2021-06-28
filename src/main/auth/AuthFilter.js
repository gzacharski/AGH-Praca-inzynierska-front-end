import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from 'src/main/auth';
import {
   ROLE_ADMIN,
   ROLE_EMPLOYEE,
   ROLE_MANAGER,
   ROLE_TRAINER,
   ROLE_USER,
} from 'src/main/data/roles';

export const withAuthFilter = (Component) => {
   const authContext = useContext(AuthContext);
   const { token } = authContext.authState;
   return (
      <>
         {token === null && <Redirect to="/login" />};
         <Component />
      </>
   );
};

const withHasRole = (Component, role) => {
   const authContext = useContext(AuthContext);
   const { userInfo } = authContext.authState;
   const hasRole = userInfo.roles.includes(role);

   return hasRole && <Component />;
};

export const withAdminRole = (Component) => withHasRole(Component, ROLE_ADMIN);

export const withEmployeeRole = (Component) =>
   withHasRole(Component, ROLE_EMPLOYEE);

export const withManagerRole = (Component) =>
   withHasRole(Component, ROLE_MANAGER);

export const withTrainerRole = (Component) =>
   withHasRole(Component, ROLE_TRAINER);

export const withUserRole = (Component) => withHasRole(Component, ROLE_USER);

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

const hasRole = (role) => {
   const authContext = useContext(AuthContext);
   const { userInfo } = authContext.authState;
   return userInfo.roles.includes(role);
};

export const hasAdminRole = () => hasRole(ROLE_ADMIN);
export const hasEmployeeRole = () => hasRole(ROLE_EMPLOYEE);
export const hasManagerRole = () => hasRole(ROLE_MANAGER);
export const hasTrainerRole = () => hasRole(ROLE_TRAINER);
export const hasUserRole = () => hasRole(ROLE_USER);

export const withAdminRole = (Component) => hasAdminRole() && <Component />;

export const withEmployeeRole = (Component) =>
   hasEmployeeRole() && <Component />;

export const withManagerRole = (Component) => hasManagerRole() && <Component />;

export const withTrainerRole = (Component) => hasTrainerRole() && <Component />;

export const withUserRole = (Component) => hasUserRole() && <Component />;

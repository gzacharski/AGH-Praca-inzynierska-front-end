import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'src/main/auth';
import {
   ROLE_ADMIN,
   ROLE_EMPLOYEE,
   ROLE_MANAGER,
   ROLE_TRAINER,
   ROLE_USER,
} from 'src/main/data/roles';

export const AuthFilter = ({ children }) => {
   const { authState = {} } = useAuth();
   const { token } = authState;
   return (
      <>
         {token === null && <Redirect to="/login" />};{children}
      </>
   );
};

const OnlyWithRole = ({ children, role }) => {
   const { authState = {} } = useAuth();
   const { userInfo = {} } = authState;
   const { roles = [] } = userInfo;

   const hasRole = roles.includes(role);

   return <>{hasRole && children}</>;
};

export const OnlyWithAdminRole = ({ children }) => (
   <OnlyWithRole role={ROLE_ADMIN}>{children}</OnlyWithRole>
);

export const OnlyWithEmployeeRole = ({ children }) => (
   <OnlyWithRole role={ROLE_EMPLOYEE}>{children}</OnlyWithRole>
);

export const OnlyWithManagerRole = ({ children }) => (
   <OnlyWithRole role={ROLE_MANAGER}>{children}</OnlyWithRole>
);

export const OnlyWithTrainerRole = ({ children }) => (
   <OnlyWithRole role={ROLE_TRAINER}>{children}</OnlyWithRole>
);

export const OnlyWithUserRole = ({ children }) => (
   <OnlyWithRole role={ROLE_USER}>{children}</OnlyWithRole>
);

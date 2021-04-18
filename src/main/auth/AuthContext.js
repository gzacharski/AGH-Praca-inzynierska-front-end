import React from 'react';

export const AuthContext = React.createContext({
   authenticated: false,
   authorizationToken: null,
   // eslint-disable-next-line no-unused-vars
   authenticate: (username, password) => {},
   signout: () => {},
});

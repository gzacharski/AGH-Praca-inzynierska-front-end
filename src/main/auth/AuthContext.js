import React, { useContext } from 'react';

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { apiGateway } from 'src/main/data/urls';
import { AuthContext } from './AuthContext';

const AuthFetchContext = createContext();

const AuthFetchProvider = ({ children }) => {
   const authContext = useContext(AuthContext);
   const authAxios = axios.create({
      baseURL: apiGateway,
   });

   authAxios.interceptors.request.use(
      (config) => {
         // eslint-disable-next-line no-param-reassign
         config.headers.Authorization = `Bearer ${authContext.authState.token}`;
         return config;
      },
      (error) => Promise.reject(error),
   );
   return (
      <AuthFetchContext.Provider value={{ authAxios }}>
         {children}
      </AuthFetchContext.Provider>
   );
};

export { AuthFetchContext, AuthFetchProvider };

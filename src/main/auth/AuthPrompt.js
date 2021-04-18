/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
// import { Login } from 'src/main/pages';
import { AuthWrapper } from './AuthWrapper';

export const AuthPrompt = withRouter(
   AuthWrapper(() => {
      console.log('hey');
      return <Redirect to="/login" />;
   }),
);

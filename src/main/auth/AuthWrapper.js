/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AuthContext } from './AuthContext';

export const AuthWrapper = (WrappedComponent) =>
   class extends React.Component {
      render() {
         return (
            <AuthContext.Consumer>
               {(context) => <WrappedComponent {...this.props} {...context} />}
            </AuthContext.Consumer>
         );
      }
   };

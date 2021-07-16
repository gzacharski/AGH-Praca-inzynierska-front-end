import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import Header from './Header';

describe('Header', () => {
   describe('Header component if user not authenticated', () => {
      beforeEach(() => {
         render(
            <AuthContext.Provider value={{ isAuthenticated: () => false }}>
               <MemoryRouter>
                  <Header />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });

      test('contains visible log in button', () => {
         expect(screen.getByTestId('login-btn')).toBeInTheDocument();
         expect(screen.getByTestId('login-btn')).toBeVisible();
      });

      test('does not contain logout button', () => {
         expect(screen.queryByTestId('logout-btn')).not.toBeInTheDocument();
      });
   });

   describe('Header component if user authenticated', () => {
      beforeEach(() => {
         render(
            <AuthContext.Provider
               value={{
                  isAuthenticated: () => true,
                  authState: { userInfo: { userId: 'test' } },
               }}
            >
               <MemoryRouter>
                  <Header />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });

      test('does not contain log in button', () => {
         expect(screen.queryByTestId('login-btn')).not.toBeInTheDocument();
      });

      test('does not contain sign up button', () => {
         expect(
            screen.queryByTestId('header-singUp-button'),
         ).not.toBeInTheDocument();
      });

      test('contains personal menut', () => {
         expect(screen.queryByTestId('personal-menu')).toBeInTheDocument();
         expect(screen.queryByTestId('personal-menu')).toBeVisible();
      });
   });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import Header from './Header';

describe('Header', () => {
   describe('Header component should', () => {
      beforeEach(() => {
         render(
            <AuthContext.Provider value={{ isAuthenticated: () => jest.fn() }}>
               <MemoryRouter>
                  <Header />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });

      test('render tag "header"', () => {
         expect(screen.getByRole('header')).toBeInTheDocument();
      });
   });

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

      test('doest not contain logout button', () => {
         expect(screen.queryByTestId('logout-btn')).not.toBeInTheDocument();
      });
   });

   describe('Header component if user not authenticated', () => {
      beforeEach(() => {
         render(
            <AuthContext.Provider value={{ isAuthenticated: () => true }}>
               <MemoryRouter>
                  <Header />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });

      test('doest not contain log in button', () => {
         expect(screen.queryByTestId('login-btn')).not.toBeInTheDocument();
      });

      test('doest not contains sign up button', () => {
         expect(
            screen.queryByTestId('header-singUp-button'),
         ).not.toBeInTheDocument();
      });

      test('contains logout button', () => {
         expect(screen.queryByTestId('logout-btn')).toBeInTheDocument();
         expect(screen.queryByTestId('logout-btn')).toBeVisible();
      });
   });
});

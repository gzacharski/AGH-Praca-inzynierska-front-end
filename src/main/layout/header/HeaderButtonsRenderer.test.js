import React from 'react';
import { render, screen } from 'src/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from 'src/main/auth';
import { HeaderButtonsRenderer } from './HeaderButtonsRenderer';

describe('HeaderRenderer', () => {
   describe('User is authenticated and in header', () => {
      beforeEach(() => {
         render(
            <MemoryRouter>
               <AuthContext.Provider value={{ isAuthenticated: () => true }}>
                  <HeaderButtonsRenderer />
               </AuthContext.Provider>
            </MemoryRouter>,
         );
      });

      test('should be logout button', () => {
         expect(screen.getByTestId('personal-menu')).toBeInTheDocument();
      });

      test('should NOT be sign up button', () => {
         expect(screen.queryByText(/zarejestruj się/i)).not.toBeInTheDocument();
      });

      test('should NOT be log in button', () => {
         expect(screen.queryByText(/zaloguj się/i)).not.toBeInTheDocument();
      });
   });

   describe('User is NOT authenticated and in header', () => {
      beforeEach(() => {
         render(
            <MemoryRouter>
               <AuthContext.Provider value={{ isAuthenticated: () => false }}>
                  <HeaderButtonsRenderer />
               </AuthContext.Provider>
            </MemoryRouter>,
         );
      });

      test('should see one button', () => {
         expect(screen.queryAllByRole('button').length).toEqual(1);
      });

      test('should be log in button', () => {
         expect(screen.getByText(/zaloguj się/i)).toBeInTheDocument();
      });

      test('should NOT be logout button', () => {
         expect(screen.queryByText(/wyloguj się/i)).not.toBeInTheDocument();
      });
   });
});

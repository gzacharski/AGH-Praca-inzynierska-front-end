import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import PersonalMenu from './PersonalMenu';

describe('Personal menu', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider value={{ isAuthenticated: () => true }}>
            <MemoryRouter>
               <PersonalMenu />
            </MemoryRouter>
         </AuthContext.Provider>,
      );
   });

   test('should contains avatar button', () => {
      expect(screen.getByTestId('avatar-button')).toBeInTheDocument();
   });

   test('should contains message button', () => {
      expect(screen.getByTestId('message-button')).toBeInTheDocument();
   });

   test('should contains notification button', () => {
      expect(screen.getByTestId('notification-button')).toBeInTheDocument();
   });

   test('should contains dropDown button', () => {
      expect(screen.getByTestId('dropDown-button')).toBeInTheDocument();
   });
});

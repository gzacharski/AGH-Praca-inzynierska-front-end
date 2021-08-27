import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';

import PersonalMenu from './PersonalMenu';

describe('Personal menu', () => {
   describe('should be authenticated', () => {
      beforeEach(() => {
         global.localStorage.setItem('token', 'testToken');
         global.localStorage.setItem(
            'userInfo',
            JSON.stringify({ userId: 'testId' }),
         );

         render(
            <AuthContext.Provider
               value={{
                  isAuthenticated: () => true,
                  authState: { userInfo: { userId: 'test' } },
               }}
            >
               <MemoryRouter>
                  <PersonalMenu />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });

      test('should contains avatar-button', async () => {
         expect(await screen.findByTestId('avatar-button')).toBeInTheDocument();
      });

      test('should contains notification button', async () => {
         expect(
            await screen.findByTestId('notification-button'),
         ).toBeInTheDocument();
      });

      test('should contains dropDown button', async () => {
         expect(
            await screen.findByTestId('dropDown-button'),
         ).toBeInTheDocument();
      });
   });

   describe('should not be authenticated', () => {
      beforeEach(() => {
         render(
            <AuthContext.Provider value={{ isAuthenticated: () => false }}>
               <MemoryRouter>
                  <PersonalMenu />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
      });

      test('should not render', () => {
         expect(screen.queryByTestId('personal-menu')).not.toBeInTheDocument();
      });
   });
});

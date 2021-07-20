import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import UserGroupWorkoutPage from './UserGroupWorkoutPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider
            value={{
               isAuthenticated: () => true,
               authState: { userInfo: { userId: 'test' } },
            }}
         >
            <UserGroupWorkoutPage />
         </AuthContext.Provider>,
      );
   });

   test('should contain ', () => {
      expect(
         screen.getByText('Twoje rezerwacje zajęć grupowych'),
      ).toBeInTheDocument();
   });
});

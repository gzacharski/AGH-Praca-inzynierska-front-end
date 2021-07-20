import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import UserIndivudualWorkoutPage from './UserIndivudualWorkoutPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider
            value={{
               isAuthenticated: () => true,
               authState: { userInfo: { userId: 'test' } },
            }}
         >
            <UserIndivudualWorkoutPage />
         </AuthContext.Provider>,
      );
   });

   test('should contain ', () => {
      expect(
         screen.getByText('Twoje rezerwacje zajęć indywidualnych'),
      ).toBeInTheDocument();
   });
});

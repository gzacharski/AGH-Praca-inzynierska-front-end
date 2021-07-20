import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import ReservationsIndivudualWorkoutPage from './ReservationsIndivudualWorkoutPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider
            value={{
               isAuthenticated: () => true,
               authState: { userInfo: { userId: 'test' } },
            }}
         >
            <ReservationsIndivudualWorkoutPage />
         </AuthContext.Provider>,
      );
   });

   test('should contain ', () => {
      expect(
         screen.getByText('Twoje rezerwacje zajęć indywidualnych'),
      ).toBeInTheDocument();
   });
});

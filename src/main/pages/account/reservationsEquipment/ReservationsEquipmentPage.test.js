import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import ReservationsEquipmentPage from './ReservationsEquipmentPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider
            value={{
               isAuthenticated: () => true,
               authState: { userInfo: { userId: 'test' } },
            }}
         >
            <ReservationsEquipmentPage />{' '}
         </AuthContext.Provider>,
      );
   });

   test('should contain ', () => {
      expect(screen.getByText('Twoje rezerwacje sprzętu')).toBeInTheDocument();
   });
});

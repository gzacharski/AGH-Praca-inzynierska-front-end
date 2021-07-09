import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider
            value={{
               isAuthenticated: () => true,
               authState: { userInfo: '', token: '' },
            }}
         >
            <SettingsPage />
         </AuthContext.Provider>,
      );
   });

   test('should contain ', () => {
      expect(screen.getByText('Ustawienia konta')).toBeInTheDocument();
   });
});

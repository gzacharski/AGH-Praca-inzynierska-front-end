import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import TimetablePage from './TimetablePage';

describe('News component', () => {
   test('should contain proper page', () => {
      render(
         <AuthContext.Provider
            value={{
               isAuthenticated: () => true,
               authState: { token: 'testToken' },
            }}
         >
            <TimetablePage />
         </AuthContext.Provider>,
      );
      expect(screen.getByText(/Grafik zajęć/)).toBeInTheDocument();
      expect(
         screen.getByText(/Aktualny plan treningów w bieżącym tygodniu/),
      ).toBeInTheDocument();
   });
});

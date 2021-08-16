import React from 'react';
import { render, screen } from 'src/testUtils';
import AccountPage from './AccountPage';

describe('AccountPage', () => {
   beforeEach(() => {
      render(<AccountPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Konto użytkownika')).toBeInTheDocument();
   });
});

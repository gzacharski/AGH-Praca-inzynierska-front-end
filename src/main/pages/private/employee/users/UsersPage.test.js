import React from 'react';
import { render, screen } from 'src/testUtils';
import UsersPage from './UsersPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<UsersPage />);
   });

   xtest('should contain ', () => {
      expect(screen.getByText('Użytkownicy')).toBeInTheDocument();
   });
});

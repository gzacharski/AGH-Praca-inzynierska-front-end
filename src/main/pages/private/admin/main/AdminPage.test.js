import React from 'react';
import { render, screen } from 'src/testUtils';
import AdminPage from './AdminPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<AdminPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Strona administratora')).toBeInTheDocument();
   });
});

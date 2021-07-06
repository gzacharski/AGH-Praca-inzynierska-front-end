import React from 'react';
import { render, screen } from 'src/testUtils';
import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<SettingsPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Ustawienia konta')).toBeInTheDocument();
   });
});

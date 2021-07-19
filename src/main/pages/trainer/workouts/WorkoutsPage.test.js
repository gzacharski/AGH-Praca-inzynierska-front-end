import React from 'react';
import { render, screen } from 'src/testUtils';
import WorkoutsPage from './WorkoutsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<WorkoutsPage />);
   });

   test('should contain ', () => {
      expect(
         screen.getByText('Aktualny grafik zajęć indywidualnych i grupowych'),
      ).toBeInTheDocument();
   });
});

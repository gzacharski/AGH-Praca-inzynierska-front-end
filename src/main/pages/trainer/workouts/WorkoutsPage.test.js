import React from 'react';
import { render, screen } from 'src/testUtils';
import WorkoutsPage from './WorkoutsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<WorkoutsPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Zajęcia trenera')).toBeInTheDocument();
   });
});

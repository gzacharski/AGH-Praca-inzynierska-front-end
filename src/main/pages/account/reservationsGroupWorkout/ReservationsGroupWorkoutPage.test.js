import React from 'react';
import { render, screen } from 'src/testUtils';
import Statistics from './ReservationsGroupWorkoutPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<Statistics />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Twoje rezerwacje zajęć grupowych')).toBeInTheDocument();
   });
});

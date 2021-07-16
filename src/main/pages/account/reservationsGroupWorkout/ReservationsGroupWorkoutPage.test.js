import React from 'react';
import { render, screen } from 'src/testUtils';
import ReservationsGroupWorkout from './ReservationsGroupWorkoutPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ReservationsGroupWorkout />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Twoje rezerwacje zajęć grupowych')).toBeInTheDocument();
   });
});

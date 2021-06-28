import React from 'react';
import { render, screen } from 'src/testUtils';
import ReservationsIndivudualWorkoutPage from './ReservationsIndivudualWorkoutPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ReservationsIndivudualWorkoutPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Twoje rezerwacje zajęć indywidualnych')).toBeInTheDocument();
   });
});

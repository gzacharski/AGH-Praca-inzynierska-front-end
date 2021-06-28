import React from 'react';
import { render, screen } from 'src/testUtils';
import ReservationsEquipmentPage from './ReservationsEquipmentPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ReservationsEquipmentPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Twoje rezerwacje sprzętu')).toBeInTheDocument();
   });
});

import React from 'react';
import { render, screen } from 'src/testUtils';
import EquipmentPage from './EquipmentPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<EquipmentPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Modyfikuj sprzęt')).toBeInTheDocument();
   });
});

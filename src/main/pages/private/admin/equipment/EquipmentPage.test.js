import React from 'react';
import { render, screen } from 'src/testUtils';
import EquipmentPage from './EquipmentPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<EquipmentPage />);
   });

   xtest('should contain ', () => {
      expect(
         screen.getByText('Zarządzaj sprzętem fitness'),
      ).toBeInTheDocument();
   });
});

import React from 'react';
import { render, screen } from 'src/testUtils';
import ManagerPage from './EquipmentPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ManagerPage />);
   });

   test('should contain ', () => {
      expect(
         screen.getByText('Zarządzaj sprzętem fitness'),
      ).toBeInTheDocument();
   });
});

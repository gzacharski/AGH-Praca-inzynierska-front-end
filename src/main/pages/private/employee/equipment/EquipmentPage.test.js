import React from 'react';
import { render, screen } from 'src/testUtils';
import ManagerPage from './EquipmentPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ManagerPage />);
   });

   xtest('should contain ', () => {
      expect(
         screen.getByText('Modyfikuj sprzęt (manager)'),
      ).toBeInTheDocument();
   });
});

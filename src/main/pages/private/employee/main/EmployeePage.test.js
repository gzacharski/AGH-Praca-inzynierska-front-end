import React from 'react';
import { render, screen } from 'src/testUtils';
import ManagerPage from './EmployeePage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ManagerPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Strona pracownika')).toBeInTheDocument();
   });
});

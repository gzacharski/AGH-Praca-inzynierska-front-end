import React from 'react';
import { render, screen } from 'src/testUtils';
import ManagerPage from './ManagerPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ManagerPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Strona managera')).toBeInTheDocument();
   });
});

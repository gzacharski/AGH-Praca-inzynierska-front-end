import React from 'react';
import { render, screen } from 'src/testUtils';
import ManagementPage from './ManagementPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<ManagementPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Zarządzaj serwisami')).toBeInTheDocument();
   });
});

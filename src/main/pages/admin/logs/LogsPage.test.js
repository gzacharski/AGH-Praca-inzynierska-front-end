import React from 'react';
import { render, screen } from 'src/testUtils';
import LogsPage from './LogsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<LogsPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Logi')).toBeInTheDocument();
   });
});

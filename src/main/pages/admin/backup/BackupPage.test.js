import React from 'react';
import { render, screen } from 'src/testUtils';
import BackupPage from './BackupPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<BackupPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Kopia zapasowa')).toBeInTheDocument();
   });
});

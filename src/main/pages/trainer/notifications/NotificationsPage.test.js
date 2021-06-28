import React from 'react';
import { render, screen } from 'src/testUtils';
import NotificationsPage from './NotificationsPage';

describe('SettingsPage', () => {
   beforeEach(() => {
      render(<NotificationsPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Powiadomienia')).toBeInTheDocument();
   });
});

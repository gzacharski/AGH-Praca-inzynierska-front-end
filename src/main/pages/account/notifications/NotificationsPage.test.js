import React from 'react';
import { render, screen } from 'src/testUtils';
import NotificationsPage from './NotificationsPage';

describe('MessagePage', () => {
   beforeEach(() => {
      render(<NotificationsPage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Powiadomienia (użytkownik)')).toBeInTheDocument();
   });
});

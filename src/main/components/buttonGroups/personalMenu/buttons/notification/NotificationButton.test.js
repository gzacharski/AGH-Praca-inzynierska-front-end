import React from 'react';
import { render, screen } from 'src/testUtils';
import NotificationButton from './NotificationButton';

describe('Notification button', () => {
   beforeEach(() => {
      render(<NotificationButton />);
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });
});

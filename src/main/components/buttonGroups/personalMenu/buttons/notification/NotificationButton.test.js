import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import NotificationButton from './NotificationButton';

describe('Notification button', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <NotificationButton />
         </MemoryRouter>,
      );
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });
});

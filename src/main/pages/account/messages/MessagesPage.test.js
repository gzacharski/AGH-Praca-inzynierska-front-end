import React from 'react';
import { render, screen } from 'src/testUtils';
import MessagePage from './MessagesPage';

describe('MessagePage', () => {
   beforeEach(() => {
      render(<MessagePage />);
   });

   test('should contain ', () => {
      expect(screen.getByText('Wiadomości')).toBeInTheDocument();
   });
});

import React from 'react';
import { render, screen } from 'src/testUtils';
import { MemoryRouter } from 'react-router-dom';
import MessageButton from './MessageButton';

describe('Message button', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <MessageButton />
         </MemoryRouter>,
      );
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });
});

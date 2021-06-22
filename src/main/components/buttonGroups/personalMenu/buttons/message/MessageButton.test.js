import React from 'react';
import { render, screen } from 'src/testUtils';
import MessageButton from './MessageButton';

describe('Message button', () => {
   beforeEach(() => {
      render(<MessageButton />);
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });
});

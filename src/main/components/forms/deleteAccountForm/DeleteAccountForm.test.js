import React from 'react';
import { render, screen } from 'src/testUtils';
import { DeleteAccountForm } from './DeleteAccountForm';

describe('Delete Account form', () => {
   beforeEach(() => {
      render(<DeleteAccountForm />);
   });

   test('should render and have proper text', () => {
      expect(screen.getByText(/Usuń konto/)).toBeInTheDocument();
   });
});

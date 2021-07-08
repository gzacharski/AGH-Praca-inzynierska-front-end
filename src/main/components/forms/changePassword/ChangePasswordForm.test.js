import React from 'react';
import { render, screen } from 'src/testUtils';
import { ChangePasswordForm } from './ChangePasswordForm';

describe('Change Avatar Form', () => {
   beforeEach(() => {
      render(<ChangePasswordForm />);
   });

   test('should have proper title', () => {
      expect(screen.getByText(/Zmień hasło/)).toBeInTheDocument();
   });
});

import React from 'react';
import { render, screen } from 'src/testUtils';
import { ChangeUserInfoForm } from './ChangeUserInfoForm';

describe('Change Avatar Form', () => {
   beforeEach(() => {
      render(<ChangeUserInfoForm />);
   });

   test('should have proper title', () => {
      expect(screen.getByText(/Dane osobowe/)).toBeInTheDocument();
   });
});

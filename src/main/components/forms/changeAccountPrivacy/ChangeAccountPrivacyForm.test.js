import React from 'react';
import { render, screen } from 'src/testUtils';
import { ChangeAccountPrivacyForm } from './ChangeAccountPrivacyForm';

describe('Change Avatar Form', () => {
   beforeEach(() => {
      render(<ChangeAccountPrivacyForm />);
   });

   test('should have proper title', () => {
      expect(
         screen.getByText(/Ustawienia i prywatność konta/),
      ).toBeInTheDocument();
   });
});

import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import { ChangeAccountPrivacyForm } from './ChangeAccountPrivacyForm';

describe('Change Avatar Form', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider value={{ isAuthenticated: () => true }}>
            <ChangeAccountPrivacyForm />
         </AuthContext.Provider>,
      );
   });

   test('should have proper title', () => {
      expect(
         screen.getByText(/Ustawienia i prywatność konta/),
      ).toBeInTheDocument();
   });
});

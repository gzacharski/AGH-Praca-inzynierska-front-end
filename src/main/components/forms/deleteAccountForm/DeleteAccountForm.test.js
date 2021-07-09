import React from 'react';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import { DeleteAccountForm } from './DeleteAccountForm';

describe('Delete Account form', () => {
   beforeEach(() => {
      render(
         <AuthContext.Provider
            value={{ authState: { userInfo: '', token: '' } }}
         >
            <DeleteAccountForm />
         </AuthContext.Provider>,
      );
   });

   test('should render and have proper text', () => {
      expect(screen.getByTestId('delete-account')).toBeInTheDocument();
   });
});

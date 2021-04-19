import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import NavLinkButton from './NavLinkButton';

describe('NavlinkButton', () => {
   test('should route to proper page onClick', () => {
      render(
         <MemoryRouter>
            <NavLinkButton
               name="Zaloguj się"
               link="/login"
               classes={null}
               testId="header-login-button"
            />
         </MemoryRouter>,
      );
      expect(screen.getByTestId('header-login-button')).toBeInTheDocument();
   });
});

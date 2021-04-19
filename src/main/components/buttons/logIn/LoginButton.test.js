import React from 'react';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import LoginButton from './LoginButton';

describe('Login button', () => {
   test('should render', () => {
      render(
         <MemoryRouter>
            <LoginButton />
         </MemoryRouter>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Zaloguj się');
   });
});

describe('LoginButton clicked should route to Login page and', () => {
   beforeAll(() => {
      render(
         <MemoryRouter initialEntries={['/']}>
            <Route exact path="/" component={LoginButton} />
            <Route path="/login" render={() => <div>Login Page</div>} />
         </MemoryRouter>,
      );
      const button = screen.getByRole('button');
      userEvent.click(button);
   });

   test('it should be login page', () => {
      expect(screen.getByText(/Login Page/)).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
   });
});

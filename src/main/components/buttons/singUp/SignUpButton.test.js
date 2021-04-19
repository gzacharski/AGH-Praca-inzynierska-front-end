import React from 'react';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import SignUpButton from './SignUpButton';

describe('SignUp button', () => {
   test('should render', () => {
      render(
         <MemoryRouter>
            <SignUpButton />
         </MemoryRouter>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Zarejestruj się');
   });
});

describe('SignUp button clicked should route to SignUp page and', () => {
   test('it should render signUp page properly', () => {
      render(
         <MemoryRouter initialEntries={['/']}>
            <Route exact path="/" component={SignUpButton} />
            <Route path="/sign-up" render={() => <div>SignUp Page</div>} />
         </MemoryRouter>,
      );
      expect(screen.queryByText(/SignUp Page/)).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(screen.getByText(/SignUp Page/)).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
   });
});

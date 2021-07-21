import React from 'react';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import NavLink from './NavLink';

describe('Link', () => {
   test('should exists', () => {
      render(
         <MemoryRouter>
            <Route
               path="/"
               render={() => (
                  <NavLink
                     name="Test link"
                     link="/"
                     testId="test-btn-id"
                  />
               )}
            />
         </MemoryRouter>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
   });

   test.each([
      ['/account', 'Account Page'],
      ['/admin', 'Admin Page'],
      ['/manager', 'Manager Page'],
   ])('should route to %s page onClick', (path, textOnPage) => {
      render(
         <MemoryRouter>
            <Route
               path="/"
               render={() => (
                  <NavLink
                     name="Test link"
                     link={`${path}`}
                     testId="test-btn-id"
                  />
               )}
            />
            <Route path="/" render={() => <div>Account Page</div>} />
            <Route path="/admin" render={() => <div>Admin Page</div>} />
            <Route path="/manager" render={() => <div>Manager Page</div>} />
         </MemoryRouter>,
      );

      expect(screen.queryByText(textOnPage)).not.toBeInTheDocument();
      act(() => userEvent.click(screen.getByRole('button')));
      expect(screen.queryByText(textOnPage)).toBeInTheDocument();
   });
});

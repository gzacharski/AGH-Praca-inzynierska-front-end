import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import NavLinkButton from './NavLinkButton';

describe('NavlinkButton', () => {
   test('should exists', () => {
      render(
         <MemoryRouter>
            <Route
               path="/"
               render={() => (
                  <NavLinkButton
                     name="Test button"
                     link="/client"
                     testId="test-btn-id"
                  />
               )}
            />
         </MemoryRouter>,
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
   });

   test.each([
      ['/client', 'Client Page'],
      ['/admin', 'Admin Page'],
      ['/manager','Manager Page']
   ])('should route to %s page onClick', (path, textOnPage) => {
      render(
         <MemoryRouter>
            <Route
               path="/"
               render={() => (
                  <NavLinkButton
                     name="Test button"
                     link={`${path}`}
                     testId="test-btn-id"
                  />
               )}
            />
            <Route path="/client" render={() => <div>Client Page</div>} />
            <Route path="/admin" render={() => <div>Admin Page</div>} />
            <Route path="/manager" render={() => <div>Manager Page</div>} />
         </MemoryRouter>,
      );
      expect(screen.queryByText(textOnPage)).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('button'));
      expect(screen.queryByText(textOnPage)).toBeInTheDocument();
   });
});

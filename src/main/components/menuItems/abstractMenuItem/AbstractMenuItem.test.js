import React from 'react';
import userEvent from '@testing-library/user-event';
import { AccountCircle } from '@material-ui/icons';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, act } from 'src/testUtils';
import AbstractMenuItem from './AbstractMenuItem';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useHistory: () => ({
      push: mockHistoryPush,
   }),
}));

describe('Settings menu item', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <AbstractMenuItem
               itemName="Strona testowa"
               CustomIcon={AccountCircle}
               pushUrl="/test"
            />
            <Route path="/test" render={() => <div>Test Page</div>} />
         </MemoryRouter>,
      );
   });

   test('should render', () => {
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveTextContent('Strona testowa');
   });

   test('when clicked, it should route to account page', () => {
      expect(screen.queryByText(/Test Page/)).not.toBeInTheDocument();
      act(() => userEvent.click(screen.getByRole('menuitem')));
      expect(screen.queryByText(/Test Page/)).toBeInTheDocument();
   });
});

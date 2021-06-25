import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthProvider } from 'src/main/auth';
import LogoutButton from './LogoutButton';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useHistory: () => ({
      push: mockHistoryPush,
   }),
}));

describe('Logout button', () => {
   test('should render', () => {
      render(
         <AuthProvider>
            <LogoutButton />
         </AuthProvider>,
      );
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveTextContent('Wyloguj się');
   });

   test('when clicked, it should logout and route to login page', () => {
      render(
         <AuthProvider>
            <MemoryRouter>
               <LogoutButton />
            </MemoryRouter>
         </AuthProvider>,
      );
      userEvent.click(screen.getByText(/wyloguj się/i));
      expect(mockHistoryPush).toHaveBeenCalledWith('/login');
   });
});

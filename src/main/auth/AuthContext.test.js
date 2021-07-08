import React, { useContext } from 'react';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import { AuthContext } from './AuthContext';
import { AuthProvider } from './AuthProvider';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useHistory: () => ({
      push: mockHistoryPush,
   }),
}));

const TestComponent = () => {
   const { setAuthState, isAuthenticated, logout } = useContext(AuthContext);

   const handleClick = () => {
      setAuthState({
         token: 'token',
         expiresAt: new Date().getTime() / 1000 + 60 * 60,
         userInfo: {},
      });
   };

   return (
      <>
         <div data-testid="isAuthenticated">{isAuthenticated().toString()}</div>
         <button
            type="button"
            onClick={() => handleClick()}
            data-testid="loginBtn"
         >
            Login
         </button>
         <button type="button" onClick={() => logout()} data-testid="logoutBtn">
            Logout
         </button>
      </>
   );
};

describe('With authContext', () => {
   beforeEach(() => {
      delete window.location;
      window.location = { reload: jest.fn() };
      render(
         <AuthProvider>
            <TestComponent />
         </AuthProvider>,
      );
   });

   test('should not be authenticated', () => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
   });

   test('when clicked login button should user be logged in', async () => {
      userEvent.click(screen.getByText(/Login/));
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
   });

   test('when clicked logout button should user be logged out', () => {
      // TODO fix test
      userEvent.click(screen.getByText(/Login/));
      userEvent.click(screen.getByText(/Logout/));
      expect(window.location.reload).toHaveBeenCalled();
   });
});

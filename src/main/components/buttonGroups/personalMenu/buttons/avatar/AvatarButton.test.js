import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, act } from 'src/testUtils';
import { AuthProvider } from 'src/main/auth';
import configureStore from 'redux-mock-store';
import AvatarButton from './AvatarButton';

const mockStore = configureStore([]);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useHistory: () => ({
      push: mockHistoryPush,
   }),
}));

jest.mock('axios');

describe('Avatar button', () => {
   beforeEach(() => {
      const store = mockStore({
         account: {
            userInfo: {
               id: 'testId',
               name: 'TestName',
               surname: 'TestSurname',
            },
            status: 'idle',
            error: null,
         },
         avatar: {
            image: {
               data: 'TestImageData',
               format: 'TestImageFormat',
            },
            status: 'idle',
            error: null,
         },
      });

      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      render(
         <Provider store={store}>
            <AuthProvider>
               <MemoryRouter>
                  <AvatarButton />
                  <Route
                     path="/account"
                     render={() => <div>Account Page</div>}
                  />
               </MemoryRouter>
            </AuthProvider>
         </Provider>,
      );
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });

   test('should have proper text content', () => {
      expect(screen.getByRole('button')).toHaveTextContent('TestName');
   });

   test('should have image avatar', () => {
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('img').getAttribute('src')).toContain(
         'TestImageData',
      );
   });

   test('when clicked, it should route to account page', () => {
      expect(screen.queryByText(/Account Page/)).not.toBeInTheDocument();
      act(() => userEvent.click(screen.getByRole('button')));
      expect(screen.queryByText(/Account Page/)).toBeInTheDocument();
   });
});

import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from 'src/testUtils';
import { STATUS } from 'src/main/store';
import { AuthContext } from 'src/main/auth';
import MessageButton from './MessageButton';

const mockStore = configureStore([]);

const renderMessageButton = (store) =>
   render(
      <Provider store={store}>
         <AuthContext.Provider value={{ authState: {} }}>
            <MemoryRouter>
               <MessageButton />
               <Route
                  path="/messages"
                  render={() => <div>Messages page</div>}
               />
            </MemoryRouter>
         </AuthContext.Provider>
      </Provider>,
   );

describe('Message button', () => {
   describe('should render skeleton', () => {
      test('while loading notification', () => {
         const store = mockStore({
            account: {
               userInfo: {
                  name: null,
                  surname: null,
                  email: null,
                  phone: null,
               },
               status: STATUS.IDLE,
               message: null,
               error: null,
            },
            avatar: {
               image: null,
               status: STATUS.IDLE,
               message: null,
               error: null,
            },
            messages: {
               ids: [],
               entities: {},
               status: STATUS.LOADING,
               message: '',
            },
         });
         renderMessageButton(store);
         expect(
            screen.getByTestId('message-button-skeleton'),
         ).toBeInTheDocument();
      });

      test('while idle state when app render for the first time', () => {
         const store = mockStore({
            account: {
               status: STATUS.IDLE,
            },
            messages: {
               ids: [],
               entities: {},
               status: STATUS.LOADING,
            },
         });
         renderMessageButton(store);
         expect(
            screen.getByTestId('message-button-skeleton'),
         ).toBeInTheDocument();
      });
   });

   describe('shoulde render button', () => {
      beforeEach(() => {
         const store = mockStore({
            account: {
               status: STATUS.SUCCEEDED,
            },
            avatar: {
               image: null,
               status: STATUS.SUCCEEDED,
            },
            messages: {
               ids: [],
               entities: {},
               status: STATUS.LOADING,
               message: '',
            },
         });
         renderMessageButton(store);
      });

      test('should have button', () => {
         expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('when clicked, it should route to notifications page', () => {
         expect(screen.queryByText(/Messages page/)).not.toBeInTheDocument();
         act(() => userEvent.click(screen.getByRole('button')));
         expect(screen.queryByText(/Messages page/)).toBeInTheDocument();
      });
   });
});

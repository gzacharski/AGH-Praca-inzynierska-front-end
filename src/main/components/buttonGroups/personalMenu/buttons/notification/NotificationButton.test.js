import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from 'src/testUtils';
import { STATUS } from 'src/main/store';
import NotificationButton from './NotificationButton';

const mockStore = configureStore([]);

const renderNotificationButton = (store) =>
   render(
      <Provider store={store}>
         <MemoryRouter>
            <NotificationButton />
            <Route
               path="/notifications"
               render={() => <div>Notifications page</div>}
            />
         </MemoryRouter>
      </Provider>,
   );

describe('Notification button', () => {
   describe('should render skeleton', () => {
      test('while loading notification', () => {
         const store = mockStore({
            account: {
               status: STATUS.LOADING,
            },
         });
         renderNotificationButton(store);
         expect(
            screen.getByTestId('notification-button-skeleton'),
         ).toBeInTheDocument();
      });

      test('while idle state when app render for the first time', () => {
         const store = mockStore({
            account: {
               status: STATUS.IDLE,
            },
         });
         renderNotificationButton(store);
         expect(
            screen.getByTestId('notification-button-skeleton'),
         ).toBeInTheDocument();
      });
   });

   describe('shoulde render button', () => {
      beforeEach(() => {
         const store = mockStore({
            account: {
               status: STATUS.SUCCEEDED,
            },
         });
         renderNotificationButton(store);
      });

      test('should have button', () => {
         expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('when clicked, it should route to notifications page', () => {
         expect(
            screen.queryByText(/Notifications page/),
         ).not.toBeInTheDocument();
         act(() => userEvent.click(screen.getByRole('button')));
         expect(screen.queryByText(/Notifications page/)).toBeInTheDocument();
      });
   });
});

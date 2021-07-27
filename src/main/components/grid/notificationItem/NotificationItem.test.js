import React from 'react';
import { nanoid } from 'nanoid';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from 'src/testUtils';
import { STATUS } from 'src/main/store';
import { AuthContext } from 'src/main/auth';
import { NotificationItem } from './NotificationItem';

const mockStore = configureStore([]);

const notificationId = nanoid();

const store = mockStore({
   notifications: {
      ids: [notificationId],
      entities: {
         [notificationId]: {
            id: notificationId,
            from: {
               userId: nanoid(),
               name: 'Hajrah',
               surname: 'Childs',
               avatar: '',
            },
            title: 'Lacus finibus',
            content:
               'Integer nec lacinia nibh. Donec accumsan orci ac urna tempus, sed aliquet lacus finibus. Duis egestas.',
            created: '2021-07-27T12:21:01',
            checked: false,
         },
      },
   },
   status: STATUS.SUCCEEDED,
});

describe('Notification item', () => {
   test('should render without crashing when no props provided', () => {
      render(
         <AuthContext.Provider value={{ authState: {} }}>
            <Provider store={store}>
               <NotificationItem notificationId={notificationId} />
            </Provider>
         </AuthContext.Provider>,
      );
   });

   describe('should render test content', () => {
      beforeEach(() => {
         Date.now = jest.fn(() => Date.parse('2021-07-27T14:01:01'));
         render(
            <AuthContext.Provider value={{ authState: {} }}>
               <Provider store={store}>
                  <NotificationItem notificationId={notificationId} />
               </Provider>
            </AuthContext.Provider>,
         );
      });

      test('should render title', () => {
         expect(screen.getByText('Lacus finibus')).toBeInTheDocument();
      });

      test('should render name and surname', () => {
         expect(screen.getByText(/Hajrah Childs/)).toBeInTheDocument();
      });

      test('should render time ago', () => {
         expect(screen.getByText(/około 2 godziny temu/)).toBeInTheDocument();
      });

      test('should render content', () => {
         expect(
            screen.getByText(
               'Integer nec lacinia nibh. Donec accumsan orci ac urna tempus, sed aliquet lacus finibus. Duis egestas.',
            ),
         ).toBeInTheDocument();
      });

      test('should render tooltip when hover on delete icon', async () => {
         expect(
            screen.queryByText('Usuń powiadomienie'),
         ).not.toBeInTheDocument();

         userEvent.hover(
            screen.getByRole('button', { name: 'delete notification' }),
         );
         await waitFor(() => {
            expect(screen.getByText('Usuń powiadomienie')).toBeInTheDocument();
         });

         userEvent.unhover(
            screen.getByRole('button', { name: 'delete notification' }),
         );
         await waitFor(() => {
            expect(
               screen.queryByText('Usuń powiadomienie'),
            ).not.toBeInTheDocument();
         });
      });
   });
});

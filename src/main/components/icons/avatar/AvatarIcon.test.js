import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { screen, render } from 'src/testUtils';
import { testUser } from 'src/main/data/testData';
import { STATUS } from 'src/main/store';
import { AvatarIcon } from './AvatarIcon';

const mockStore = configureStore([]);

const renderAvatarIcon = (store) =>
   render(
      <Provider store={store}>
         <AvatarIcon />
      </Provider>,
   );

describe('Avatar icon', () => {
   describe('should render skeleton', () => {
      test('while fetching data', () => {
         const store = mockStore({
            avatar: {
               status: STATUS.LOADING,
            },
            account: {
               status: STATUS.LOADING,
            },
         });
         renderAvatarIcon(store);
         expect(screen.getByTestId('avatar-skeleton')).toBeInTheDocument();
      });

      test('while render app for the first time', () => {
         const store = mockStore({
            avatar: {
               status: STATUS.IDLE,
            },
            account: {
               status: STATUS.IDLE,
            },
         });
         renderAvatarIcon(store);
         expect(screen.getByTestId('avatar-skeleton')).toBeInTheDocument();
      });
   });
   describe('should render icon', () => {
      test('should render', () => {
         const store = mockStore({
            avatar: {
               image: 'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
               status: STATUS.SUCCEEDED,
            },
            account: {
               userInfo: testUser,
               status: STATUS.SUCCEEDED,
            },
         });
         renderAvatarIcon(store);
         expect(screen.getByRole('img')).toBeInTheDocument();
         expect(screen.getByRole('img').getAttribute('src')).toContain(
            'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
         );
      });

      test('should proper when image date not provided', () => {
         const store = mockStore({
            avatar: {
               status: STATUS.FAILED,
            },
            account: {
               userInfo: testUser,
               status: STATUS.SUCCEEDED,
            },
         });
         renderAvatarIcon(store);
         expect(screen.getByText(/KN/)).toBeInTheDocument();
      });
   });

   describe('should not render avatar icon', () => {
      test('when loadining status is failed', () => {
         const store = mockStore({
            avatar: {
               status: STATUS.FAILED,
            },
            account: {
               status: STATUS.FAILED,
            },
         });
         renderAvatarIcon(store);
         expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
      });
   });
});

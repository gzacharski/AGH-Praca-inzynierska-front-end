import React from 'react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, act, waitFor } from 'src/testUtils';
import { testUser, testAvatar } from 'src/main/data/testData';
import { STATUS } from 'src/main/store/status';
import AvatarButton from './AvatarButton';

const mockStore = configureStore([]);

const rendenAvatarButton = (store) =>
   render(
      <Provider store={store}>
         <MemoryRouter>
            <AvatarButton />
            <Route path="/account" render={() => <div>Account Page</div>} />
         </MemoryRouter>
      </Provider>,
   );

describe('Avatar button', () => {
   describe('should render button', () => {
      beforeEach(() => {
         const store = mockStore({
            account: {
               status: STATUS.SUCCEEDED,
               userInfo: testUser,
            },
            avatar: {
               status: STATUS.SUCCEEDED,
               image: testAvatar,
            },
         });
         rendenAvatarButton(store);
         jest.useFakeTimers();
      });

      test('should have button', () => {
         expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('should have proper text content', () => {
         expect(screen.getByRole('button')).toHaveTextContent('Krzysztof');
      });

      test('should have image avatar', () => {
         expect(screen.getByRole('img')).toBeInTheDocument();
         expect(screen.getByRole('img').getAttribute('src')).toContain(
            testAvatar.data,
         );
         expect(screen.getByRole('img').getAttribute('src')).toContain(
            testAvatar.format,
         );
      });

      test('when clicked, it should route to account page', () => {
         expect(screen.queryByText(/Account Page/)).not.toBeInTheDocument();
         act(() => userEvent.click(screen.getByRole('button')));
         expect(screen.queryByText(/Account Page/)).toBeInTheDocument();
      });

      test('when user hover above button it should render user name and surname', () => {
         const { name, surname } = testUser;
         const tooltip = `${name} ${surname}`;

         expect(screen.queryByText(tooltip)).not.toBeInTheDocument();
         act(() => {
            userEvent.hover(screen.getByRole('button'));
            jest.runAllTimers();
         });
         expect(screen.getByText(tooltip)).toBeInTheDocument();
      });
   });

   describe('should render skeleton', () => {
      test('while rendering app for the first time', () => {
         const store = mockStore({
            account: {
               status: STATUS.IDLE,
            },
            avatar: {
               status: STATUS.IDLE,
            },
         });
         rendenAvatarButton(store);
         expect(
            screen.getByTestId('avatar-button-skeleton'),
         ).toBeInTheDocument();
         expect(
            screen.getByTestId('avatar-button-skeleton-text'),
         ).toBeInTheDocument();
      });

      test('while fetching data', () => {
         const store = mockStore({
            account: {
               status: STATUS.LOADING,
            },
            avatar: {
               status: STATUS.LOADING,
            },
         });
         rendenAvatarButton(store);
         expect(
            screen.getByTestId('avatar-button-skeleton'),
         ).toBeInTheDocument();
         expect(
            screen.getByTestId('avatar-button-skeleton-text'),
         ).toBeInTheDocument();
      });
   });

   describe('should not render at all', () => {
      test('while fetching data an errors occurs', () => {
         const store = mockStore({
            account: {
               status: STATUS.FAILED,
            },
         });
         rendenAvatarButton(store);
         expect(screen.queryByTestId('avatar-button')).not.toBeInTheDocument();
      });

      test('while fetching invalid or no data', () => {
         const store = mockStore({
            account: {
               status: STATUS.SUCCEEDED,
            },
         });
         rendenAvatarButton(store);
         expect(screen.queryByTestId('avatar-button')).not.toBeInTheDocument();
      });
   });
});

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthContext } from 'src/main/auth';
import { render, screen, waitFor } from 'src/testUtils';
import { NOTISTACK } from 'src/main/store/notistack';
import { STATUS } from 'src/main/store/status';
import UsersPage from './UsersPage';

const mockStore = configureStore([]);

describe('SettingsPage', () => {
   beforeEach(() => {
      const store = mockStore({
         clientsList: {
            ids: [],
            entities: {},
            status: STATUS.IDLE,
            notistack: NOTISTACK.SUCCESS,
            message: null,
            error: null,
         },
      });
      render(
         <Provider store={store}>
            <AuthContext.Provider value={{ token: 'testToken' }}>
               <UsersPage />
            </AuthContext.Provider>
         </Provider>,
      );
   });

   xtest('should contain ', async () => {
      await waitFor(() => {
         expect(screen.getByText('Użytkownicy w systemie')).toBeInTheDocument();
      });
   });
});

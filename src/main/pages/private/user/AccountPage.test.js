import React from 'react';
import { render, screen } from 'src/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { STATUS } from 'src/main/store';
import { AuthContext } from 'src/main/auth';
import AccountPage from './AccountPage';

const mockStore = configureStore([]);

describe('AccountPage', () => {
   beforeEach(() => {
      const store = mockStore({
         account: {
            userInfo: {
               name: 'TestName',
               surname: 'TestSurname',
               email: 'TestEmail',
               phone: '666888777',
            },
            status: STATUS.SUCCEEDED,
            message: null,
         },
         avatar: {
            image: null,
            status: STATUS.SUCCEEDED,
         },
         messages: {
            ids: [],
            entities: {},
            status: STATUS.SUCCEEDED,
            message: null,
         },
      });

      render(
         <Provider store={store}>
            <AuthContext.Provider value={{ authState: {} }}>
               <MemoryRouter>
                  <AccountPage />
               </MemoryRouter>
            </AuthContext.Provider>
         </Provider>,
      );
   });

   xtest('should contain', () => {
      expect(screen.getByText('Karnet')).toBeInTheDocument();
      expect(screen.getByText('Najbliższe wydarzenie')).toBeInTheDocument();
   });
});

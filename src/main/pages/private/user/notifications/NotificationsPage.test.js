import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import NotificationsPage from './NotificationsPage';

describe('MessagePage', () => {
   test('should render ', () => {
      render(
         <MemoryRouter>
            <AuthContext.Provider
               value={{
                  authState: {},
               }}
            >
               <NotificationsPage />
            </AuthContext.Provider>
         </MemoryRouter>,
      );
   });
});

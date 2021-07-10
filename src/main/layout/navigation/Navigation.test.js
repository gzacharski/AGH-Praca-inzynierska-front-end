import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from 'src/main/auth';
import { render, screen } from 'src/testUtils';
import Navigation from './Navigation';

describe('Navigation component contains:', () => {
   test('tag nav', () => {
      render(
         <AuthContext.Provider
            value={{
               authState: { token: 'SampleToken', userInfo: { roles: [] } },
            }}
         >
            <MemoryRouter>
               <Navigation />
            </MemoryRouter>
         </AuthContext.Provider>,
      );
      expect(screen.getByTestId('navigation')).toBeInTheDocument();
   });

   test('tag nav', () => {
      render(
         <AuthContext.Provider
            value={{
               authState: { token: null, userInfo: { roles: [] } },
            }}
         >
            <MemoryRouter>
               <Navigation />
            </MemoryRouter>
         </AuthContext.Provider>,
      );
      expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
   });
});

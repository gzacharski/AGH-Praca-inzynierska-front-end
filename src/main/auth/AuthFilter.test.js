import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthContext } from './AuthContext';
import { withAuthFilter } from './AuthFilter';

const TestComponent = () => withAuthFilter(() => <div>Test component</div>);

describe('Auth filter', () => {
   test('should render text', () => {
      render(
         <MemoryRouter>
            <AuthContext.Provider value={{ authState: { token: 'testToken' } }}>
               <TestComponent />
            </AuthContext.Provider>
         </MemoryRouter>,
      );
      expect(screen.getByText(/Test component/)).toBeInTheDocument();
   });

   test('should NOT render text', () => {
      render(
         <MemoryRouter initialEntries={['/test']}>
            <Switch>
               <Route
                  path="/test"
                  component={() => (
                     <AuthContext.Provider
                        value={{ authState: { token: null } }}
                     >
                        <TestComponent />
                     </AuthContext.Provider>
                  )}
               />
               <Route path="/login" component={() => <div>Login page</div>} />
            </Switch>
         </MemoryRouter>,
      );
      expect(screen.queryByText(/Test component/)).not.toBeInTheDocument();
   });
});

import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import {
   ROLE_ADMIN,
   ROLE_EMPLOYEE,
   ROLE_MANAGER,
   ROLE_TRAINER,
   ROLE_USER,
} from 'src/main/data/roles';
import { AuthContext } from './AuthContext';
import {
   withAuthFilter,
   withAdminRole,
   withEmployeeRole,
   withManagerRole,
   withTrainerRole,
   withUserRole,
} from './AuthFilter';

const TestComponent = () => withAuthFilter(() => <div>Test component</div>);
const TestComponentWithAdmin = () =>
   withAdminRole(() => <div>Test component with admin role</div>);

const TestComponentWithEmployee = () =>
   withEmployeeRole(() => <div>Test component with employee role</div>);

const TestComponentWithManager = () =>
   withManagerRole(() => <div>Test component with manager role</div>);

const TestComponentWithTrainer = () =>
   withTrainerRole(() => <div>Test component with trainer role</div>);

const TestComponentWithUser = () =>
   withUserRole(() => <div>Test component with user role</div>);

describe('Auth filter', () => {
   describe('withAuthFilter', () => {
      test('should render text', () => {
         render(
            <MemoryRouter>
               <AuthContext.Provider
                  value={{ authState: { token: 'testToken' } }}
               >
                  <TestComponent />
               </AuthContext.Provider>
            </MemoryRouter>,
         );
         expect(screen.getByText('Test component')).toBeInTheDocument();
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
                  <Route
                     path="/login"
                     component={() => <div>Login page</div>}
                  />
               </Switch>
            </MemoryRouter>,
         );
         expect(screen.queryByText('Test component')).not.toBeInTheDocument();
      });
   });

   describe('with specific role', () => {
      test.each([
         [
            'withAdminRole',
            'Test component with admin role',
            TestComponentWithAdmin,
            ROLE_ADMIN,
         ],
         [
            'withEmployeeRole',
            'Test component with employee role',
            TestComponentWithEmployee,
            ROLE_EMPLOYEE,
         ],
         [
            'withManagerRole',
            'Test component with manager role',
            TestComponentWithManager,
            ROLE_MANAGER,
         ],
         [
            'withTrainerRole',
            'Test component with trainer role',
            TestComponentWithTrainer,
            ROLE_TRAINER,
         ],
         [
            'withUserRole',
            'Test component with user role',
            TestComponentWithUser,
            ROLE_USER,
         ],
      ])(
         '%s should render text: %s',
         (name, expectedText, TestedComponent, TestedRole) => {
            render(
               <AuthContext.Provider
                  value={{
                     authState: {
                        userInfo: {
                           roles: [TestedRole],
                        },
                     },
                  }}
               >
                  <TestedComponent />
               </AuthContext.Provider>,
            );
            expect(screen.getByText(expectedText)).toBeInTheDocument();
         },
      );

      test.each([
         [
            'withAdminRole',
            'Test component with admin role',
            TestComponentWithAdmin,
         ],
         [
            'withEmployeeRole',
            'Test component with employee role',
            TestComponentWithEmployee,
         ],
         [
            'withManagerRole',
            'Test component with manager role',
            TestComponentWithManager,
         ],
         [
            'withTrainerRole',
            'Test component with trainer role',
            TestComponentWithTrainer,
         ],
         [
            'withUserRole',
            'Test component with user role',
            TestComponentWithUser,
         ],
      ])(
         '%s should NOT render any text.',
         (name, expectedText, TestedComponent) => {
            render(
               <AuthContext.Provider
                  value={{
                     authState: {
                        userInfo: {
                           roles: [],
                        },
                     },
                  }}
               >
                  <TestedComponent />
               </AuthContext.Provider>,
            );
            expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
         },
      );
   });
});

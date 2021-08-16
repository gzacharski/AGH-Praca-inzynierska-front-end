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
   OnlyWithAdminRole,
   OnlyWithEmployeeRole,
   OnlyWithManagerRole,
   OnlyWithTrainerRole,
   OnlyWithUserRole,
   AuthFilter,
} from './AuthFilter';

const TestComponentWithAdmin = () => (
   <OnlyWithAdminRole>
      <div>Test component with admin role</div>
   </OnlyWithAdminRole>
);

const TestComponentWithEmployee = () => (
   <OnlyWithEmployeeRole>
      <div>Test component with employee role</div>
   </OnlyWithEmployeeRole>
);

const TestComponentWithManager = () => (
   <OnlyWithManagerRole>
      <div>Test component with manager role</div>
   </OnlyWithManagerRole>
);

const TestComponentWithTrainer = () => (
   <OnlyWithTrainerRole>
      <div>Test component with trainer role</div>
   </OnlyWithTrainerRole>
);

const TestComponentWithUser = () => (
   <OnlyWithUserRole>
      <div>Test component with user role</div>
   </OnlyWithUserRole>
);

describe('Auth filter', () => {
   describe('withAuthFilter', () => {
      test('should render text', () => {
         render(
            <MemoryRouter>
               <AuthContext.Provider
                  value={{ authState: { token: 'testToken' } }}
               >
                  <AuthFilter>
                     <div>Test component</div>
                  </AuthFilter>
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
                           <AuthFilter>
                              <div>Test component</div>
                           </AuthFilter>
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
         expect(screen.getByText('Login page')).toBeInTheDocument();
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
         (name, expectedText, TestedComponent, testedRole) => {
            render(
               <AuthContext.Provider
                  value={{
                     authState: {
                        userInfo: {
                           roles: [testedRole],
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

/* eslint-disable react/display-name */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { AuthContext } from 'src/main/auth';
import { ROLE_USER } from 'src/main/data/roles';
import Page from './Page';

jest.mock('../../pages/private/user/AccountPage', () => ({
   __esModule: true,
   default: () => <div>Account page</div>,
}));
jest.mock('../../pages/private/user/messages/MessagesPage', () => ({
   __esModule: true,
   default: () => <div>Message page</div>,
}));
jest.mock('../../pages/private/user/settings/SettingsPage', () => ({
   __esModule: true,
   default: () => <div>Settings page</div>,
}));
jest.mock(
   '../../pages/public/confirmRegistration/ConfirmRegistrationPage',
   () => ({
      __esModule: true,
      default: () => <div>Confirm registration page</div>,
   }),
);
jest.mock(
   '../../pages/public/confirmResetPassword/ConfirmResetPasswordPage',
   () => ({
      __esModule: true,
      default: () => <div>Confirm reset password page</div>,
   }),
);
jest.mock('../../pages/public/contact/Contact', () => ({
   __esModule: true,
   default: () => <div>Contact page</div>,
}));
jest.mock('../../pages/public/equipment/EquipmentPage', () => ({
   __esModule: true,
   default: () => <div>Equipment page</div>,
}));
jest.mock('../../pages/public/home/Home', () => ({
   __esModule: true,
   default: () => <div>Home page</div>,
}));
jest.mock('../../pages/public/login/LogInPage', () => ({
   __esModule: true,
   default: () => <div>LogIn page</div>,
}));
jest.mock('../../pages/public/priceList/PriceListPage', () => ({
   __esModule: true,
   default: () => <div>Price list page</div>,
}));
jest.mock('../../pages/public/resetPassword/ResetPasswordPage', () => ({
   __esModule: true,
   default: () => <div>Reset password page</div>,
}));
jest.mock('../../pages/public/sign-up/SignUp', () => ({
   __esModule: true,
   default: () => <div>SignUp page</div>,
}));
jest.mock('../../pages/public/timetable/TimetablePage', () => ({
   __esModule: true,
   default: () => <div>Timetable page</div>,
}));
jest.mock('../../pages/public/trainers/TrainersPage', () => ({
   __esModule: true,
   default: () => <div>Trainers page</div>,
}));
jest.mock('../../pages/public/workouts/WorkoutsPage', () => ({
   __esModule: true,
   default: () => <div>Workouts page</div>,
}));

describe('Page', () => {
   test.each([
      ['/', null, 'Home page'],
      ['/settings', 'Settings page', null],
      ['/', 'Account page', null],
      [
         '/confirmRegistration?token=sampleToken',
         null,
         'Confirm registration page',
      ],
      [
         '/confirmNewPassword?token=sampleToken',
         null,
         'Confirm reset password page',
      ],
      ['/equipment', 'Equipment page', null],
      ['/login', 'LogIn page', null],
      ['/price-list', 'Price list page', null],
      ['/resetPassword', null, 'Reset password page'],
      ['/sign-up', null, 'SignUp page'],
      ['/trainers', 'Trainers page'],
      ['/timetable', 'Timetable page'],
      ['/workouts', 'Workouts page'],
   ])(
      'when authenticated: "%s" should route to proper page.',
      (link, expectedText, textShouldNotRender) => {
         render(
            <AuthContext.Provider
               value={{
                  authState: {
                     token: 'SampleToken',
                     userInfo: { roles: [ROLE_USER] },
                  },
                  isAuthenticated: () => true,
               }}
            >
               <MemoryRouter initialEntries={[link]}>
                  <Page />
               </MemoryRouter>
            </AuthContext.Provider>,
         );
         if (expectedText)
            expect(screen.getByText(expectedText)).toBeInTheDocument();

         if (textShouldNotRender)
            expect(
               screen.queryByText(textShouldNotRender),
            ).not.toBeInTheDocument();
      },
   );
});

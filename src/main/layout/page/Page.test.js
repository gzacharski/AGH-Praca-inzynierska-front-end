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
      ['/', 'Home page'],
      ['/messages', 'Message page'],
      ['/settings', 'Settings page'],
      ['/', 'Account page'],
      ['/contact', 'Contact page'],
      ['/confirmRegistration?token=sampleToken', 'Confirm registration page'],
      ['/confirmNewPassword?token=sampleToken', 'Confirm reset password page'],
      ['/equipment', 'Equipment page'],
      ['/login', 'LogIn page'],
      ['/price-list', 'Price list page'],
      ['/resetPassword', 'Reset password page'],
      ['/sign-up', 'SignUp page'],
      ['/trainers', 'Trainers page'],
      ['/timetable', 'Timetable page'],
      ['/workouts', 'Workouts page'],
   ])('with valid path: "%s" should redirect to %p page.', (link, text) => {
      render(
         <AuthContext.Provider
            value={{
               authState: {
                  token: 'SampleToken',
                  userInfo: { roles: [ROLE_USER] },
               },
            }}
         >
            <MemoryRouter initialEntries={[link]}>
               <Page />
            </MemoryRouter>
         </AuthContext.Provider>,
      );
      expect(screen.getByText(text)).toBeInTheDocument();
   });

   test.each([
      ['/accunt/messagess', 'Message page'],
      ['/acount/settingss', 'Settings page'],
      ['/acount', 'Account page'],
      ['/contac', 'Contact page'],
      ['/confirmregistration?token=sampleToken', 'Confirm registration page'],
      ['/confirmnewPassword?token=sampleToken', 'Confirm reset password page'],
      ['/equipmentt', 'Equipment page'],
      ['/logina', 'LogIn page'],
      ['/pricelist', 'Price list page'],
      ['/resetpassword', 'Reset password page'],
      ['/signup', 'SignUp page'],
      ['/trainerss', 'Trainers page'],
      ['/timetablea', 'Timetable page'],
      ['/workout', 'Workouts page'],
   ])('with invalid path: "%s" should redirect to Home page.', (link, text) => {
      render(
         <AuthContext.Provider
            value={{
               authState: { token: 'SampleToken', userInfo: { roles: [] } },
            }}
         >
            <MemoryRouter initialEntries={[link]}>
               <Page />
            </MemoryRouter>
         </AuthContext.Provider>,
      );
      expect(screen.getByText(/Home page/)).toBeInTheDocument();
      expect(screen.queryByText(text)).not.toBeInTheDocument();
   });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import Page from './Page';
import {
   About,
   Blog,
   Client,
   Contact,
   ConfirmRegistration,
   ConfirmResetPasswordPage,
   Home,
   LogInPage,
   News,
   Offer,
   SignUp,
   ResetPasswordPage
} from '../pages';

jest.mock('../pages/about/About', () => jest.fn());
jest.mock('../pages/blog/Blog', () => jest.fn());
jest.mock('../pages/client/Client', () => jest.fn());
jest.mock('../pages/contact/Contact', () => jest.fn());
jest.mock('../pages/home/Home', () => jest.fn());
jest.mock('../pages/login/LogInPage', () => jest.fn());
jest.mock('../pages/news/News', () => jest.fn());
jest.mock('../pages/offer/Offer', () => jest.fn());
jest.mock('../pages/sign-up/SignUp', () => jest.fn());
jest.mock('../pages/confirmRegistration/ConfirmRegistrationPage', () =>
   jest.fn(),
);
jest.mock('../pages/confirmResetPassword/ConfirmResetPasswordPage', () =>
   jest.fn(),
);
jest.mock('../pages/resetPassword/ResetPasswordPage', () => jest.fn());

describe('Page', () => {
   test.each([
      ['/about', About],
      ['/blog', Blog],
      ['/client', Client],
      ['/contact', Contact],
      ['/confirmRegistration?token=sampleToken', ConfirmRegistration],
      ['/confirmNewPassword?token=sampleToken', ConfirmResetPasswordPage],
      ['/resetPassword',ResetPasswordPage],
      ['/', Home],
      ['/login', LogInPage],
      ['/news', News],
      ['/offer', Offer],
      ['/sign-up', SignUp],
   ])(
      'with valid path: "%s" should redirect to %p page.',
      (link, component) => {
         component.mockImplementation(() => (
            <div data-testid={component.name}>{component.name}</div>
         ));

         render(
            <MemoryRouter initialEntries={[link]}>
               <Page />
            </MemoryRouter>,
         );

         expect(screen.queryByText(`${component.name}`)).toBeInTheDocument();
         expect(screen.queryByTestId(`${component.name}`)).toBeInTheDocument();
         expect(screen.queryByTestId('randomId1234')).not.toBeInTheDocument();
      },
   );

   test.each([
      ['/about123', About],
      ['/blog1', Blog],
      ['/client3', Client],
      ['/contact4', Contact],
      ['/fafa', Contact],
      ['/confirmregistration', ConfirmRegistration],
      ['/confirmnewpassword', ConfirmResetPasswordPage],
      ['/resetpassword',ResetPasswordPage],
      ['/loginda', LogInPage],
      ['/newsfa', News],
      ['/offerf', Offer],
      ['/signup', SignUp],
   ])(
      'with invalid path: "%s" should redirect to Home page.',
      (link, component) => {
         Home.mockImplementation(() => <div data-testid="home">Home</div>);
         component.mockImplementation(() => (
            <div data-testid={component.name}>{component.name}</div>
         ));

         render(
            <MemoryRouter initialEntries={[link]}>
               <Page />
            </MemoryRouter>,
         );

         expect(screen.queryByText('Home')).toBeInTheDocument();
         expect(screen.queryByTestId('home')).toBeInTheDocument();
         expect(screen.queryByTestId(`${component.name}`)).toBeFalsy();
      },
   );
});

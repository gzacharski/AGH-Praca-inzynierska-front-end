import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from 'src/testUtils';
import { Page } from 'src/main/layout';
import LogInPage from './LogInPage';


describe('LogInPage page component', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <LogInPage />
         </MemoryRouter>,
      );
   });

   test('should have log in text', () => {
      expect(screen.getByText(/Zaloguj się/)).toBeInTheDocument();
   });

   test('should have three links', () => {
      expect(screen.getAllByRole('link').length).toEqual(3);
   });

   test('should have proper title', () => {
      expect(screen.getByText(/Zaloguj się/)).toBeInTheDocument();
   });

   describe('should have link to reset password page', () => {
      test('should have proper title', () => {
         expect(screen.getByText(/Nie pamiętasz hasła?/)).toBeInTheDocument();
      });

      test('should have proper linkt to the page', () => {
         // TODO: when reset password page is ready
      });

      test('once the link clicked, it should route to proper page', () => {
         // TODO: when reset password page is ready
      });
   });

   describe('should have link to sign up page', () => {
      test('should have proper title', () => {
         expect(screen.getByText(/Utwórz konto/)).toBeInTheDocument();
      });

      test('should have proper link', () => {
         const signUpLinks = screen
            .getAllByRole('link')
            .filter((link) => link.getAttribute('href').endsWith('sign-up'));
         expect(signUpLinks.length).toEqual(1);
      });
   });
});

describe('User clicks link and', () => {
   test('it should route to the sing up page', () => {
      const history = createMemoryHistory();
      history.push('/login');
      render(
         <Router history={history}>
            <Page />
         </Router>,
      );
      expect(screen.getByText(/Zaloguj się/)).toBeInTheDocument();

      userEvent.click(screen.getByText(/Utwórz konto/));

      expect(
         screen
            .getAllByRole('heading')
            .filter((heading) => heading.textContent === 'Zarejestruj się')
            .length,
      ).toEqual(1);

      const signUpButton=screen.queryByRole('button');
      expect(signUpButton).toBeInTheDocument();
      expect(signUpButton).toHaveTextContent('Zarejestruj się');
   });

   test('it should route to the reset password page', () => {
      const history = createMemoryHistory();
      history.push('/login');
      render(
         <Router history={history}>
            <Page />
         </Router>,
      );
      expect(screen.getByText(/Zaloguj się/)).toBeInTheDocument();

      userEvent.click(screen.getByText(/Nie pamiętasz hasła?/));

      expect(
         screen
            .getAllByRole('heading')
            .filter((heading) => heading.textContent === 'Zresetuj hasło')
            .length,
      ).toEqual(1);

      const button=screen.queryByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Wyślij link do zmiany hasła');
   });
});

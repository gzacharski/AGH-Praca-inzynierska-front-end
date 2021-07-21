import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import ConfirmRegistration from './ConfirmRegistrationPage';

jest.mock('axios');

describe('ConfirmRegistration page', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <ConfirmRegistration />
         </MemoryRouter>,
      );
   });

   describe('should have', () => {
      test("a text: 'Potwierdzenie rejestracji'", () => {
         expect(
            screen.getByText(/Potwierdzenie rejestracji/),
         ).toBeInTheDocument();
      });

      test('should be a button', () => {
         expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('button should have test"Aktywuj konto"', () => {
         expect(screen.getByRole('button')).toHaveTextContent(/Aktywuj konto/);
      });

      test('should have footer', () => {
         expect(
            screen.getByText(/System do wspomagania zarządzania/),
         ).toBeInTheDocument();
      });
   });

   describe('once user clicks button', () => {
      beforeEach(() => {
         axios.get.mockImplementationOnce(() =>
            Promise.resolve({
               data: {
                  succcess: true,
                  message: 'Test message',
                  errors: {},
               },
               status: 200,
               statusText: 'OK',
               headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
               },
            }),
         );
      });

      test('should button dissapear', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(screen.queryAllByRole('button').length).toBe(0);
      });

      test('should be visible circular progress', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
      });
   });

   describe('when user send valid token', () => {
      beforeEach(() => {
         axios.get.mockImplementationOnce(() =>
            Promise.resolve({
               data: {
                  succcess: true,
                  message:
                     'Poprawnie potwierdzono rejestrację. Możesz się zalogować.',
                  errors: {},
               },
               status: 200,
               statusText: 'OK',
               headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
               },
            }),
         );
      });

      test('should be visible CheckCircle icon', async () => {
         await userEvent.click(screen.getByRole('button'));

         expect(await screen.findByTestId('check-circle')).toBeInTheDocument();
      });

      test('should be visible success message.', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByText(
               'Poprawnie potwierdzono rejestrację. Możesz się zalogować.',
            ),
         ).toBeInTheDocument();
      });

      test('should be visible login button', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.findByRole('button')).toBeInTheDocument();
         expect(await screen.findByRole('button')).toHaveTextContent(
            'Zaloguj się',
         );
      });
   });

   describe('when user send expired token', () => {
      beforeEach(() => {
         axios.get.mockImplementationOnce(() =>
            Promise.resolve({
               data: {
                  message: 'Wygasł token potwierdzający rejestrację.',
               },
               status: 401,
               statusText: 'Unauthorized',
               headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
               },
            }),
         );
      });

      test('should be visible ReportProblem icon', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByTestId('report-problem'),
         ).toBeInTheDocument();
      });

      test('should be visible failure 401 message.', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByText('Wygasł token potwierdzający rejestrację.'),
         ).toBeInTheDocument();
      });

      test('should be visible refresh registration_ button', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.findByRole('button')).toBeInTheDocument();
         expect(await screen.findByRole('button')).toHaveTextContent(
            'Wyślij nowy link aktywacyjny',
         );
      });
   });

   describe('when user send invalid token', () => {
      beforeEach(() => {
         axios.get.mockImplementationOnce(() =>
            Promise.resolve({
               data: {
                  message:
                     'Wystąpił błąd. Nieprawidłowy token potwierdzający rejestrację.',
               },
               status: 404,
               statusText: 'Not Found',
               headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
               },
            }),
         );
      });

      test('should be visible reportProblem icon', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByTestId('report-problem'),
         ).toBeInTheDocument();
      });

      test('should be visible failure 404 message.', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByText(
               'Wystąpił błąd. Nieprawidłowy token potwierdzający rejestrację.',
            ),
         ).toBeInTheDocument();
      });

      test('should be visible refresh registration button', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.findByRole('button')).toBeInTheDocument();
         expect(await screen.findByRole('button')).toHaveTextContent(
            'Wyślij nowy link aktywacyjny',
         );
      });
   });

   describe('when internal server error occurs', () => {
      beforeEach(() => {
         axios.get.mockImplementationOnce(() =>
            Promise.resolve({
               data: {
                  message:
                     'Wystąpił błąd podczas rejestracji. Skontaktuj się z administratorem.',
               },
               status: 500,
               statusText: 'Internal Server Error',
               headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
               },
            }),
         );
      });

      test('should be visible error icon', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.findByTestId('error')).toBeInTheDocument();
      });

      test('should be visible failure 500 message.', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByText(
               'Wystąpił błąd podczas rejestracji. Skontaktuj się z administratorem.',
            ),
         ).toBeInTheDocument();
      });

      test('should not be visible any button after server error', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.queryAllByRole('button').length).toBe(0);
      });
   });

   describe('when no connection error', () => {
      beforeEach(() => {
         axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error('net::ERR_CONNECTION_REFUSED')),
         );
      });

      test('should be visible error icon_', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.findByTestId('error')).toBeInTheDocument();
      });

      test('should be visible failure no connection message.', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(
            await screen.findByText(
               'Wystąpił problem z połączeniem z serwisem. Spróbuj ponownie później lub wypróbuj inne połączenie sieciowe.',
            ),
         ).toBeInTheDocument();
      });

      test('should not be visible any button when no connection', async () => {
         await userEvent.click(screen.getByRole('button'));
         expect(await screen.queryAllByRole('button').length).toBe(0);
      });
   });
});

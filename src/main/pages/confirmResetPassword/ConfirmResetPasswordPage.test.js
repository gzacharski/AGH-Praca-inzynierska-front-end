import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, screen } from 'src/testUtils';
import ConfirmResetPasswordPage from './ConfirmResetPasswordPage';

jest.mock('axios');

describe('ConfirmResetPassword page', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <ConfirmResetPasswordPage />
         </MemoryRouter>,
      );
   });

   describe('should have', () => {
      test("a text: 'Zresetuj hasło'", () => {
         expect(
            screen
               .getAllByRole('heading')
               .filter((heading) => heading.textContent === 'Zresetuj hasło')
               .length,
         ).toBe(1);
      });

      test('should be a button', () => {
         expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('button should have test"Aktywuj konto"', () => {
         expect(screen.getByRole('button')).toHaveTextContent(/Zresetuj hasło/);
      });

      test('should have footer', () => {
         expect(
            screen.getByText(/System do wspomagania zarządzania/),
         ).toBeInTheDocument();
      });
   });

   describe('When form is valid and and user clicks button', () => {
      const timeToWriteNextCharacterInMS = 50;
      beforeEach(async () => {
         userEvent.type(
            screen.getByLabelText(/Nowe hasło/),
            'password1234',
            timeToWriteNextCharacterInMS,
         );

         userEvent.type(
            screen.getByLabelText(/Powtórz nowe hasło/),
            'password1234',
            timeToWriteNextCharacterInMS,
         );
      });

      test('password should be', async () => {
         await waitFor(() =>
            expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue(
               'password1234',
            ),
         );
      });

      test('matching password should be', async () => {
         await waitFor(() =>
            expect(screen.getByLabelText(/Powtórz nowe hasło/)).toHaveValue(
               'password1234',
            ),
         );
      });

      describe('when user send valid token', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.resolve({
                  data: {
                     succcess: true,
                     message:
                        'Poprawnie zresetowano hasło. Możesz się zalogować.',
                     errors: {},
                  },
                  status: 200,
                  statusText: 'OK',
                  headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                  },
               }),
            );

            userEvent.click(screen.getByRole('button'));
         });

         test('should be visible CircularProgress while processing valid token', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('circular-progress')).toBeInTheDocument(),
            );
         });

         test('should be visible CheckCircle icon', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('check-circle')).toBeInTheDocument(),
            );
         });

         test('should be visible success message.', async () => {
            await waitFor(() =>
               expect(
                  screen.getByText(
                     'Poprawnie zresetowano hasło. Możesz się zalogować.',
                  ),
               ).toBeInTheDocument(),
            );
         });

         test('should be visible login button', async () => {
            await waitFor(() => {
               expect(screen.getByRole('button')).toBeInTheDocument();
               expect(screen.getByRole('button')).toHaveTextContent(
                  'Zaloguj się',
               );
            });
         });
      });

      describe('when user send expired token', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.resolve({
                  data: {
                     message: 'Wygasł token resetujący hasło.',
                  },
                  status: 401,
                  statusText: 'Unauthorized',
                  headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                  },
               }),
            );

            userEvent.click(screen.getByRole('button'));
         });

         test('should be visible CircularProgress while processing expired token', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('circular-progress')).toBeInTheDocument(),
            );
         });

         test('should be visible ReportProblem icon', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('report-problem')).toBeInTheDocument(),
            );
         });

         test('should be visible failure message.', async () => {
            await waitFor(() =>
               expect(
                  screen.getByText('Wygasł token resetujący hasło.'),
               ).toBeInTheDocument(),
            );
         });

         test('should be visible refresh token button', async () => {
            await waitFor(() => {
               expect(screen.getByRole('button')).toBeInTheDocument();
               expect(screen.getByRole('button')).toHaveTextContent(
                  'Wyślij nowy link aktywacyjny',
               );
            });
         });
      });

      describe('when user send invalid token', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.resolve({
                  data: {
                     message: 'Nieprawidłowy token resetujący hasło.',
                  },
                  status: 404,
                  statusText: 'Not Found',
                  headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                  },
               }),
            );

            userEvent.click(screen.getByRole('button'));
         });

         test('should be visible CircularProgress while processing invalid token', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('circular-progress')).toBeInTheDocument(),
            );
         });

         test('should be visible ReportProblem icon when invalid token', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('report-problem')).toBeInTheDocument(),
            );
         });

         test('should be visible invalid token message.', async () => {
            await waitFor(() =>
               expect(
                  screen.getByText('Nieprawidłowy token resetujący hasło.'),
               ).toBeInTheDocument(),
            );
         });

         test('should be visible refresh token button when invalid token', async () => {
            await waitFor(() => {
               expect(screen.getByRole('button')).toBeInTheDocument();
               expect(screen.getByRole('button')).toHaveTextContent(
                  'Wyślij nowy link aktywacyjny',
               );
            });
         });
      });

      describe('when user send request and server error happens', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.resolve({
                  data: {
                     message:
                        'Wystąpił błąd resetowania hasła. Skontaktuj się z administratorem.',
                  },
                  status: 500,
                  statusText: 'Internal Server Error',
                  headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                  },
               }),
            );

            userEvent.click(screen.getByRole('button'));
         });

         test('should be visible CircularProgress while server error happens', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('circular-progress')).toBeInTheDocument(),
            );
         });

         test('should be visible Error icon', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('error')).toBeInTheDocument(),
            );
         });

         test('should be visible error message.', async () => {
            await waitFor(() =>
               expect(
                  screen.getByText(
                     'Wystąpił błąd resetowania hasła. Skontaktuj się z administratorem.',
                  ),
               ).toBeInTheDocument(),
            );
         });

         test('should not be visible any button after server error', async () => {
            await waitFor(() => {
               expect(screen.queryAllByRole('button').length).toBe(0);
            });
         });
      });

      describe('when no connection error', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.reject(new Error('net::ERR_CONNECTION_REFUSED')),
            );
            userEvent.click(screen.getByRole('button'));
         });

         test('should be visible CircularProgress while no connection error', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('circular-progress')).toBeInTheDocument(),
            );
         });

         test('should be visible error icon_', async () => {
            await waitFor(() =>
               expect(screen.getByTestId('error')).toBeInTheDocument(),
            );
         });

         test('should be visible failure no connection message.', async () => {
            await waitFor(() => {
               expect(
                  screen.getByText(
                     'Wystąpił problem z połączeniem z serwisem. Spróbuj ponownie później lub wypróbuj inne połączenie sieciowe.',
                  ),
               ).toBeInTheDocument();
            });
         });

         test('should not be visible any button when no connection', async () => {
            await waitFor(() =>
               expect(screen.queryAllByRole('button').length).toBe(0),
            );
         });
      });
   });
});

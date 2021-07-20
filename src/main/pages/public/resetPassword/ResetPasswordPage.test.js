import React from 'react';
import axios from 'axios';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, screen } from 'src/testUtils';
import ResetPasswordPage from './ResetPasswordPage';

jest.mock('axios');

describe('ResetPassword page', () => {
   beforeEach(() => {
      render(<ResetPasswordPage />);
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

      test('button should have test "Wyślij link do zmiany hasła"', () => {
         expect(screen.getByRole('button')).toHaveTextContent(
            /Wyślij link do zmiany hasła/,
         );
      });
   });

   describe('When form is valid and and user clicks button', () => {
      const timeToWriteNextCharacterInMS = 50;
      beforeEach(async () => {
         userEvent.type(
            screen.getByLabelText(/Email/),
            'xmr09697@zwoho.com',
            timeToWriteNextCharacterInMS,
         );
      });

      test('email should be', async () => {
         await waitFor(() =>
            expect(screen.getByLabelText(/Email/)).toHaveValue(
               'xmr09697@zwoho.com',
            ),
         );
      });

      describe('when user send valid email', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.resolve({
                  data: {
                     succcess: true,
                     message:
                        'Link do zmiany hasła został wysłany na podany adres email.',
                     errors: {},
                  },
                  status: 200,
                  statusText: 'OK',
                  headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                  },
               }),
            );

            act(() => {
               userEvent.click(screen.getByRole('button'));
            });
         });

         test('should be visible CircularProgress while processing valid token', async () => {
            await waitFor(() =>
               expect(
                  screen.getByTestId('circular-progress'),
               ).toBeInTheDocument(),
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
                     'Link do zmiany hasła został wysłany na podany adres email.',
                  ),
               ).toBeInTheDocument(),
            );
         });

         test('should not be visible any button', async () => {
            await waitFor(() => {
               expect(screen.queryAllByRole('button').length).toBe(0);
            });
         });
      });

      describe('when user acount expired', () => {
         beforeEach(() => {
            axios.post.mockImplementationOnce(() =>
               Promise.resolve({
                  data: {
                     message:
                        'Nie możesz resetować hasła. Twoje konto jest nieaktywne.',
                  },
                  status: 403,
                  statusText: 'Forbidden',
                  headers: {
                     'Content-Type': 'application/json; charset=UTF-8',
                  },
               }),
            );

            act(() => {
               userEvent.click(screen.getByRole('button'));
            });
         });

         test('should be visible CircularProgress while processing expired token', async () => {
            await waitFor(() =>
               expect(
                  screen.getByTestId('circular-progress'),
               ).toBeInTheDocument(),
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
                  screen.getByText(
                     'Nie możesz resetować hasła. Twoje konto jest nieaktywne.',
                  ),
               ).toBeInTheDocument(),
            );
         });

         test('should not be visible any button', async () => {
            await waitFor(() => {
               expect(screen.queryAllByRole('button').length).toBe(0);
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

            act(() => {
               userEvent.click(screen.getByRole('button'));
            });
         });

         test('should be visible CircularProgress while server error happens', async () => {
            await waitFor(() =>
               expect(
                  screen.getByTestId('circular-progress'),
               ).toBeInTheDocument(),
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
               expect(
                  screen.getByTestId('circular-progress'),
               ).toBeInTheDocument(),
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

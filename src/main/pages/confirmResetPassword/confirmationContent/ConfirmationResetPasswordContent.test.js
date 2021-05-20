import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import ConfirmationResetPasswordContent from './ConfirmationResetPasswordContent';

const setMessage = jest.fn();
const setOnRequest = jest.fn();
const setStatus = jest.fn();

describe('ConfirmationButton', () => {
   test('should render Login button', () => {
      render(
         <MemoryRouter>
            <ConfirmationResetPasswordContent
               status={200}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Zaloguj się');
   });

   test('should render ActivateAccountRefreshButton when status 401', () => {
      render(
         <MemoryRouter>
            <ConfirmationResetPasswordContent
               status={401}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(
         'Wyślij nowy link aktywacyjny',
      );
   });

   test('should render ActivateAccountRefreshButton when status 404', () => {
      render(
         <MemoryRouter>
            <ConfirmationResetPasswordContent
               status={404}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent(
         'Wyślij nowy link aktywacyjny',
      );
   });

   test('should render neither button nor form when status 500', () => {
      render(
         <MemoryRouter>
            <ConfirmationResetPasswordContent
               status={500}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
   });

   test('should render ResetPasswordForm when no status provided', () => {
      render(
         <MemoryRouter>
            <ConfirmationResetPasswordContent
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Zresetuj hasło');
   });
});

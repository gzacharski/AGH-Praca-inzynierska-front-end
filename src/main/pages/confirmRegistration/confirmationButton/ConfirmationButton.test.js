import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import ConfirmationButton from './ConfirmationButton';

const setMessage = jest.fn();
const setOnRequest = jest.fn();
const setStatus = jest.fn();

describe('ConfirmationButton', () => {
   test('should render Login button', () => {
      render(
         <MemoryRouter>
            <ConfirmationButton
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
            <ConfirmationButton
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
            <ConfirmationButton
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

   test('should NOT render any button when status 500', () => {
      render(
         <MemoryRouter>
            <ConfirmationButton
               status={500}
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
   });

   test('should render ActivateAccountButton when no status provided', () => {
      render(
         <MemoryRouter>
            <ConfirmationButton
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />
         </MemoryRouter>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Aktywuj konto');
   });
});

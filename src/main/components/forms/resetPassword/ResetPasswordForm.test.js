import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { userServiceURL } from 'src/main/data/urls';
import ResetPasswordForm from './ResetPasswordForm';

jest.mock('axios');

beforeEach(() => {
   const setMessage = jest.fn();
   const setOnRequest = jest.fn();
   const setStatus = jest.fn();
   const token = 'a309fc5e-b014-11eb-8529-0242ac130003';
   const link = `/confirmNewPassword?token=${token}`;

   render(
      <MemoryRouter initialEntries={[link]}>
         <ResetPasswordForm
            setMessage={setMessage}
            ssetOnRequest={setOnRequest}
            setStatus={setStatus}
         />
      </MemoryRouter>,
   );
});

test('ResetPasswordForm component should render', () => {
   expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
});

describe('ResetPassword form should have:', () => {
   test('password field', () => {
      expect(screen.getByLabelText(/Nowe hasło/)).toBeInTheDocument();
      expect(screen.getByText('Nowe hasło')).toBeVisible();
   });

   test('repeated password field', () => {
      expect(screen.getByLabelText(/Powtórz nowe hasło/)).toBeInTheDocument();
      expect(screen.getByText('Powtórz nowe hasło')).toBeVisible();
   });

   test('submit button', () => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
      expect(button).toHaveTextContent('Zresetuj hasło');
   });
});

describe('Password field:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test('should properly change value', async () => {
      expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Nowe hasło/),
         'password1234',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue(
         'password1234',
      );
   });

   test('should display warning that field is required', async () => {
      expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue('');
      expect(
         (await screen.findAllByText(/Hasło jest wymagane/)).length,
      ).toBeGreaterThanOrEqual(1);
   });

   test.each([['test123'], ['as']])(
      'should display warning if not enough charactes is provided: %s',
      async (password) => {
         expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Nowe hasło/),
            password,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue(
            password,
         );
         userEvent.click(screen.getByTestId('reset-password-form'));
         expect(
            await screen.findByText('Hasło musi zawierać conajmniej 8 znaków.'),
         ).toBeInTheDocument();
      },
   );

   test('should display warning if too many characters is provided %s', async () => {
      expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
      const password = 'Test1234Test1234Test12345';
      userEvent.type(
         screen.getByLabelText(/Nowe hasło/),
         password,
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue(password);
      userEvent.click(screen.getByTestId('reset-password-form'));
      expect(
         await screen.findByText('Hasło musi zawierać maksymalnie 24 znaki.'),
      ).toBeInTheDocument();
   });

   test.each([
      ['password123'],
      ['# password123 '],
      ['         '],
      ['Test1234Test1234Test1234'],
   ])(
      'should not display warning if valid password provided: %s',
      async (password) => {
         expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Nowe hasło/),
            password,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue(
            password,
         );
         userEvent.click(screen.getByTestId('reset-password-form'));
         await waitFor(() => {
            expect(screen.queryByText(/Hasło musi zawierać/)).toBeNull();
         });
      },
   );

   test('should display warning if provided password do not match', async () => {
      expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Nowe hasło/),
         'test12345',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue(
         'test12345',
      );
      userEvent.click(screen.getByTestId('reset-password-form'));
      userEvent.type(
         screen.getByLabelText(/Powtórz nowe hasło/),
         'test1234',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Powtórz nowe hasło/)).toHaveValue(
         'test1234',
      );
      userEvent.click(screen.getByTestId('reset-password-form'));
      expect(
         await screen.findByText(/Niezgodność podanych haseł/),
      ).toBeInTheDocument();
   });

   test('should not display warning if provided password matches', async () => {
      expect(screen.getByLabelText(/Nowe hasło/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Nowe hasło/),
         'test12345',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Nowe hasło/)).toHaveValue(
         'test12345',
      );
      userEvent.click(screen.getByTestId('reset-password-form'));
      userEvent.type(
         screen.getByLabelText(/Powtórz nowe hasło/),
         'test12345',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Powtórz nowe hasło/)).toHaveValue(
         'test12345',
      );
      await waitFor(() => {
         userEvent.click(screen.getByTestId('reset-password-form'));
         expect(screen.queryByText(/Niezgodność podanych haseł/)).toBeNull();
      });
   });
});

describe('When button clicked', () => {
   test('should send post request', async () => {
      const confirmationURL = `${userServiceURL}/confirmNewPassword`;
      axios.post.mockImplementationOnce(() =>
         Promise.resolve({ status: 200, data: {} }),
      );

      act(() => {
         userEvent.click(screen.getByRole('button'));
      });

      Promise.all([
         waitFor(() => expect(axios.post).toBeCalledTimes(1)),
         waitFor(() =>
            expect(axios.post).toHaveBeenCalledWith(confirmationURL, {
               headers: {
                  'Accept-Language': 'pl',
               },
               params: {
                  token: 'a309fc5e-b014-11eb-8529-0242ac130003',
               },
            }),
         ),
      ]);
   });
});

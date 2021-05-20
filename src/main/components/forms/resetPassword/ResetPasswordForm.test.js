import React from 'react';
import axios from 'axios';
import { render, screen } from 'src/testUtils';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { authServiceURL } from 'src/main/data/urls';
import ResetPasswordForm from './ResetPasswordForm';

jest.mock('axios');

describe('ResetPasswordForm', () => {
   beforeEach(() => {
      const setMessage = jest.fn();
      const setOnRequest = jest.fn();
      const setStatus = jest.fn();

      render(
         <ResetPasswordForm
            setMessage={setMessage}
            ssetOnRequest={setOnRequest}
            setStatus={setStatus}
         />,
      );
   });

   test('ResetPasswordForm component should render', () => {
      expect(screen.getByTestId('reset-password-form')).toBeInTheDocument();
   });

   describe('ResetPassword form should have:', () => {
      test('password field', () => {
         expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
         expect(screen.getByText('Email')).toBeVisible();
      });

      test('submit button', () => {
         const button = screen.getByRole('button');
         expect(button).toBeInTheDocument();
         expect(button).toBeVisible();
         expect(button).toHaveTextContent('Wyślij link do zmiany hasła');
      });
   });

   describe('Email field:', () => {
      const timeToWriteNextCharacterInMS = 50;

      test.each([
         ['test@test.com'],
         ['T@t.com'],
         ['jan.kowalski.28@test.test.com'],
      ])('email should properly change value.', async (testEmail) => {
         expect(screen.getByLabelText(/Email/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Email/),
            testEmail,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Email/)).toHaveValue(testEmail);
      });

      test('should display warning that field is required', async () => {
         expect(screen.getByLabelText(/Email/)).toHaveValue('');
         const button = screen.getByRole('button');
         userEvent.click(button);
         expect(await screen.findByLabelText(/Email/)).toHaveValue('');
         expect(
            await screen.findByText(/Email jest wymagany/),
         ).toBeInTheDocument();
      });

      test.each([
         ['Test@test'],
         ['testtest.com'],
         // ['test @test.com'], // not tested - bug in library
         // ['test@ test.com'],  // not tested - bug in library
         ['test.com'],
         ['test@@test.com'],
         ['test'],
      ])(
         'should display warning if invalid email %s address is provided',
         async (testEmail) => {
            expect(screen.getByLabelText(/Email/)).toHaveValue('');
            userEvent.type(
               screen.getByLabelText(/Email/),
               testEmail,
               timeToWriteNextCharacterInMS,
            );
            userEvent.click(screen.getByTestId('reset-password-form'));
            expect(
               await screen.findByText('Nieprawidłowy adress email'),
            ).toBeInTheDocument();
         },
      );
   });

   describe('When button clicked', () => {
      test('should send post request', async () => {
         const confirmationURL = `${authServiceURL}/resetPassword`;
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
               }),
            ),
         ]);
      });
   });
});

import React from 'react';
import axios from 'axios';
// import { v4 as uuid4 } from 'uuid';
import { render, screen } from 'src/testUtils';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogInForm from './LogInForm';

jest.mock('axios');

const setSuccess = jest.fn();
const setCircularProgress = jest.fn();
const setDisplaySnackBar = jest.fn();
const setResponseMessage = jest.fn();
const setError = jest.fn();
const setRedirection = jest.fn();

beforeEach(() => {
   render(
      <LogInForm
         setSuccess={setSuccess}
         setCircularProgress={setCircularProgress}
         setDisplaySnackBar={setDisplaySnackBar}
         setResponseMessage={setResponseMessage}
         setError={setError}
         setRedirection={setRedirection}
         data-testid="log-in-form"
      />,
   );
});

describe('LogInForm component', () => {
   test('should render.', () => {
      expect(screen.getByTestId('log-in-form')).toBeInTheDocument();
   });
});

describe('LogIn form should have:', () => {
   test('email field', () => {
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeVisible();
   });

   test('password field', () => {
      expect(screen.getByLabelText(/Hasło/)).toBeInTheDocument();
      expect(screen.getByText('Hasło')).toBeVisible();
   });

   test('submit button', () => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
      expect(button).toHaveTextContent('Zaloguj');
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

   test('should display warning that email is required', async () => {
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
         userEvent.click(screen.getByTestId('log-in-form'));
         expect(
            await screen.findByText('Nieprawidłowy adress email'),
         ).toBeInTheDocument();
      },
   );
});

describe('Email field:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test('should properly change value', async () => {
      expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Hasło/),
         'password1234',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Hasło/)).toHaveValue('password1234');
   });

   test('should display warning that password is required', async () => {
      expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Hasło/)).toHaveValue('');
      expect(
         await screen.findByText(/Hasło jest wymagane/),
      ).toBeInTheDocument();
   });
});

describe('When back-end validation, then it should display proper message for field:', () => {
   const timeToWriteNextCharacterInMS = 50;
   let response;

   beforeEach(() => {
      response = {
         id: null,
         succcess: false,
         message: 'Rejestracja zakończona niepowodzeniem.',
         errors: null,
         timestamp: '2020-12-12',
      };
   });

   const mockLoginAndSubmit = async () => {
      await userEvent.type(
         screen.getByLabelText(/Email/),
         'test@test.com',
         timeToWriteNextCharacterInMS,
      );
      await userEvent.type(
         screen.getByLabelText(/Hasło/),
         'password1234',
         timeToWriteNextCharacterInMS,
      );
      await userEvent.click(screen.getByRole('button'));
   };

   // TODO fix test
   //    test.each([
   //       ['email', 'Proszę podać poprawny adres email.'],
   //       ['logIn', 'Podano zły address email lub hasło'],
   //    ])('%s', async (field, errorMsg) => {
   //       response.errors = {
   //          [field]: errorMsg,
   //       };
   //       axios.post.mockImplementationOnce(() =>
   //          Promise.resolve({ data: response, status: 400 }),
   //       );
   //       mockLoginAndSubmit();
   //       expect(await screen.findByText(errorMsg));
   //    });

   test('everything is ok', async () => {
      response = {};
      const headers = { token: 'token123' };
      axios.post.mockImplementationOnce(() =>
         Promise.resolve({ data: response, headers }),
      );
      mockLoginAndSubmit();
      await waitFor(() => {
         expect(screen.queryByText(/Nieprawidłowy adress email/)).toBeNull();
         expect(screen.queryByText(/Hasło jest wymagane/)).toBeNull();
         expect(screen.queryByText(/Proszę podać/)).toBeNull();
      });
   });
});

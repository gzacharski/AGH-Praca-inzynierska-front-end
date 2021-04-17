import React from 'react';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { render, screen } from 'src/testUtils';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUp';

jest.mock('axios');

beforeEach(() => {
   const setSuccess = jest.fn();
   const setDisplayBackdrop = jest.fn();
   const setDisplaySnackBar = jest.fn();
   const setResponseMessage = jest.fn();
   const setError = jest.fn();
   render(
      <SignUpForm
         setSuccess={setSuccess}
         setDisplayBackdrop={setDisplayBackdrop}
         setDisplaySnackBar={setDisplaySnackBar}
         setResponseMessage={setResponseMessage}
         setError={setError}
      />,
   );
});

describe('SignUp component', () => {
   test('should render.', () => {
      expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
   });
});

describe('SignUp form should have:', () => {
   test('name field', () => {
      expect(screen.getByLabelText(/Imię/)).toBeInTheDocument();
      expect(screen.getByText('Imię')).toBeVisible();
   });

   test('surname field', () => {
      expect(screen.getByLabelText(/Nazwisko/)).toBeInTheDocument();
      expect(screen.getByText('Nazwisko')).toBeVisible();
   });

   test('email field', () => {
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeVisible();
   });

   test('password field', () => {
      expect(screen.getByLabelText(/Hasło/)).toBeInTheDocument();
      expect(screen.getByText('Hasło')).toBeVisible();
   });

   test('repeated password field', () => {
      expect(screen.getByLabelText(/Powtórz hasło/)).toBeInTheDocument();
      expect(screen.getByText('Powtórz hasło')).toBeVisible();
   });

   test('submit button', () => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
      expect(button).toHaveTextContent('Zarejestruj się');
   });
});

describe('Field name:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test.each([['Jan'], ['Anna Maria']])(
      'should properly change value of name.',
      async (name) => {
         expect(screen.getByLabelText(/Imię/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Imię/),
            name,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Imię/)).toHaveValue(name);
      },
   );

   test('should display warning that name field is required', async () => {
      expect(screen.getByLabelText(/Imię/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Imię/)).toHaveValue('');
      expect(await screen.findByText('Imię jest wymagane')).toBeInTheDocument();
   });

   test('should display warning if not enough characters.', async () => {
      expect(screen.getByLabelText(/Imię/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Imię/),
         'X',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByLabelText(/Imię/)).toHaveValue('X');
      expect(
         await screen.findByText('Podaj minimalnie dwa znaki'),
      ).toBeInTheDocument();
   });

   test('should display warning if too many characters', async () => {
      expect(screen.getByLabelText(/Imię/)).toHaveValue('');
      const longRandomName = [...Array(61)]
         .map(() => Math.random().toString(36)[2])
         .join('');
      userEvent.type(
         screen.getByLabelText(/Imię/),
         longRandomName,
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByLabelText(/Imię/)).toHaveValue(longRandomName);
      expect(
         await screen.findByText('Maksymalna ilość 60 znaków'),
      ).toBeInTheDocument();
   });
});

describe('Surname field:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test.each([['Nowak'], ['Dlugie-Nazwisko']])(
      'surname should properly change value.',
      async (name) => {
         expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Nazwisko/),
            name,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue(name);
      },
   );

   test('surname should display warning that field is required', async () => {
      expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue('');
      expect(
         await screen.findByText('Nazwisko jest wymagane'),
      ).toBeInTheDocument();
   });

   test('surname should display warning if not enough characters.', async () => {
      expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Nazwisko/),
         'X',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue('X');
      expect(
         await screen.findByText('Podaj minimalnie dwa znaki'),
      ).toBeInTheDocument();
   });

   test('surname should display warning if too many characters', async () => {
      expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
      const longRandomSurname = [...Array(61)]
         .map(() => Math.random().toString(36)[2])
         .join('');
      userEvent.type(
         screen.getByLabelText(/Nazwisko/),
         longRandomSurname,
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue(
         longRandomSurname,
      );
      expect(
         await screen.findByText('Maksymalna ilość 60 znaków'),
      ).toBeInTheDocument();
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
         userEvent.click(screen.getByTestId('sign-up-form'));
         expect(
            await screen.findByText('Nieprawidłowy adress email'),
         ).toBeInTheDocument();
      },
   );
});

describe('Password field:', () => {
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

   test('should display warning that field is required', async () => {
      expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Hasło/)).toHaveValue('');
      expect(
         (await screen.findAllByText(/Hasło jest wymagane/)).length,
      ).toBeGreaterThanOrEqual(1);
   });

   test.each([['test123'], ['as']])(
      'should display warning if not enough charactes is provided: %s',
      async (password) => {
         expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Hasło/),
            password,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Hasło/)).toHaveValue(password);
         userEvent.click(screen.getByTestId('sign-up-form'));
         expect(
            await screen.findByText('Hasło musi zawierać conajmniej 8 znaków.'),
         ).toBeInTheDocument();
      },
   );

   test('should display warning if too many characters is provided %s', async () => {
      expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
      const password = 'Test1234Test1234Test12345';
      userEvent.type(
         screen.getByLabelText(/Hasło/),
         password,
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Hasło/)).toHaveValue(password);
      userEvent.click(screen.getByTestId('sign-up-form'));
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
         expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
         userEvent.type(
            screen.getByLabelText(/Hasło/),
            password,
            timeToWriteNextCharacterInMS,
         );
         expect(await screen.findByLabelText(/Hasło/)).toHaveValue(password);
         userEvent.click(screen.getByTestId('sign-up-form'));
         await waitFor(() => {
            expect(screen.queryByText(/Hasło musi zawierać/)).toBeNull();
         });
      },
   );

   test('should display warning if provided password do not match', async () => {
      expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Hasło/),
         'test12345',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Hasło/)).toHaveValue('test12345');
      userEvent.click(screen.getByTestId('sign-up-form'));
      userEvent.type(
         screen.getByLabelText(/Powtórz hasło/),
         'test1234',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Powtórz hasło/)).toHaveValue(
         'test1234',
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(
         await screen.findByText(/Niezgodność podanych haseł/),
      ).toBeInTheDocument();
   });

   test('should not display warning if provided password matches', async () => {
      expect(screen.getByLabelText(/Hasło/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Hasło/),
         'test12345',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Hasło/)).toHaveValue('test12345');
      userEvent.click(screen.getByTestId('sign-up-form'));
      userEvent.type(
         screen.getByLabelText(/Powtórz hasło/),
         'test12345',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Powtórz hasło/)).toHaveValue(
         'test12345',
      );
      await waitFor(() => {
         userEvent.click(screen.getByTestId('sign-up-form'));
         expect(screen.queryByText(/Niezgodność podanych haseł/)).toBeNull();
      });
   });
});

describe('Phone field:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test('should properly change value', async () => {
      expect(screen.getByLabelText(/Telefon/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Telefon/),
         '+48',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Telefon/)).toHaveValue('+48');
   });

   test('should display warning if invalid phone number format is provided', async () => {
      const phoneField = screen.getByLabelText(/Telefon/);
      expect(phoneField).toHaveValue('');
      userEvent.type(
         phoneField,
         '+48 665-762682',
         timeToWriteNextCharacterInMS,
      );
      await waitFor(() => {
         expect(phoneField).toHaveValue('+48 665-762682');
         userEvent.click(screen.getByTestId('sign-up-form'));
         expect(
            screen.getByText(/Podano nieprawidłowy format numeru telefonu./),
         ).toBeInTheDocument();
      });
   });

   test('should not display warning if valid phone number format is provided', async () => {
      const phoneField = screen.getByLabelText(/Telefon/);
      expect(phoneField).toHaveValue('');
      userEvent.type(
         phoneField,
         '+48 665 762 682',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      await waitFor(() => {
         expect(phoneField).toHaveValue('+48 665 762 682');
         expect(
            screen.queryByText(/Podano nieprawidłowy format numeru telefonu./),
         ).toBeNull();
      });
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

   const mockResponseAndSubmit = async () => {
      axios.post.mockImplementationOnce(() =>
         Promise.resolve({ data: response }),
      );
      await userEvent.type(
         screen.getByLabelText(/Imię/),
         'TestName',
         timeToWriteNextCharacterInMS,
      );
      await userEvent.type(
         screen.getByLabelText(/Nazwisko/),
         'TestSurname',
         timeToWriteNextCharacterInMS,
      );
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
      await userEvent.type(
         screen.getByLabelText(/Powtórz hasło/),
         'password1234',
         timeToWriteNextCharacterInMS,
      );
      await userEvent.click(screen.getByRole('button'));
   };

   test.each([
      ['name', 'Imię powinno mieć od 2 do 60 znaków.'],
      ['surname', 'Nazwisko powinno mieć od 2 do 60 znaków.'],
      ['email', 'Proszę podać poprawny adres email.'],
      ['email', 'Podany address email jest już zajęty'],
      ['phoneNumber', 'Niepoprawny format numeru telefonu.'],
      ['password', 'Hasło powinno mieć od 8 do 24 znaków.'],
      ['matchingPassword', 'Podane hasła powinny być identyczne.'],
   ])('%s', async (field, errorMsg) => {
      response.errors = {
         [field]: errorMsg,
      };
      mockResponseAndSubmit();
      expect(await screen.findByText(errorMsg));
   });

   test('everything is ok', async () => {
      response = {
         id: uuid4(),
         succcess: true,
         message: 'Użytkownik został zarejestrowany.',
         errors: null,
         timestamp: '2020-12-12',
      };
      mockResponseAndSubmit();
      await waitFor(() => {
         expect(screen.queryByText(/Podaj minimalnie/)).toBeNull();
         expect(screen.queryByText(/Maksymalna ilość/)).toBeNull();
         expect(screen.queryByText(/jest wymagane/)).toBeNull();
         expect(screen.queryByText(/jest wymagany/)).toBeNull();
         expect(screen.queryByText(/Hasło musi/)).toBeNull();
         expect(screen.queryByText(/Proszę podać/)).toBeNull();
      });
   });
});

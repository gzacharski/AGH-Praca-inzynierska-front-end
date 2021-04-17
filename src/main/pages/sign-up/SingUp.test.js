import React from 'react';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import SignUp from './SignUp';

jest.mock('axios');

beforeEach(() => {
   render(<SignUp />);
});

test('SingUp page should render without crashing', () => {
   expect(screen.getByRole('main')).toBeInTheDocument();
});

describe('SingUp page should have', () => {
   test('footer', () => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
   });

   test('have link to main page', () => {
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
   });

   test('name field', () => {
      expect(screen.getByLabelText(/Imię/)).toBeInTheDocument();
   });

   test('surname field', () => {
      expect(screen.getByLabelText(/Nazwisko/)).toBeInTheDocument();
   });

   test('phone field', () => {
      expect(screen.getByLabelText(/Telefon/)).toBeInTheDocument();
   });

   test('password field', () => {
      expect(screen.getByLabelText(/Hasło/)).toBeInTheDocument();
   });

   test('email field', () => {
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
   });

   test('title heading', () => {
      const headings = screen.getAllByRole('heading');
      expect(
         headings.filter((heading) => heading.textContent === 'Zarejestruj się')
            .length,
      ).toEqual(1);
   });

   test('button', () => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/Zarejestruj się/);
   });
});

describe('SingUp page on submit', () => {
   let response;

   const timeToWriteNextCharacterInMS = 50;

   const fillRegistrationForm = async () => {
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
   };

   test('should display backdrop when form properly filled', async () => {
      axios.post.mockImplementationOnce(() =>
         Promise.resolve({ data: response }),
      );
      fillRegistrationForm();
      userEvent.click(screen.getByRole('button'));
      expect(await screen.findByTestId('sign-up-backdrop')).toBeInTheDocument();
   });

   test('should not dislay backdrop when dislaying snackbar', () => {
      response = {
         id: uuid4(),
         succcess: true,
         message: 'Użytkownik został zarejestrowany.',
         errors: null,
         timestamp: '2020-12-12',
      };
   });

   test('shoud not display neither backdrop nor snackbar before submitting the form', async () => {
      response = {
         id: uuid4(),
         succcess: true,
         message: 'Użytkownik został zarejestrowany.',
         errors: null,
         timestamp: '2020-12-12',
      };
      axios.post.mockImplementationOnce(() =>
         Promise.resolve({ data: response }),
      );
      fillRegistrationForm();
      await userEvent.type(
         screen.getByLabelText(/Powtórz hasło/),
         'password12345',
         timeToWriteNextCharacterInMS,
      );
      await userEvent.click(screen.getByRole('button'));
      await waitFor(() => {
         expect(screen.queryByTestId('sign-up-backdrop')).not.toBeVisible();
         expect(
            screen.queryByTestId('sign-up-snackbar'),
         ).not.toBeInTheDocument();
      });
   });

   describe('should display snackbar on response', () => {
      test('and should have success theme on success message', () => {
         // TODO
      });

      test('and should have error theme or error message', () => {
         // TODO
      });

      test('and should have proper text message on success response', async () => {
          // TODO
        //  response = {
        //     id: uuid4(),
        //     succcess: true,
        //     message: 'Użytkownik został zarejestrowany.',
        //     errors: null,
        //     timestamp: '2020-12-12',
        //  };
        //  axios.post.mockImplementationOnce(() =>
        //     Promise.resolve({ data: response, status: 200 }),
        //  );
        //  fillRegistrationForm();
        //  await userEvent.click(screen.getByRole('button'));
        //  await waitFor(() => {
        //     expect(
        //        screen.queryByText(/Użytkownik został zarejestrowany/),
        //     ).toBeInTheDocument();
        //  });
      });
      test('and should have proper text message on error response', () => {
         // TODO
      });

      test('and snackbar should disappear after 3000ms', () => {
         // TODO
      });

      test('and snackbar should disappear when closed by user', () => {
         // TODO
      });
   });
});

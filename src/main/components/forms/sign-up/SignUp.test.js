import React from 'react';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';

beforeEach(() => {
   render(<SignUp />);
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
      expect(button.firstChild.textContent).toEqual('Zarejestruj się');
   });
});

describe('Field name:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test('should properly change value of name.', async () => {
      expect(screen.getByLabelText(/Imię/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Imię/),
         'Janek',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Imię/)).toHaveValue('Janek');
   });

   test('should show warning that name field is required', async () => {
      expect(screen.getByLabelText(/Imię/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Imię/)).toHaveValue('');
      expect(await screen.findByText('Imię jest wymagane')).toBeInTheDocument();
   });

   test('should show warning if not enough characters.', async () => {
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

   test('should show warning if too many characters', async () => {
      expect(screen.getByLabelText(/Imię/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Imię/),
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByLabelText(/Imię/)).toHaveValue(
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
      );
      expect(
         await screen.findByText('Maksymalna ilość 20 znaków'),
      ).toBeInTheDocument();
   });
});

describe('Surname field:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test('surname should properly change value.', async () => {
      expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Nazwisko/),
         'Janek',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue(
         'Janek',
      );
   });

   test('surname should show warning that field is required', async () => {
      expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue('');
      expect(
         await screen.findByText('Nazwisko jest wymagane'),
      ).toBeInTheDocument();
   });

   test('surname should show warning if not enough characters.', async () => {
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

   test('surname should show warning if too many characters', async () => {
      expect(screen.getByLabelText(/Nazwisko/)).toHaveValue('');
      userEvent.type(
         screen.getByLabelText(/Nazwisko/),
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByLabelText(/Nazwisko/)).toHaveValue(
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
      );
      expect(
         await screen.findByText('Maksymalna ilość 20 znaków'),
      ).toBeInTheDocument();
   });
});

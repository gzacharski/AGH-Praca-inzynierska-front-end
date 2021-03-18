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
      expect(screen.getByPlaceholderText('Imię')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Imię')).toBeVisible();
   });

   test('surname field', () => {
      expect(screen.getByPlaceholderText('Nazwisko')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Nazwisko')).toBeVisible();
   });

   test('email field', () => {
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeVisible();
   });

   test('password field', () => {
      expect(screen.getByPlaceholderText('Hasło')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Hasło')).toBeVisible();
   });

   test('repeated password field', () => {
      expect(screen.getByPlaceholderText('Powtórz hasło')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Powtórz hasło')).toBeVisible();
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

   test('should properly change value.', async () => {
      expect(screen.getByPlaceholderText('Imię')).toHaveValue('');
      userEvent.type(
         screen.getByPlaceholderText('Imię'),
         'Janek',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByPlaceholderText('Imię')).toHaveValue('Janek');
   });

   test('should show warning that field is required', async () => {
      expect(screen.getByPlaceholderText('Imię')).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByPlaceholderText('Imię')).toHaveValue('');
      expect(await screen.findByText('Imię jest wymagane')).toBeInTheDocument();
   });

   test('should show warning if not enough characters.', async () => {
      expect(screen.getByPlaceholderText('Imię')).toHaveValue('');
      userEvent.type(
         screen.getByPlaceholderText('Imię'),
         'X',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByPlaceholderText('Imię')).toHaveValue('X');
      expect(
         await screen.findByText('Podaj minimalnie dwa znaki'),
      ).toBeInTheDocument();
   });

   test('should show warning if too many characters', async () => {
      expect(screen.getByPlaceholderText('Imię')).toHaveValue('');
      userEvent.type(
         screen.getByPlaceholderText('Imię'),
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByPlaceholderText('Imię')).toHaveValue(
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
      );
      expect(
         await screen.findByText('Maksymalna ilość 20 znaków'),
      ).toBeInTheDocument();
   });
});

describe('Surname field:', () => {
   const timeToWriteNextCharacterInMS = 50;

   test('should properly change value.', async () => {
      expect(screen.getByPlaceholderText('Nazwisko')).toHaveValue('');
      userEvent.type(
         screen.getByPlaceholderText('Nazwisko'),
         'Janek',
         timeToWriteNextCharacterInMS,
      );
      expect(await screen.findByPlaceholderText('Nazwisko')).toHaveValue(
         'Janek',
      );
   });

   test('should show warning that field is required', async () => {
      expect(screen.getByPlaceholderText('Nazwisko')).toHaveValue('');
      const button = screen.getByRole('button');
      userEvent.click(button);
      expect(await screen.findByPlaceholderText('Nazwisko')).toHaveValue('');
      expect(
         await screen.findByText('Nazwisko jest wymagane'),
      ).toBeInTheDocument();
   });

   test('should show warning if not enough characters.', async () => {
      expect(screen.getByPlaceholderText('Nazwisko')).toHaveValue('');
      userEvent.type(
         screen.getByPlaceholderText('Nazwisko'),
         'X',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByPlaceholderText('Nazwisko')).toHaveValue('X');
      expect(
         await screen.findByText('Podaj minimalnie dwa znaki'),
      ).toBeInTheDocument();
   });

   test('should show warning if too many characters', async () => {
      expect(screen.getByPlaceholderText('Nazwisko')).toHaveValue('');
      userEvent.type(
         screen.getByPlaceholderText('Nazwisko'),
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
         timeToWriteNextCharacterInMS,
      );
      userEvent.click(screen.getByTestId('sign-up-form'));
      expect(await screen.findByPlaceholderText('Nazwisko')).toHaveValue(
         'Xfdgfsgashtjryerhyuhjrtjretyerthfgsa',
      );
      expect(
         await screen.findByText('Maksymalna ilość 20 znaków'),
      ).toBeInTheDocument();
   });
});

import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, act } from 'src/testUtils';
import DropDownButton from './DropDownButton';

describe('Message button', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <DropDownButton />
         </MemoryRouter>,
      );
   });

   test('should have button', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
   });

   describe('once clicked, a popper should show up and', () => {
      beforeEach(() => {
         act(() => userEvent.click(screen.getByRole('button')));
      });

      test('should have "Moje konto" item', () => {
         expect(screen.getByText(/Moje konto/)).toBeInTheDocument();
      });

      test('should have "Pomoc" item', () => {
         expect(screen.getByText(/Pomoc/)).toBeInTheDocument();
      });

      test('should have "Ustawienia prywatności" item', () => {
         expect(screen.getByText(/Ustawienia prywatności/)).toBeInTheDocument();
      });

      test('should have "Ustawienia wyświetlania" item', () => {
         expect(
            screen.getByText(/Ustawienia wyświetlania/),
         ).toBeInTheDocument();
      });

      test('should have "Wyloguj się" item', () => {
         expect(screen.getByText(/Wyloguj się/)).toBeInTheDocument();
      });
   });
});

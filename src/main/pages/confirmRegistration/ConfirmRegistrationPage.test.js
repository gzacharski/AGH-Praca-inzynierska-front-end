import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import ConfirmRegistration from './ConfirmRegistrationPage';

describe('ConfirmRegistration page', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <ConfirmRegistration />
         </MemoryRouter>,
      );
   });

   test("should have text 'Potwierdzenie rejestracji'", () => {
      expect(screen.getByText(/Potwierdzenie rejestracji/)).toBeInTheDocument();
   });
});

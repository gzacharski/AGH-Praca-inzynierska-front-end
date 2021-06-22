import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import PersonalMenu from './PersonalMenu';

describe('Personal menu', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <PersonalMenu />
         </MemoryRouter>,
      );
   });

   test('should contains avatar button', () => {
      expect(screen.getByTestId('avatar-button')).toBeInTheDocument();
   });

   test('should contains message button', () => {
      expect(screen.getByTestId('message-button')).toBeInTheDocument();
   });

   test('should contains notification button', () => {
      expect(screen.getByTestId('notification-button')).toBeInTheDocument();
   });

   test('should contains dropDown button', () => {
    expect(screen.getByTestId('dropDown-button')).toBeInTheDocument();
 });
});

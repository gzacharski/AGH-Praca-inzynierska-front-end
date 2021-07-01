import React from 'react';
import { render, screen } from 'src/testUtils';
import { MemoryRouter } from 'react-router-dom';
import LogoutList from './LogoutList';

describe('Logoutlist', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <LogoutList />
         </MemoryRouter>,
      );
   });
   test('initial test', () => {
      expect(screen.getByText('Wyloguj się')).toBeInTheDocument();
   });
});

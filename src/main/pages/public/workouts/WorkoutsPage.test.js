import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import WorkoutsPage from './WorkoutsPage';

describe('Workouts page component', () => {
   beforeEach(() => {
      render(
         <MemoryRouter>
            <WorkoutsPage />
         </MemoryRouter>,
      );
   });

   test('should contain proper text', () => {
      expect(screen.getByText(/Oferta zajęć grupowych/)).toBeInTheDocument();
   });
});

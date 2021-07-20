import React from 'react';
import { render, screen } from 'src/testUtils';
import WorkoutsPage from './WorkoutsPage';

describe('Workouts page component', () => {
   beforeEach(() => {
      render(<WorkoutsPage />);
   });

   test('should contain proper text', () => {
      expect(screen.getByText(/Oferta zajęć grupowych/)).toBeInTheDocument();
   });
});

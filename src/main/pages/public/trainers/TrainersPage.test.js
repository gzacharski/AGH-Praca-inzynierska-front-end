import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from 'src/testUtils';
import TrainersPage from './TrainersPage';

describe('Trenings component', () => {
   test('should contain proper text', () => {
      render(
         <MemoryRouter>
            <TrainersPage />
         </MemoryRouter>,
      );
      expect(screen.getByText(/Nasi trenerzy/)).toBeInTheDocument();
      expect(
         screen.getByText(/Dowiedz się więcej o prowadzących zajęcia fitness/),
      ).toBeInTheDocument();
   });
});
